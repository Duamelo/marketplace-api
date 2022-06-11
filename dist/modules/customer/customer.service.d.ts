<<<<<<< HEAD
/// <reference types="node" />
import { Connection, Repository } from 'typeorm';
=======
import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import DatabaseFileService from '../database-file/database-file.service';
import Customer from './customer.entity';
import UpdateCustomerDto from './dto/update-customer.dto';
export declare class CustomerService implements GetInfo {
    private readonly customerRepository;
    private readonly registerBaseService;
    private readonly databaseFilesService;
    private connection;
    constructor(customerRepository: Repository<Customer>, registerBaseService: RegisterBaseService, databaseFilesService: DatabaseFileService, connection: Connection);
    create(customer: any): Promise<{
        user: Customer[];
        token: string;
    }>;
    getAllCustomer(): Promise<Customer[]>;
    getByEmail(email: string): Promise<Customer>;
    getById(id: number): Promise<Customer>;
<<<<<<< HEAD
    addAvatar(userId: number, imageBuffer: Buffer, filename: string, mimetype: string): Promise<import("../database-file/databaseFile.entity").default>;
=======
    updateCustomer(id: number, post: UpdateCustomerDto): Promise<Customer>;
    deleteCustomer(id: number): Promise<void>;
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
}
