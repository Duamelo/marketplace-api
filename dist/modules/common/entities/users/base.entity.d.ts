import Role from '../../roles/role.enum';
export declare abstract class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role: Role;
    password: string;
}
