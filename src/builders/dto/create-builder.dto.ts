import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBuilderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'Sloane constructions' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'SGREG123' })
  registrationNumber: string;
}
