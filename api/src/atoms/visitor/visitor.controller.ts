import { Body, Controller, Get, Post } from '@nestjs/common';
import { Visitor, VisitorService } from './visitor.service';
import { Observable } from 'rxjs';

@Controller('/visitor')
export class VisitorController {
  constructor(private readonly service: VisitorService) {}

  @Get()
  getAllVisitors(): Observable<Visitor[]> {
    return this.service.getAllVisitors();
  }

  @Post()
  createVisitor(@Body() visitor: Visitor): Observable<Visitor> {
    return this.service.createVisitor(visitor);
  }
}
