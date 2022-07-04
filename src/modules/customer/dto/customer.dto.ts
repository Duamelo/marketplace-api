import Role from "src/modules/common/roles/role.enum";

export class CustomerDto{

     firstName: string;
     lastName: string;
     email: string;
     phone : string;
     address: string;
     role: Role.Customer;
     password: string;
}

export default CustomerDto;