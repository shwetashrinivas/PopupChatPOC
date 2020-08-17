import { Injectable, Inject, EventEmitter } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme } from './symbols';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from "./option.model";
import { StyleManagerService } from './style-manager.service';

@Injectable()
export class ThemeService {

  themeChange = new EventEmitter<Theme>();

  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService,
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string
  ) {
  }

  getActiveTheme() {
    const theme = this.themes.find(t => t.name === this.theme);
    if (!theme) {
      throw new Error(`Theme not found: '${this.theme}'`);
    }
    return theme;
  }

  setTheme(name: string) {
    this.theme = name;
    this.themeChange.emit( this.getActiveTheme());
  }



  // For Dynamic Theme

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>("assets/options.json");
  }

  setThemeOptions(themeToSet) {
    this.styleManager.setStyle(
      "theme",
      `assets/${themeToSet}.css`
    );
  }

}
