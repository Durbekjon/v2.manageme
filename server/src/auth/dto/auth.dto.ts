import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'User username' })
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short' })
  password: string;
}
