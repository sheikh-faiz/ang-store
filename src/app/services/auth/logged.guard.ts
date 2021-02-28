import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuardService implements CanActivate {
  isLogin = true;
  constructor(
    public auth: AuthService,
    public router: Router,
    private firebaseAuth: AngularFireAuth,
    private activeRoute: ActivatedRoute
  ) {}
  canActivate(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (authState) {
          // check are user is logged in
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
