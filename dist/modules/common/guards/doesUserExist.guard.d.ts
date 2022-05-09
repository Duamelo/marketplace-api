import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/modules/customer/customer.service';
export declare class DoesUserExist implements CanActivate {
    private readonly customerService;
    constructor(customerService: CustomerService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateRequest(request: any): Promise<boolean>;
}
