import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { WorkoutEntity } from './workout.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @OneToMany(() => WorkoutEntity, (workout) => workout.user)
  workouts!: WorkoutEntity[];

  @CreateDateColumn()
  createdAt!: Date;
}