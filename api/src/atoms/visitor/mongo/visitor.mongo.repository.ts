import { Visitor } from '../visitor.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { VisitorDocument, VisitorMongoSchema } from './visitor.mongo.schema';
import { VisitorRepository } from '../visitor.repository';

@Injectable()
export class VisitorMongoRepository implements VisitorRepository {
  constructor(
    @InjectModel(VisitorMongoSchema.name)
    private readonly visitorModel: Model<VisitorDocument>,
  ) {}

  public create(visitor: Visitor): Observable<Visitor> {
    return from(this.visitorModel.create(visitor)).pipe(
      map(VisitorMongoRepository.toVisitor),
    );
  }

  public static toVisitor(visitor: VisitorDocument): Visitor {
    return {
      id: visitor._id,
      name: visitor.name,
      email: visitor.email,
    };
  }
}
