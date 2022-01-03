import { IsNotEmpty, IsString } from 'class-validator'
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateBuilderDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;
}
