import { Module } from '@nestjs/common';
import { BuildersService } from './builders.service';
import { BuildersController } from './builders.controller';

@Module({
  controllers: [BuildersController],
  providers: [BuildersService]
})
export class BuildersModule {}
