import DatabaseFile from 'src/modules/database-file/databaseFile.entity';
import { PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

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

    @JoinColumn({ name: 'avatarId' })
    @OneToOne(
      () => DatabaseFile,
      {
        nullable: false
      }
    )
    public avatar?: DatabaseFile;
   
    @Column({ nullable: true })
    public avatarId?: number;

}