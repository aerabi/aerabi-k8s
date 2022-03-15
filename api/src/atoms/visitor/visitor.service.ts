import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

export interface Visitor {
  id?: string;
  name: string;
  email: string;
}

@Injectable()
export class VisitorService {
  private visitors: Visitor[] = [];

  public getAllVisitors(): Observable<Visitor[]> {
    return of(this.visitors);
  }

  public getVisitor(id: string): Observable<Visitor> {
    return of(this.visitors.find((visitor) => visitor.id === id));
  }

  public createVisitor(visitor: Visitor): Observable<Visitor> {
    this.visitors.push(visitor);
    return of(visitor);
  }

  public updateVisitor(visitor: Visitor): Observable<Visitor> {
    const index = this.visitors.findIndex((v) => v.id === visitor.id);
    this.visitors[index] = visitor;
    return of(visitor);
  }

  public deleteVisitor(id: string): Observable<Visitor> {
    const index = this.visitors.findIndex((v) => v.id === id);
    const visitor = this.visitors[index];
    this.visitors.splice(index, 1);
    return of(visitor);
  }
}
