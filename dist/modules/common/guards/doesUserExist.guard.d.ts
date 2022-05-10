import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/modules/customer/customer.service';
import { VendorService } from 'src/modules/vendor/vendor.service';
export declare class DoesUserExist implements CanActivate {
    private readonly vendorService;
    private readonly customerService;
    constructor(vendorService: VendorService, customerService: CustomerService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateRequest(request: any): Promise<boolean>;
}
