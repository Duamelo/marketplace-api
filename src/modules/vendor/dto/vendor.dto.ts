import Role from "src/modules/common/roles/role.enum";

export class VendorDto{

    firstName: string;
    lastName: string;
    email: string;
    phone : string;
    address: string;
    role: Role.Vendor;
    password: string;
}

export default VendorDto;