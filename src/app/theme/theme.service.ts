import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThem = new BehaviorSubject('');
  public getActiveTheme() {
    return this.activeThem.asObservable();
  }
  public setActiveThem(name: string) { 
    this.activeThem.next(name);
  }
}
