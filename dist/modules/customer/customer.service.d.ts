import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Customer from './customer.entity';
export declare class CustomerService implements GetInfo {
    private readonly customerRepository;
    private readonly registerBaseService;
    constructor(customerRepository: Repository<Customer>, registerBaseService: RegisterBaseService);
    create(customer: any): Promise<{
        user: Customer[];
        token: string;
    }>;
    getByEmail(email: string): Promise<Customer>;
    getById(id: number): Promise<Customer>;
}
