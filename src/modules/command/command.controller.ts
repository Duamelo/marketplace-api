import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { CommandReceiver } from './command-receiver.service';
import { CommandService } from './command.service';
import { CommandUndoService } from './command.undo.service';
import CreateOrderDto from './dto/create-order.dto';
import { Invoker } from './invoker.service';

@Controller('command')
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

    
}
