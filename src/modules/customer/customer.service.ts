import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Customer from './customer.entity';
import UpdateCustomerDto from './dto/update-customer.dto';


@Injectable()
export class CustomerService implements GetInfo {
    constructor( 
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly registerBaseService: RegisterBaseService
        ){}

    public async create(customer){

        const user = await this.customerRepository.find({where : {email: customer.email}});
        console.log(user.length);
        console.log("user");
        console.log(user);

        if(user.length == 0){
             //hash the password
            const hashPassword = await this.registerBaseService.hashPassword(customer.password);

            customer.password = hashPassword;

            //create the customer
            const newCustomer =  await this.customerRepository.create(customer);
            const client = await this.customerRepository.save(newCustomer);

            //tslin:disable-next-line: no-string-literal
                console.log(client);
            // const { password, ...result } = client;
            //generate token
            const token = await this.registerBaseService.generateToken(client);
            //return the customer and the token
            return { user: client, token: token };
        }
        throw new HttpException('Customer email already exist', HttpStatus.NOT_FOUND);
    }

    //fin all
    async getAllCustomer() {
        return this.customerRepository.find();
    }


    //find by mail
    async getByEmail(email: string){
        const customerMail = await this.customerRepository.findOne( {where : {email : `${email}`} });
        if (customerMail) {
            return customerMail;
        }
        throw new HttpException('Customer email not found', HttpStatus.NOT_FOUND);
    }

    //find by id
    async getById(id: number) {
        const customer = await this.customerRepository.findOne({ where : { id: id } });
        if (customer) {
            return customer;
        }
        throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
          
    }

    //update
    async updateCustomer(id: number, post: UpdateCustomerDto) {
        //verifier que l'id est dans la bd
        const user = await this.customerRepository.find({where : {id:id}});
        console.log(user.length);
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
            throw new HttpException ('Email already exist.', HttpStatus.NOT_FOUND);
            
        }
        throw new HttpException ('Customer not found', HttpStatus.NOT_FOUND);
    }


    //delete
    async deleteCustomer(id: number) {
         //verifier que l'id est dans la bd
        const user = await this.customerRepository.find({where : {id:id}}); //donne un tableau
        console.log(user.length);
        if (user.length != 0){
            const deletedCustomer = await this.customerRepository.delete(id);
            if (!deletedCustomer.affected) {
                throw new HttpException('Failed to delete', HttpStatus.NOT_FOUND);
            }
            else{
                
                throw new HttpException('Le client '+user[0].firstName+' '+user[0].lastName+ ' a été supprimé avec succès', HttpStatus.FOUND);
                
            }
        }
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        
        
    }
}
