import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import DatabaseFileService from '../database-file/database-file.service';
import { MailService } from '../mail/mail.service';
import Customer from './customer.entity';
import UpdateCustomerDto from './dto/update-customer.dto';


@Injectable()
export class CustomerService {
    constructor( 
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly registerBaseService: RegisterBaseService,
        private readonly databaseFilesService: DatabaseFileService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
        private  connection: Connection
        ){}

    public async create(customer){

        const user = await this.customerRepository.find({where : {email: customer.email}});

        if(user.length == 0){
            const hashPassword = await this.registerBaseService.hashPassword(customer.password);

            customer.password = hashPassword;

            const newCustomer =  await this.customerRepository.create(customer);
            const client = await this.customerRepository.save(newCustomer);

            const token = await this.registerBaseService.generateToken(client);

            return { user: client, token: token };
        }
        throw new HttpException('Customer email already exist', HttpStatus.NOT_FOUND);
    }

    async sendVerificationLink(email: string ) {
      const token = this.jwtService.sign({email:email}, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`,
      });
    
      const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}/customer/token/${token}`;

      const text = `Welcome to ahi marketplace. To confirm the email address, click here: ${url} . \n
      The link will expire in ${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`;

      return await this.mailService.sendMail({
        to: email,
        subject: 'Email confirmation',
        text,
      });
    }


    public async markEmailAsConfirmed(email: string) {
        return this.customerRepository.update({ email }, {
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

      

    public async findAll() {
        return await this.customerRepository.find();
    }

    public async findOneByEmail(email: string){
        const customerMail = await this.customerRepository.findOne( {where : {email : `${email}`} });
        if (customerMail)
            return customerMail;
    }

    public async findOneById(id: number) {
        const customer = await this.customerRepository.findOne({ where : { id: id } });
        if (customer)
            return customer;
    }


    /* I don't understand this method*/
    public async update(id: number, post: UpdateCustomerDto) {
        //verifier que l'id est dans la bd
        const user = await this.customerRepository.find({where : {id: id}});

        if (user.length != 0){
            const user_email = await this.customerRepository.find({where : {email: post.email}});

            const hashPassword = await this.registerBaseService.hashPassword(post.password);
            post.password = hashPassword;
            
            if (user_email.length==0){
                await this.customerRepository.update(id, post);

                const updatedCustomer = await this.customerRepository.findOne({where : {id: id} });

                if (updatedCustomer) {
                    
                    return updatedCustomer;

                }
                throw new HttpException ('Failed to update', HttpStatus.NOT_FOUND);
            }
            else {

                const mail_exist = await this.customerRepository.findOne( {where : {id : id }});

                if (mail_exist.email == post.email){

                    await this.customerRepository.update(id, post);
                    
                    const updatedCustomer = await this.customerRepository.findOne({where : {id: id} });//donne un json

                    if (updatedCustomer) {

                        return updatedCustomer;

                    }

                    throw new HttpException ('Failed to update', HttpStatus.NOT_FOUND);
                }
                throw new HttpException ('Email already exist.', HttpStatus.NOT_FOUND);
            }
        }
        throw new HttpException ('Customer not found', HttpStatus.NOT_FOUND);
    }

    public async addAvatar(userId: number, imageBuffer: Buffer, filename: string, mimetype: string) {
        const queryRunner = this.connection.createQueryRunner();
     
        await queryRunner.connect();
        await queryRunner.startTransaction();
     
        try {
          const user = await queryRunner.manager.findOne(Customer, {where : { id: userId } });
          const currentAvatarId = user.avatarId;
          const avatar = await this.databaseFilesService.uploadDatabaseFileWithQueryRunner(imageBuffer, filename,mimetype, queryRunner);
     
          await queryRunner.manager.update(Customer, userId, {
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


    public async delete(id: number) {
        const user = await this.customerRepository.find({where : {id: id}});

        if (user.length != 0){
            const deletedCustomer = await this.customerRepository.delete(id);
            if (!deletedCustomer.affected)
                throw new HttpException('Failed to delete', HttpStatus.NOT_FOUND);
            else
                throw new HttpException('Le client '+user[0].firstName+' '+user[0].lastName+ ' a été supprimé avec succès', HttpStatus.FOUND);
        }
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
}
