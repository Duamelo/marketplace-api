<<<<<<< HEAD
import Role from '../../roles/role.enum';
=======
import DatabaseFile from 'src/modules/database-file/databaseFile.entity';
>>>>>>> main
export declare abstract class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role: Role;
    password: string;
    avatar?: DatabaseFile;
    avatarId?: number;
}
