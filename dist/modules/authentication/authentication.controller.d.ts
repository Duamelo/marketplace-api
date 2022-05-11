import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import RequestWithCustomer from '../customer/interfaces/requestWithCustomer.interfaces';
import RequestWithVendor from '../vendor/interfaces/requestWithVendor.interface';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
    authenticate(request: RequestWithCustomer): import("../customer/customer.entity").Customer;
    login(request: RequestWithCustomer | RequestWithVendor, response: Response): Promise<Response<any, Record<string, any>>>;
    logOut(request: RequestWithCustomer | RequestWithVendor, response: Response): Promise<Response<any, Record<string, any>>>;
}
