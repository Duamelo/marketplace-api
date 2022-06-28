/// <reference types="multer" />
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import UpdateCustomerDto from './dto/update-customer.dto';
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    register(customer: CreateCustomerDto): Promise<{
        user: import("./customer.entity").Customer[];
        token: string;
    }>;
    addAvatar(request: RequestWithCustomer, file: Express.Multer.File): Promise<import("../database-file/databaseFile.entity").default>;
    getAllCustomers(): Promise<import("./customer.entity").Customer[]>;
    getCustomerById(id: number): Promise<import("./customer.entity").Customer>;
    getCustomerByEmail(email: string): Promise<import("./customer.entity").Customer>;
    update(id: number, user: UpdateCustomerDto): Promise<import("./customer.entity").Customer>;
    deleteCustomer(id: number): Promise<void>;
}
