import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
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

        const hashPassword = await this.registerBaseService.hashPassword(vendor.password);

        vendor.password = hashPassword;

        const newVendor =  await this.vendorRepository.create(vendor);
        const _vendor = await this.vendorRepository.save(newVendor);
        const token = await this.registerBaseService.generateToken(_vendor);

        return { user: _vendor, token: token };
        }
    }
    
    async findOneByEmail(email: string){
       return await this.vendorRepository.findOne( {
           where : {
               email
           },
           relations : {
               shops : true
           }

       });
    }

    async findOneById(id: number) {
        return  await this.vendorRepository.findOne({
             where : {
                id: id 
            },
            relations: {
                shops: true
            } 
        });
    }
}