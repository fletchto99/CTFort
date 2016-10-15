import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
        EntryComponent,
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: [ EntryComponent ]
})

export class AppModule { }
