import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrganizationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
