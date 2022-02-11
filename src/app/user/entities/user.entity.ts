import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,BeforeInsert} from 'typeorm'
import {hashSync} from 'bcrypt'
@Entity({name:'user'})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')  
  id:string
  @Column()
  name:string
  @Column()
  email:string
  @Column()
  password:string
  @CreateDateColumn({name:'created_at'})
  createdAt:Date;
  @UpdateDateColumn({name:'updated_at'})
  updatedAt:Date;

  @BeforeInsert()
  hashPasswod(){
      this.password=hashSync(this.password,10);
  }
}


