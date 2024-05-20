import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from './Project.schema';

export type IssueDocument = Issue & Document;

@Schema({ timestamps: true })
export class Issue {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  stack: string;

  @Prop()
  source: string;

  @Prop({ enum: ['Critical', 'Major', 'Minor'], required: true })
  severity: string;

  @Prop({ enum: ['open', 'closed', 'archived'], default: 'open' })
  status: string;

  @Prop()
  occurredAt: Date;

  @Prop()
  userAgent: string;

  @Prop()
  resolvedAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Project;

  createdAt: Date;
  updatedAt: Date;
}
export const IssueSchema = SchemaFactory.createForClass(Issue);
