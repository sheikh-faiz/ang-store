import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/selectors/selectors';
import { User } from 'src/app/services/models/user.model';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: User;
  activeTheme = 'Light';
  siteLocale: string;
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arebic' },
  ];

  constructor(
    private store: Store,
    private firebaseAuth: AngularFireAuth,
    private themes: ThemeService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    store.select(selectUser).subscribe((e) => {
      this.user = e;
    });
  }
  ngOnInit(): void {
    const locate = window.location.pathname.split('/')[1];
    const lang = this.languageList.find((f) => f.code === this.siteLocale);
    this.siteLanguage = lang ? lang.label : 'English';
    this.siteLocale = lang ? lang.code : 'en';
  }
  onthemeChange(e): void {
    if (e) {
      this.activeTheme = 'Dark';
    } else {
      this.activeTheme = 'Light';
    }
    this.themes.onthemeChange();
  }
  SignOut(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
  islogged(): boolean {
    if (Object.keys(this.user).length > 0) {
      return true;
    }
    return false;
  }
  chooseLanguage(code): void {
    window.location.href = '/' + code;
    this.siteLocale = code;
  }
}
