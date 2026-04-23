import { ApiProperty } from '@nestjs/swagger';
import type { IAuthResponse } from '../interfaces/auth-response.interface';

export class AuthResponseDto implements IAuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token (7-day expiry)',
  })
  accessToken: string;

  @ApiProperty({ example: 'Bearer', enum: ['Bearer'] })
  tokenType: 'Bearer';
}
