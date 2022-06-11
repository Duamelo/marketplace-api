import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, Delete, Param, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
// import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';
import UpdateCustomerDto from './dto/update-customer.dto';


@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService){}

    //register
    @HttpCode(200)
    //@UseGuards(DoesUserExist)
    @UsePipes(ValidationPipe)
    @Post('register')
    async register(@Body() customer: CreateCustomerDto) {
        return await this.customerService.create(customer);
    }

    @Post('avatar')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithCustomer, @UploadedFile() file: Express.Multer.File) {
      return this.customerService.addAvatar(request.user.id, file.buffer, file.originalname, file.mimetype);
    }


    @Get()
    getCustomer(){
        return this.customerService.getAllCustomer();
    }

    //get customer by id
    @Get(':id')
    getCustomerById(@Param('id') id: number){
        return this.customerService.getById(id);
    }

    //get customer by email
    @Get('/email/:email')
    getCustomerByEmail(@Param('email') email: string){
        return this.customerService.getByEmail(email);
    }

    //update
    @HttpCode(200)
    // @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthenticationGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateCustomerDto){
        return await this.customerService.updateCustomer(id, user);
    }

    //delete customer 
    //verifier que le client est authentifié
    @HttpCode(200)
    @Delete('/:id')
    async deleteCustomer(@Param('id') id: number) {
        return await this.customerService.deleteCustomer(id);
    }
}
