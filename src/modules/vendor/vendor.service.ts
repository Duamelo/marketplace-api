import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import DatabaseFileService from '../database-file/database-file.service';
import { MailService } from '../mail/mail.service';
import UpdateVendorDto from './dto/update-vendor.dto';
import Vendor from './vendor.entity';


@Injectable()
export class VendorService {
    constructor( 
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
        private readonly registerBaseService: RegisterBaseService,
        private readonly databaseFilesService: DatabaseFileService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private  connection: Connection
        ){}

    public async create(vendor){

        const user = await this.vendorRepository.find({where : {email: vendor.email}});

        if(user.length == 0){

            const hashPassword = await this.registerBaseService.hashPassword(vendor.password);

            vendor.password = hashPassword;

            const newVendor =  await this.vendorRepository.create(vendor);
            const _vendor = await this.vendorRepository.save(newVendor);
            const token = await this.registerBaseService.generateToken(_vendor);

            return { user: _vendor, token: token };
        }
        throw new HttpException('Vendor email already exist', HttpStatus.NOT_FOUND);
    }

    async sendVerificationLink(email: string ) {
        //const payload: TokenPayload = { userId };
        const token = this.jwtService.sign({email:email}, {
          secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`,
          
        });
      
        // const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
       
        const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}vendor/token/${token}`;
  
      
        const text = `Welcome to ahi marketplace. To confirm the email address, click here: ${url} . \n
        The link will expire in ${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`;
        
        // const user = await this.customerRepository.find({where:{email : email}});
        // if (user.length != 0) 
        //   var email = user[0].email;
  
        return await this.mailService.sendMail({
          
          to: email,
          subject: 'Email confirmation',
          text,
        })
      }
  
    async markEmailAsConfirmed(email: string) {
        return this.vendorRepository.update({ email }, {
          isEmailConfirmed: true
        });
      }

    public async confirmEmail(email: string) {
        const user = await this.findOneByEmail(email);
        if (user.isEmailConfirmed) {
          throw new BadRequestException('Email already confirmed');
        }
        await this.markEmailAsConfirmed(email);
      }


    //find all
    async findAll() {
        return await this.vendorRepository.find();
    }

    
    async findOneByEmail(email: string){
        const vendorMail = await this.vendorRepository.findOne( {where : {email : `${email}`}, relations : {shops : true} });
        if (vendorMail) {
            return vendorMail;
        }
        throw new HttpException('Vendor not found', HttpStatus.NOT_FOUND);
    }



    async findOneById(id: number) {
        const vendor = await this.vendorRepository.findOne({ where : { id: id }, relations: {shops: true}  });
        if (vendor) {
            return vendor;
        }
        throw new HttpException('Vendor not found.', HttpStatus.NOT_FOUND);
            
        };
        

    //update
    async updateVendor(id: number, post: UpdateVendorDto) {
        //verifier que l'id est dans la bd
        const user = await this.vendorRepository.find({where : {id:id}});
        console.log(user.length);
        if (user.length != 0){ //si l'id de l'utilisateur a modifier est dans la bd 
            const user_email = await this.vendorRepository.find({where : {email: post.email}}); //on cherche maintenant si l'email donnée pendant l'update 
                                                                                                //est dans la bd

            const hashPassword = await this.registerBaseService.hashPassword(post.password); //on hash le password donné lors de l'Update
            post.password = hashPassword;
            
            if (user_email.length==0){ //si l'email donné lors de l'update n'est pas dans la bd
                await this.vendorRepository.update(id, post); //on fait l'update

                const updatedVendor = await this.vendorRepository.findOne({where : {id: id} }); //on récupère les infos mis a jour

                if (updatedVendor) { //si les infos on été récupérés, 
                    
                    return updatedVendor; //afficher ca

                }
                throw new HttpException ('Failed to update', HttpStatus.NOT_FOUND); //si les infos n'ont pas été recupérées
                                                                                    //la mise a jour a échoué
            }
            else { //si l'email donné lors de l'update est déjà dans la bd

                const mail_exist = await this.vendorRepository.findOne( {where : {id : id }}); //on récupère toute la ligne liée à l'ID de l'utlisateur voulant faire un update

                if (mail_exist.email == post.email){// si l'adresse email récupérée de la ligne de l'ID dans la bd est la même que l'adresse email donnée lors de l'update

                    await this.vendorRepository.update(id, post); //alors lancer l'update
                    
                    const updatedVendor = await this.vendorRepository.findOne({where : {id: id} });//donne un json

                    if (updatedVendor) {//si la maj a été réalisée

                        return updatedVendor;//afficher

                    }

                    throw new HttpException ('Failed to update', HttpStatus.NOT_FOUND); //si la maj n'a pas été réalisée dire echec de maj
                }
                throw new HttpException ('Email already exist.', HttpStatus.NOT_FOUND); //si l'email récupérée de la ligne de l'ID dans la bd n'est pas la même que l'email donnée lors de l'update
                                                                                        //alors l'utilisateur veut même a jour ses données avec un mail qui ne lui appartient pas donc on lui dit email existe et on l'empêche la maj    
            }
            
        }
        throw new HttpException ('Vendor not found', HttpStatus.NOT_FOUND);
    }

    async addAvatar(userId: number, imageBuffer: Buffer, filename: string, mimetype: string) {
        const queryRunner = this.connection.createQueryRunner();
     
        await queryRunner.connect();
        await queryRunner.startTransaction();
     
        try {
          const user = await queryRunner.manager.findOne(Vendor, {where : { id: userId } });
          const currentAvatarId = user.avatarId;
          const avatar = await this.databaseFilesService.uploadDatabaseFileWithQueryRunner(imageBuffer, filename,mimetype, queryRunner);
     
          await queryRunner.manager.update(Vendor, userId, {
            avatarId: avatar.id
          });
     
          if (currentAvatarId) {
            await this.databaseFilesService.deleteFileWithQueryRunner(currentAvatarId, queryRunner);
          }
     
          await queryRunner.commitTransaction();
     
          return avatar;
        } 
        catch {
          await queryRunner.rollbackTransaction();
          throw new InternalServerErrorException();
        }
        finally {
          await queryRunner.release();
        }
    }
    
    //delete
    async deleteVendor(id: number) {
        //verifier que l'id est dans la bd
       const user = await this.vendorRepository.find({where : {id:id}}); //donne un tableau
       
       if (user.length != 0){
           const deletedVendor = await this.vendorRepository.delete(id);
           if (!deletedVendor.affected) {
               throw new HttpException('Failed to delete', HttpStatus.NOT_FOUND);
           }
           else{
               
               throw new HttpException('Le client '+user[0].firstName+' '+user[0].lastName+ ' a été supprimé avec succès', HttpStatus.FOUND);
               
           }
       }
       throw new HttpException('Vendor not found', HttpStatus.NOT_FOUND);
   }
}