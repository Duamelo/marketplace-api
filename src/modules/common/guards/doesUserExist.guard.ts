import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/modules/customer/customer.service';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly customerService: CustomerService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const userExist = await this.customerService.getByEmail(request.body.email);
        if (userExist) {
            throw new ForbiddenException('This email already exist');
        }
        return true;
    }
}