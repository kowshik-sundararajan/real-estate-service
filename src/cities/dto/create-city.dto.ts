import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'Singapore' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'SG' })
  code: string;
}
