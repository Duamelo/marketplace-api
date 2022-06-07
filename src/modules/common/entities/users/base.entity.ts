import { PrimaryGeneratedColumn, Column } from 'typeorm';

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


    //hashPassword
    @Column({ type: 'varchar', length: 300, nullable: false })
    public password: string;

}