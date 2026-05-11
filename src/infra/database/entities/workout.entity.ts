import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('workouts')
export class WorkoutEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({
    nullable: true,
  })
  description!: string;

  @ManyToOne(() => UserEntity, (user) => user.workouts)
  user!: UserEntity;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}