import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, IssueSchema } from 'src/common/schemas/Issue.schema';
import {
  Performance,
  PerformanceSchema,
} from 'src/common/schemas/Performance.schema';
import { Project, ProjectSchema } from 'src/common/schemas/Project.schema';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Performance.name, schema: PerformanceSchema },
      { name: Issue.name, schema: IssueSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
