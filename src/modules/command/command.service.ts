import { Injectable, Optional } from '@nestjs/common';
import { CommandReceiver } from './command-receiver.service';
import OrderCommandDto from './dto/orderCommand.dto';
import ICommand from './interfaces/icommand';

/**
 *  Concrete command
 */
@Injectable()
export class CommandService implements ICommand{
    constructor(
        private readonly commandReceiver : CommandReceiver,
        @Optional() private readonly orderCommand: OrderCommandDto
        ){
        this.commandReceiver = commandReceiver;
    }

    public execute() {
        this.commandReceiver.execute(this.orderCommand);
    }
}
