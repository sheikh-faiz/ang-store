import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Credentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: firebase.User;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  async login(creds: Credentials): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(
      creds.username,
      creds.password
    );
  }
  async register(email: string, password: string): Promise<void> {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }
  async loginWithgoogle(): Promise<void> {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
