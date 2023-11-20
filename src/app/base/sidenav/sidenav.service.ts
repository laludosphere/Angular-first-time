// sidenav.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _expanded = true;
  private _pinned = true;
  private _isMobileDisplay = false;

  public currentEntityName$: BehaviorSubject<string> = new BehaviorSubject('');
  public currentChildEntityName$: BehaviorSubject<string> = new BehaviorSubject('');
  public activeRoute$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private router: Router) {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      this._pinned = false;
      this._expanded = false;
      this._isMobileDisplay = true;
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute$.next(event.url);
      });
  }

  public getExpanded(): boolean {
    return this._expanded || this._pinned;
  }

  public getPinned(): boolean {
    return this._pinned;
  }

  public getMobileDisplay(): boolean {
    return this._isMobileDisplay;
  }

  public toggleExpanded(): void {
    this._expanded = !this._expanded;
  }

  public setExpanded(expanded: boolean): void {
    this._expanded = expanded;
  }
  
  public togglePinned(): void {
    this._pinned = !this._pinned;
  }

  public setCurrentEntityName(name: string): void {
    this.currentEntityName$.next(name);
  }

  public setCurrentChildEntityName(name: string): void {
    this.currentChildEntityName$.next(name);
  }
}
