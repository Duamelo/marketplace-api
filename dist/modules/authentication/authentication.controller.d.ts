import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import RequestWithCustomer from '../customer/interfaces/requestWithCustomer.interfaces';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
    login(request: RequestWithCustomer, response: Response): Promise<Response<any, Record<string, any>>>;
    logOut(request: RequestWithCustomer, response: Response): Promise<Response<any, Record<string, any>>>;
}
