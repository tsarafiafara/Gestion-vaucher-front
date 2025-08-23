import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _isOpen = new BehaviorSubject<boolean>(true);
  readonly isOpen$ = this._isOpen.asObservable();

  toggle(): void {
    this._isOpen.next(!this._isOpen.value);
  }
}
