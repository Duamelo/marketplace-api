import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/modules/customer/customer.service';
import { VendorService } from 'src/modules/vendor/vendor.service';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(
        @Inject(forwardRef( () => VendorService))
        @Inject(forwardRef( () => CustomerService))
        private readonly vendorService: VendorService,
        private readonly customerService: CustomerService,
        ) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const customer = await this.customerService.getByEmail(request.body.email);
        const vendor = await this.vendorService.getByEmail(request.body.email);

        if (customer || vendor) {
            throw new ForbiddenException('This email already exist');
        }
        return true;
    }
}