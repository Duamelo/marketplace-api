import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import Role from '../roles/role.enum';
import { ROLES_KEY } from '../decorators/core/roles.decorator';
//import { User } from '../entities/users/base.entity';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),]);
    if (!requiredRoles) {
      return true;
    }
    
    
    //const { User } = context.switchToHttp().getRequest();
    //return requiredRoles.some((role) => user.role.includes(role));
    // const hasRole = () => user.roles.some((role) => roles.indexOf(role)> -1);
    // let hasPermission = false;

    // if(hasRole()){
    //   hasPermission = true;
    //   if(req.params.email || req.body.email) {
    //     if(req.user.email != req.params.email && req.user.email != req.body.email){ 
    //           hasPermission = false;
    //     }
    //   }
    // }
    // return user && user.roles && hasPermission;
  }
}
