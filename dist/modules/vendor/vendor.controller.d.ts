import CreateVendorDto from './dto/create-vendor.dto';
import { VendorService } from './vendor.service';
export declare class VendorController {
    private vendorService;
    constructor(vendorService: VendorService);
    register(vendor: CreateVendorDto): Promise<{
        user: import("./vendor.entity").Vendor[];
        token: string;
    }>;
}
