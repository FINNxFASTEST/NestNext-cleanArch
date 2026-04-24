import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllBookingsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId()
  organizationId?: string;

  @ApiPropertyOptional({ enum: ['pending', 'confirmed', 'cancelled'] })
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'cancelled'])
  status?: 'pending' | 'confirmed' | 'cancelled';
}
