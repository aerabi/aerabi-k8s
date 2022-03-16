import { Visitor } from '../visitor.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { VisitorDocument, VisitorMongoSchema } from './visitor.mongo.schema';
import { VisitorRepository } from '../visitor.repository';
import { listMap } from '@rxjsx/rxjsx';

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

  public getAll(): Observable<Visitor[]> {
    return from(this.visitorModel.find().exec()).pipe(
      listMap(VisitorMongoRepository.toVisitor),
    );
  }

  public getById(id: string): Observable<Visitor> {
    return from(this.visitorModel.findById(id).exec()).pipe(
      map(VisitorMongoRepository.toVisitor),
    );
  }

  public update(visitor: Visitor): Observable<Visitor> {
    return from(
      this.visitorModel.findByIdAndUpdate(visitor.id, visitor).exec(),
    ).pipe(map(VisitorMongoRepository.toVisitor));
  }

  public delete(id: string): Observable<Visitor> {
    return from(this.visitorModel.findByIdAndDelete(id).exec()).pipe(
      map(VisitorMongoRepository.toVisitor),
    );
  }

  public getModel(): Model<VisitorDocument> {
    return this.visitorModel;
  }

  public static toVisitor(visitor: VisitorDocument): Visitor {
    return {
      id: visitor._id,
      name: visitor.name,
      email: visitor.email,
    };
  }
}
