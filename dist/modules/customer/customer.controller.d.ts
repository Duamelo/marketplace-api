import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import UpdateCustomerDto from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    register(customer: CreateCustomerDto): Promise<{
        user: import("./customer.entity").Customer[];
        token: string;
    }>;
    getCustomer(): Promise<import("./customer.entity").Customer[]>;
    getCustomerById(id: number): Promise<import("./customer.entity").Customer>;
    getCustomerByEmail(email: string): Promise<import("./customer.entity").Customer>;
    update(id: number, user: UpdateCustomerDto): Promise<import("./customer.entity").Customer>;
    deleteCustomer(id: number): Promise<void>;
}
