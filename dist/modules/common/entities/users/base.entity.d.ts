import DatabaseFile from 'src/modules/database-file/databaseFile.entity';
export declare abstract class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    avatar?: DatabaseFile;
    avatarId?: number;
}
