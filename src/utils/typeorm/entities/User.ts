import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstname: string;

  @Column({ name: 'last_name' })
  lastname: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;
}
