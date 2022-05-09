import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    register(customer: CreateCustomerDto): Promise<{
        user: import("./customer.entity").Customer[];
        token: string;
    }>;
}
