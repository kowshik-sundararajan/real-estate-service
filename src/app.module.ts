import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { BuildersModule } from './builders/builders.module';
import { CitiesModule } from './cities/cities.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { FacebookLoginStrategy } from './facebook-login.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CitiesModule,
    BuildersModule,
    UsersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [FacebookLoginStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude('facebook')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
