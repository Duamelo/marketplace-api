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
    getByEmail(email: string): Promise<Vendor>;
    getById(id: number): Promise<Vendor>;
}
