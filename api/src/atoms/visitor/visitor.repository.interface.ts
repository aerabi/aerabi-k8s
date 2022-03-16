import { Observable } from 'rxjs';
import { Visitor } from './visitor.service';

export interface IVisitorRepository {
  create(visitor: Visitor): Observable<Visitor>;
}
