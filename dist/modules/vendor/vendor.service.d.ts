import { Repository } from 'typeorm';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import Vendor from './vendor.entity';
export declare class VendorService {
    private readonly vendorRepository;
    private readonly registerBaseService;
    constructor(vendorRepository: Repository<Vendor>, registerBaseService: RegisterBaseService);
    create(vendor: any): Promise<{
        user: Vendor[];
        token: string;
    }>;
    findOneByEmail(email: string): Promise<Vendor>;
    findOneById(id: number): Promise<Vendor>;
}
