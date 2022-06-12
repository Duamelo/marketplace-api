import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import RequestWithCustomer from '../customer/interfaces/requestWithCustomer.interfaces';
import RequestWithVendor from '../vendor/interfaces/requestWithVendor.interface';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
<<<<<<< HEAD
    authenticate(request: RequestWithCustomer): import("../customer/customer.entity").Customer;
=======
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    login(request: RequestWithCustomer | RequestWithVendor, response: Response): Promise<Response<any, Record<string, any>>>;
    logOut(request: RequestWithCustomer | RequestWithVendor, response: Response): Promise<Response<any, Record<string, any>>>;
}
