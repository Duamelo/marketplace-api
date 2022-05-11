/// <reference types="node" />
import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import DatabaseFileService from '../database-file/database-file.service';
import Customer from './customer.entity';
export declare class CustomerService implements GetInfo {
    private readonly customerRepository;
    private readonly registerBaseService;
    private readonly databaseFilesService;
    constructor(customerRepository: Repository<Customer>, registerBaseService: RegisterBaseService, databaseFilesService: DatabaseFileService);
    create(customer: any): Promise<{
        user: Customer[];
        token: string;
    }>;
    getByEmail(email: string): Promise<Customer>;
    getById(id: number): Promise<Customer>;
    addAvatar(userId: number, imageBuffer: Buffer, filename: string): Promise<import("../database-file/databaseFile.entity").default>;
}
