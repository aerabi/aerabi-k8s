import { Observable } from 'rxjs';
import { Visitor } from './visitor.service';

export abstract class VisitorRepository {
  abstract create(visitor: Visitor): Observable<Visitor>;
}
