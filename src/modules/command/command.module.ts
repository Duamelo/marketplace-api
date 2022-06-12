import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Command from './command.entity';
import { CommandReceiver } from './command-receiver.service';
import { Invoker } from './invoker.service';
import { CommandUndoService } from './command.undo.service';
import Cart from '../cart/cart.entity';
import Product from '../product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Command, Cart, Product]),
  ],
  providers: [
     CommandReceiver, 
     Invoker, 
     CommandUndoService, 
     CommandService
  ],
  controllers: [CommandController]  
})
export class CommandModule {}
