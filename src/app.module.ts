import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchesModule } from './branches/branches.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getEnvPath } from './utils/get-env-name';
import { UsersBranchesModule } from './users-branches/users-branches.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    AuthModule,
    BranchesModule,
    UsersModule,
    UsersBranchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
