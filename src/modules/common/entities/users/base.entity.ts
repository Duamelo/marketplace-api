import { PrimaryGeneratedColumn, Column } from 'typeorm';
import Role from '../../roles/role.enum';

export abstract class User {

    //id
    @PrimaryGeneratedColumn()
    public id: number;


     //firstName
    @Column({ type: 'varchar', length: 300 })
    public firstName: string;


     //lastName
    @Column({ type: 'varchar', length: 300 })
    public lastName: string;


    //email
    @Column({ type: 'varchar', length: 300 })
    public email: string;


    //phone
    @Column({ type: 'varchar', length: 300 })
    public phone: string;


    //address
    @Column({ type: 'varchar', length: 300 })
    public address: string;

    //role
    @Column({ type : 'enum', enum : Role , default: Role.Customer })
    public role: Role

    //hashPassword
    @Column({ type: 'varchar', length: 300, nullable: false })
    public password: string;

}