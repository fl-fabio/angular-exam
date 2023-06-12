import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginationCharacters } from '../models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  lengthResources:Subject<number | undefined> = new Subject<number | undefined>();
  pagination:BehaviorSubject<PaginationCharacters> = new BehaviorSubject<PaginationCharacters>({
    size: 10,
    offset: 0,
    currentPage: 0
  });
  filterForName:BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setLengthResources(newLength:number) {
    this.lengthResources.next(newLength);
  }

  setFilterForName(newFilter:string) {
    this.filterForName.next(newFilter);
  }

  setPagination(
    size:number,
    offset:number,
    currentPage:number) {
      const newPagination:PaginationCharacters = {
        size,
        offset,
        currentPage,
      }
    this.pagination.next(newPagination);
  }
}
