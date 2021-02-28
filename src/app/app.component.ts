import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ang-test01';
  direction = 'ltr';
  siteLanguage = 'English';
  siteLocale: string;
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ];
  theme = '';
  constructor(private themes: ThemeService) {}

  ngOnInit(): void {
    this.themes.loadTheme();
    const locate = window.location.pathname.split('/')[1];
    const lang = this.languageList.find((f) => f.code === this.siteLocale);
    this.siteLanguage = lang ? lang.label : 'English';
    this.siteLocale = lang ? lang.code : 'en';
    this.direction = this.siteLocale === 'en' ? 'ltr' : 'rtl';
  }
}
