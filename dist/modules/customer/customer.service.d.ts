import { Repository } from 'typeorm';
import GetInfo from '../common/interfaces/getInfo.interface';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Customer from './customer.entity';
import UpdateCustomerDto from './dto/update-customer.dto';
export declare class CustomerService implements GetInfo {
    private readonly customerRepository;
    private readonly registerBaseService;
    constructor(customerRepository: Repository<Customer>, registerBaseService: RegisterBaseService);
    create(customer: any): Promise<{
        user: Customer[];
        token: string;
    }>;
    getAllCustomer(): Promise<Customer[]>;
    getByEmail(email: string): Promise<Customer>;
    getById(id: number): Promise<Customer>;
    updateCustomer(id: number, post: UpdateCustomerDto): Promise<Customer>;
    deleteCustomer(id: number): Promise<void>;
}
