import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import type { UserRole } from '../domain/user';

export class CreateUserDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'StrongPass1!', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiPropertyOptional({ enum: ['guest', 'admin'], default: 'guest' })
  @IsOptional()
  @IsEnum(['guest', 'admin'])
  role?: Extract<UserRole, 'guest' | 'admin'>;
}
