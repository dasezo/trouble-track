import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from './Project.schema';

export type PerformanceDocument = Performance & Document;

@Schema({ timestamps: true })
export class Performance {
  @Prop({ required: true })
  responseTime: number;

  @Prop({ required: true })
  loadTime: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Project;

  createdAt: Date;
  updatedAt: Date;
}
export const PerformanceSchema = SchemaFactory.createForClass(Performance);
