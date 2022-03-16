import { Inject, Injectable } from "@nestjs/common";
import { Observable, of } from 'rxjs';
import { VisitorRepository } from "./visitor.repository";

export interface Visitor {
  id?: string;
  name: string;
  email: string;
}

@Injectable()
export class VisitorService {
  constructor(private readonly visitorRepository: VisitorRepository) {}

  public getAllVisitors(): Observable<Visitor[]> {
    return this.visitorRepository.getAll();
  }

  public getVisitor(id: string): Observable<Visitor> {
    return this.visitorRepository.getById(id);
  }

  public createVisitor(visitor: Visitor): Observable<Visitor> {
    return this.visitorRepository.create(visitor);
  }

  public updateVisitor(visitor: Visitor): Observable<Visitor> {
    return this.visitorRepository.update(visitor);
  }

  public deleteVisitor(id: string): Observable<Visitor> {
    return this.visitorRepository.delete(id);
  }
}
