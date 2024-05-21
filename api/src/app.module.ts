import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { IssuesModule } from './issues/issues.module';
import { PerformanceModule } from './performance/performance.module';
import { ProjectsModule } from './projects/projects.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UsersModule,
    ProjectsModule,
    IssuesModule,
    PerformanceModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
