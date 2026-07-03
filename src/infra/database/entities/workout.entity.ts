import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

export interface WorkoutExercise {
  name: string;
  sets: {
    weight: number;
    reps: number;
  }[];
}

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

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
  })
  exercises!: WorkoutExercise[];

  @ManyToOne(() => UserEntity, (user) => user.workouts)
  user!: UserEntity;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}