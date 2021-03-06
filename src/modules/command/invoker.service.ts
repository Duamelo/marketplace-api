import { Injectable } from '@nestjs/common';
import ICommand from './interfaces/icommand';

/**
 * Invoker class
 */

@Injectable()
export class Invoker {
    private  command : ICommand;

    constructor(
    ){}

    public setCommand(command : ICommand){
        this.command = command;
    }

    public executeCommand(){
        this.command.execute();
    }
}
