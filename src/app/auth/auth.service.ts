import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth  } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';


@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router ,
                private afAuth: AngularFireAuth ,
                private snackbar: MatSnackBar ,
                private uiservice: UiService,
                private store: Store<{ui: fromApp.State}>) {}

    initAuthListner() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/']);
            } else {
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        // this.uiservice.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.auth
        .createUserWithEmailAndPassword(authData.email , authData.password)
        .then(result => {
         // this.uiservice.loadingStateChanged.next(false);
         this.store.dispatch({type: 'STOP_LOADING'});
        }).catch(error => {
          // this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
            this.snackbar.open(error.message , null , {
                duration: 3000
            });
        });
    }

    login(authData: AuthData) {
        // this.uiservice.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.auth
        .signInWithEmailAndPassword(authData.email , authData.password)
        .then(result => {
            // this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
        }).catch(error => {
            // this.uiservice.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
            this.snackbar.open(error.message , null , {
                duration: 3000
            });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}
