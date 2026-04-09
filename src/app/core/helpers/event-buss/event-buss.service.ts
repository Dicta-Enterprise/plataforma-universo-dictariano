import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { GlobalEvent } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventBussService {
  private eventSubject = new Subject<GlobalEvent>();

  /**
   * Emitir un evento
   */
  emit<T>(name: string, payload: T): void {
    this.eventSubject.next({ name, payload });
  }

  /**
   * Escuchar un evento por nombre
   */
  on<T>(name: string): Observable<T> {
    return this.eventSubject.asObservable().pipe(
      filter((event) => event.name === name),
      map((event) => event.payload as T)
    );
  }
}
