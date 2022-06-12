import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterBaseService {
    constructor(
        private  jwtService: JwtService,
    ){ }

    public async generateToken(user){
<<<<<<< HEAD
        const {firstName, lastName, email, phone, address, role} = user;
        console.log("generate token");
        console.log(user);
        const token = await this.jwtService.signAsync({firstName, lastName, email, phone, address, role});
=======
        const {firstName, lastName, email, phone, address} = user;
        const token = await this.jwtService.signAsync({firstName, lastName, email, phone, address});
>>>>>>> main
        return token;
    }

    public async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
}
export default RegisterBaseService;
