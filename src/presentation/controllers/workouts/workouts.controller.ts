import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateWorkoutDto } from '../../../application/dto/create-workout.dto';
import { WorkoutsService } from '../../../application/services/workouts/workouts.service';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@ApiTags('Workouts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.workoutsService.findAllByUser(user.userId);
  }

  @Get(':id')
  findById(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; email: string },
  ) {
    return this.workoutsService.findById(id, user.userId);
  }

  @Post()
  create(
    @Body() data: CreateWorkoutDto,
    @CurrentUser() user: { userId: string; email: string },
  ) {
    return this.workoutsService.create(data, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateWorkoutDto>,
    @CurrentUser() user: { userId: string; email: string },
  ) {
    return this.workoutsService.update(id, data, user.userId);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; email: string },
  ) {
    return this.workoutsService.delete(id, user.userId);
  }
}