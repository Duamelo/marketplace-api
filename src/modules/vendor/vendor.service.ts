import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Vendor from './vendor.entity';


@Injectable()
export class VendorService implements GetInfo {
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


        //tslin:disable-next-line: no-string-literal

        // const { password, ...result } = client;


        //generate token
        const token = await this.registerBaseService.generateToken(_vendor);


        //return the customer and the token

        return { user: _vendor, token: token };
        }
    }

    
    async getByEmail(email: string){
       return await this.vendorRepository.findOne( {where : {email} });
    }

    async getById(id: number) {
        return  await this.vendorRepository.findOne({ where : { id: id } });
    }
}