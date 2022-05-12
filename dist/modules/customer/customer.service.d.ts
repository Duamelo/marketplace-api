/// <reference types="node" />
import { Connection, Repository } from 'typeorm';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import DatabaseFileService from '../database-file/database-file.service';
import Customer from './customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly registerBaseService;
    private readonly databaseFilesService;
    private connection;
    constructor(customerRepository: Repository<Customer>, registerBaseService: RegisterBaseService, databaseFilesService: DatabaseFileService, connection: Connection);
    create(customer: any): Promise<{
        user: Customer[];
        token: string;
    }>;
    getByEmail(email: string): Promise<Customer>;
    getById(id: number): Promise<Customer>;
    addAvatar(userId: number, imageBuffer: Buffer, filename: string, mimetype: string): Promise<import("../database-file/databaseFile.entity").default>;
}
