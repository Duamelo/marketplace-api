import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Customer from './customer.entity';


@Injectable()
export class CustomerService {
    constructor( 
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly registerBaseService: RegisterBaseService
        ){}

    public async create(customer){

        const user = await this.customerRepository.find({where : {email: customer.email}});
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
    }

    
    async getByEmail(email: string){
       return await this.customerRepository.findOne( {where : {email} });
    }

    async getById(id: number) {
        return  await this.customerRepository.findOne({ where : { id: `${id}` } });
    }
}
