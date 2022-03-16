import { Visitor } from './visitor.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { VisitorDocument, VisitorSchema } from './visitor.schema';

@Injectable()
export class VisitorRepository {
  constructor(
    @InjectModel(VisitorSchema.name)
    private readonly visitorModel: Model<VisitorDocument>,
  ) {}

  public create(visitor: Visitor): Observable<Visitor> {
    return from(this.visitorModel.create(visitor)).pipe(
      map(VisitorRepository.toVisitor),
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
