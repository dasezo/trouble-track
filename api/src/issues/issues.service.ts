import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Issue } from 'src/common/schemas/Issue.schema';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectModel(Issue.name) private issueModel: Model<Issue>,
    private projectsService: ProjectsService,
  ) {}

  async create(projectId: string, createIssueDto: CreateIssueDto) {
    if (!isValidObjectId(projectId))
      throw new BadRequestException('Invalid project id');
    const newIssue = await this.issueModel.create({
      ...createIssueDto,
      severity: this.determineSeverity(createIssueDto.type),
      project: projectId,
    });

    await this.projectsService.addIssue(projectId, String(newIssue._id));
    return newIssue;
  }

  async findAll(projectId: string) {
    const issues = await this.issueModel.find({ project: projectId });
    if (issues.length < 1) {
      throw new NotFoundException('Issues not found for this project');
    }
    return issues;
  }

  async findOne(id: string) {
    const issue = await this.issueModel.findById(id);
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }
    return issue;
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    const updated = await this.issueModel.findByIdAndUpdate(
      id,
      updateIssueDto,
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException('Issue not found');
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.issueModel.findByIdAndDelete(id);
    await this.projectsService.removeIssue(String(deleted.project), id);
    return deleted;
  }

  private determineSeverity = (errorType) => {
    // Define rules for error types
    const criticalErrors = ['TypeError', 'ReferenceError', 'AxiosError'];
    const majorErrors = [
      'SyntaxError',
      'RangeError',
      'ForbiddenException',
      'unhandledrejection',
    ];

    if (criticalErrors.includes(errorType)) {
      return 'Critical';
    } else if (majorErrors.includes(errorType)) {
      return 'Major';
    } else {
      return 'Minor';
    }
  };
}
