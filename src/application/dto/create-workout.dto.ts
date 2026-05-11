import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
}