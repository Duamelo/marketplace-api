import { JwtService } from '@nestjs/jwt';
export declare class RegisterBaseService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: any): Promise<string>;
    hashPassword(password: any): Promise<any>;
}
export default RegisterBaseService;
