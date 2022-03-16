import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { VisitorRepository } from './visitor.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { visitorSchema, VisitorSchema } from './visitor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisitorSchema.name, schema: visitorSchema },
    ]),
  ],
  controllers: [VisitorController],
  providers: [VisitorService, VisitorRepository],
})
export class VisitorModule {}
