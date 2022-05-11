/// <reference types="multer" />
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    register(customer: CreateCustomerDto): Promise<{
        user: import("./customer.entity").Customer[];
        token: string;
    }>;
    addAvatar(request: RequestWithCustomer, file: Express.Multer.File): Promise<import("../database-file/databaseFile.entity").default>;
}
