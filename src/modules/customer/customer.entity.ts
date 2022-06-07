import { Entity } from 'typeorm';
import { User } from '../common/entities/users/base.entity';

@Entity({ name: 'customer' })
export class Customer extends User{
    
}
export default Customer;