import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MembershipDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
