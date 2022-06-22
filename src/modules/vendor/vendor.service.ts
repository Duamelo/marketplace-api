import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
import Role from '../common/roles/role.enum';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import UpdateVendorDto from './dto/update-vendor.dto';
import Vendor from './vendor.entity';


@Injectable()
export class VendorService {
    constructor( 
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
        private readonly registerBaseService: RegisterBaseService
        ){}

    public async create(vendor){

        const user = await this.vendorRepository.find({where : {email: vendor.email}});

        if(user.length == 0){

            //hash the password
            const hashPassword = await this.registerBaseService.hashPassword(vendor.password);

            vendor.password = hashPassword;

            //create the vendor
            const newVendor =  await this.vendorRepository.create(vendor);
            const _vendor = await this.vendorRepository.save(newVendor);

            //generate token
            const token = await this.registerBaseService.generateToken(_vendor);
        

            //return the vendor and the token

            return { user: _vendor, token: token };
        }
        throw new HttpException('Vendor email already exist', HttpStatus.NOT_FOUND);
    }

    //find all
    async getAllVendor() {
        return this.vendorRepository.find();
    }

    //find by mail
    async getByEmail(email: string){
        const vendorMail = await this.vendorRepository.findOne( {where : {email : `${email}`} });
        if (vendorMail) {
            return vendorMail;
        }
        throw new HttpException('Vendor email not found', HttpStatus.NOT_FOUND);
    }


    //find by id
    async getById(id: number) {
        const vendor = await this.vendorRepository.findOne({ where : { id: id } });
        if (vendor) {
            return vendor;
        }
        throw new HttpException('Vendor not found.', HttpStatus.NOT_FOUND);
          
    }


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