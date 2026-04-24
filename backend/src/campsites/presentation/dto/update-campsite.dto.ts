import { PartialType, OmitType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { CreateCampsiteDto } from './create-campsite.dto';

export class UpdateCampsiteDto extends PartialType(
  OmitType(CreateCampsiteDto, ['organizationId'] as const),
) {
  @ApiPropertyOptional({ enum: ['active', 'inactive'] })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
