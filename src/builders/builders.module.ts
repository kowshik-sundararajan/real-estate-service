import { Module } from '@nestjs/common';
import { BuildersService } from './builders.service';
import { BuildersController } from './builders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Builder, BuilderEntity } from './entities/builder.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Builder.name, schema: BuilderEntity }])],
  controllers: [BuildersController],
  providers: [BuildersService]
})
export class BuildersModule {}
