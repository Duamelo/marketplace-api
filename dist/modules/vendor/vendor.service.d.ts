import { Repository } from 'typeorm';
<<<<<<< HEAD
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Vendor from './vendor.entity';
export declare class VendorService {
=======
import GetInfo from '../common/interfaces/getInfo.interface';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Vendor from './vendor.entity';
export declare class VendorService implements GetInfo {
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    private readonly vendorRepository;
    private readonly registerBaseService;
    constructor(vendorRepository: Repository<Vendor>, registerBaseService: RegisterBaseService);
    create(vendor: any): Promise<{
        user: Vendor[];
        token: string;
    }>;
    getByEmail(email: string): Promise<Vendor>;
    getById(id: number): Promise<Vendor>;
}
