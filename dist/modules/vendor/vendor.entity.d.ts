import { User } from '../common/entities/users/base.entity';
import Shop from '../shop/shop.entity';
export declare class Vendor extends User {
    shops: Shop[];
}
export default Vendor;
