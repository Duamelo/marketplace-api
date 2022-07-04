import DatabaseFile from 'src/modules/database-file/databaseFile.entity';
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import Role from '../../roles/role.enum';

export abstract class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 300 })
    public firstName: string;

    @Column({ type: 'varchar', length: 300 })
    public lastName: string;

    @Column({ type: 'varchar', length: 300 })
    public email: string;

    @Column({ default: false })
    public isEmailConfirmed: boolean;

    @Column({ type: 'varchar', length: 300 })
    public phone: string;

    @Column({ type: 'varchar', length: 300 })
    public address: string;

    @Column({ type : 'enum', enum : Role , default: Role.Customer })
    public role: Role

    @Column({ type: 'varchar', length: 300, nullable: false })
    public password: string;

    @JoinColumn({ name: 'avatarId' })
    @OneToOne( () => DatabaseFile, { nullable: true } )
    public avatar?: DatabaseFile;

    @Column({ nullable: true })
    public avatarId?: number;
}