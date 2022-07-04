import { Entity, OneToMany } from 'typeorm';
import { User } from '../common/entities/users/base.entity';
import Shop from '../shop/shop.entity';

@Entity({ name: 'vendor' })
export class Vendor extends User{
    @OneToMany(() => Shop, (shop) => shop.vendor)
    shops: Shop[];
}
export default Vendor;