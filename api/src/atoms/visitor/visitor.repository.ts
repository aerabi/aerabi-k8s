import { Observable, of } from "rxjs";
import { Visitor } from './visitor.service';
import { Injectable } from "@nestjs/common";

export abstract class VisitorRepository {
  abstract create(visitor: Visitor): Observable<Visitor>;
  abstract getAll(): Observable<Visitor[]>;
  abstract getById(id: string): Observable<Visitor>;
  abstract update(visitor: Visitor): Observable<Visitor>;
  abstract delete(id: string): Observable<Visitor>;
}

@Injectable()
export class MockVisitorRepository extends VisitorRepository {
  visitors: Visitor[] = [];

  create(visitor: Visitor): Observable<Visitor> {
    this.visitors.push(visitor);
    return of(visitor);
  }

  public getAll(): Observable<Visitor[]> {
    return of(this.visitors);
  }

  public getById(id: string): Observable<Visitor> {
    return of(this.visitors.find((visitor) => visitor.id === id));
  }

  public update(visitor: Visitor): Observable<Visitor> {
    const index = this.visitors.findIndex((v) => v.id === visitor.id);
    this.visitors[index] = visitor;
    return of(visitor);
  }

  public delete(id: string): Observable<Visitor> {
    const index = this.visitors.findIndex((v) => v.id === id);
    const visitor = this.visitors[index];
    this.visitors.splice(index, 1);
    return of(visitor);
  }
}
