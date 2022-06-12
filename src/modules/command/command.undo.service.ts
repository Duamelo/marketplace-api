import { Injectable } from '@nestjs/common';
import { CommandReceiver } from './command-receiver.service';
import ICommand from './interfaces/icommand';

/**
 *  Concrete command
 */
@Injectable()
export class CommandUndoService implements ICommand{
    constructor(
        private readonly commandReceiver : CommandReceiver
    ){
        this.commandReceiver = commandReceiver;
    }


    public execute() {
        this.commandReceiver.undo();
    }
}
