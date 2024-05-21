import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument } from 'src/common/schemas/Issue.schema';
import {
  Performance,
  PerformanceDocument,
} from 'src/common/schemas/Performance.schema';
import { Project, ProjectDocument } from 'src/common/schemas/Project.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Performance.name)
    private performanceModel: Model<PerformanceDocument>,
    @InjectModel(Issue.name) private issueModel: Model<IssueDocument>,
  ) {}

  async getTotlaErrorsForUser(userId: string) {
    const projects = await this.projectModel
      .find({ user: userId })
      .select('_id');
    const projectIds = projects.map((project) => project._id);
    return this.issueModel.countDocuments({ project: { $in: projectIds } });
  }

  async getTotoalErrorsForProject(projectId: string) {
    return this.issueModel.countDocuments({ project: projectId });
  }
}
