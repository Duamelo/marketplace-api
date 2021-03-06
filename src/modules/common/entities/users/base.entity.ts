import { boolean } from '@hapi/joi';
import DatabaseFile from 'src/modules/database-file/databaseFile.entity';
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
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

    //confirmation d'email
    @Column({ default: false })
    public isEmailConfirmed: boolean;

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

    @JoinColumn({ name: 'avatarId' })
    @OneToOne(
      () => DatabaseFile,
      {
        nullable: true
      }
    )
    public avatar?: DatabaseFile;
   
    @Column({ nullable: true })
    public avatarId?: number;

}