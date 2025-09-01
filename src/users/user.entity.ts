import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


export enum UserRole {
  ADMIN = 1,
  DIRECTOR = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DIRECTOR, // default role is director
  })
  role: UserRole;
}
