import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class WorkoutSetDto {
  @ApiProperty({
    example: 40,
  })
  @IsNumber()
  weight!: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  reps!: number;
}

class WorkoutExerciseDto {
  @ApiProperty({
    example: 'Supino reto',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: [
      {
        weight: 40,
        reps: 12,
      },
      {
        weight: 45,
        reps: 10,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutSetDto)
  sets!: WorkoutSetDto[];
}

export class CreateWorkoutDto {
  @ApiProperty({
    example: 'Treino de Peito',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Supino e crucifixo',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    example: [
      {
        name: 'Supino reto',
        sets: [
          {
            weight: 40,
            reps: 12,
          },
          {
            weight: 45,
            reps: 10,
          },
        ],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDto)
  exercises?: WorkoutExerciseDto[];
}