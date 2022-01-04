import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Jon Snow' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'jon@snow.com' })
  email: string;
}
