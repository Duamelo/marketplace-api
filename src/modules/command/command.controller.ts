import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { CommandReceiver } from './command-receiver.service';
import { CommandService } from './command.service';
import { CommandUndoService } from './command.undo.service';
import CreateOrderDto from './dto/create-order.dto';
import { Invoker } from './invoker.service';

@Controller('commands')
export class CommandController {
    private buyTheBasket;
    private undo ;

    constructor(
        private invoker : Invoker,
        private receiver : CommandReceiver,
        ){
            this.invoker = invoker,
            this.receiver = receiver;
            this.undo = new CommandUndoService(this.receiver);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async create(@Body() order :  CreateOrderDto, @Request() req){
        this.buyTheBasket = new CommandService(this.receiver, {order: order, client: req.user.id});
        this.invoker.setCommand(this.buyTheBasket);
        return await this.invoker.executeCommand();
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    async getAllCommands(){
        return await this.receiver.findAll();
    }


    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get(':id')
    async getCommandById(@Param() id : number){
        return await this.receiver.findOneById(id);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Delete(':id')
    async delete(@Param() id : number){
        return await this.receiver.delete(id);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Put(':orderId')
    async updateOrder(@Param() orderId : number, @Body() order : any){
        return await this.receiver.update(orderId, order);
    }
}