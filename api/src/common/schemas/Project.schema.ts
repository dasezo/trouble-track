import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Issue } from './Issue.schema';
import { Performance } from './Performance.schema';
import { User } from './User.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Issue' })
  issues: [Issue];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Performance' })
  performanceRecords: [Performance];

  createdAt: Date;
  updatedAt: Date;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
