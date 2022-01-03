import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBuilderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;
}
