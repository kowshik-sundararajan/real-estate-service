import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'Jon Snow' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'jon@snow.com' })
  email: string;
}
