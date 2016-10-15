import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { EntryComponent } from './entry/entry.component';
import { LoginComponent } from './entry/login.component';
import { RegisterComponent } from './entry/register.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LandingComponent,
        EntryComponent,
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
