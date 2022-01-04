import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Singapore' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'SG' })
  code: string;
}
