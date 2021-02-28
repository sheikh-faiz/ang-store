import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FetchUser } from 'src/app/action/actions';
import { selectUser } from 'src/app/selectors/selectors';
import { User } from 'src/app/services/models/user.model';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user: User;
  constructor(private store: Store, private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe((authState) => {});
    store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchUser());
  }
}
