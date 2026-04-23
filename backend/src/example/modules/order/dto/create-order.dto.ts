import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'prod-001' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail()
  customerEmail: string;
}
