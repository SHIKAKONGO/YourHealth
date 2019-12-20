import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ ],
    imports: []
})
export class AuthModule {}


