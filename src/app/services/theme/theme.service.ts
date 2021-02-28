import { Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: string;
  renderer: any;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  themeType(): void {
    const themesType = localStorage.getItem('theme_type');
    this.theme = !!themesType ? themesType : 'ang-test-theme-light';
  }
  loadTheme(): void {
    this.themeType();
    this.renderer.addClass(document.body, this.theme);
  }
  onthemeChange(): void {
    this.theme =
      this.theme === 'ang-test-theme-light'
        ? 'ang-test-theme-dark'
        : 'ang-test-theme-light';
    this.renderer.removeClass(document.body, 'ang-test-theme-light');
    this.renderer.removeClass(document.body, 'ang-test-theme-dark');
    this.renderer.addClass(document.body, this.theme);
  }
}
