import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkoutEntity } from '../../../infra/database/entities/workout.entity';
import { WorkoutsController } from '../../controllers/workouts/workouts.controller';
import { WorkoutsService } from '../../../application/services/workouts/workouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}