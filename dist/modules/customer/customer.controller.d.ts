/// <reference types="multer" />
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
<<<<<<< HEAD
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';
=======
import UpdateCustomerDto from './dto/update-customer.dto';
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    register(customer: CreateCustomerDto): Promise<{
        user: import("./customer.entity").Customer[];
        token: string;
    }>;
<<<<<<< HEAD
    addAvatar(request: RequestWithCustomer, file: Express.Multer.File): Promise<import("../database-file/databaseFile.entity").default>;
=======
    getCustomer(): Promise<import("./customer.entity").Customer[]>;
    getCustomerById(id: number): Promise<import("./customer.entity").Customer>;
    getCustomerByEmail(email: string): Promise<import("./customer.entity").Customer>;
    update(id: number, user: UpdateCustomerDto): Promise<import("./customer.entity").Customer>;
    deleteCustomer(id: number): Promise<void>;
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
}
