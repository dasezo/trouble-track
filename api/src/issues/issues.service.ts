import { BadRequestException, Injectable } from '@nestjs/common';
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
    });

    await this.projectsService.addIssue(projectId, String(newIssue._id));
    return newIssue;
  }

  findAll() {
    return `This action returns all issues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issue`;
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }

  private determineSeverity = (type) => {
    // Example criteria for determining severity
    if (type == 'TypeError') {
      return 'Critical';
    } else if (type == 'ReferenceError') {
      return 'Major';
    } else if (type == 'SyntaxError') {
      return 'Major';
    } else if (type == 'RangeError') {
      return 'Minor';
    } else {
      return 'Critical';
    }
  };
}
