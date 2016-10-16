import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { EntryComponent } from './entry/entry.component';
import { LoginComponent } from './entry/login.component';
import { RegisterComponent } from './entry/register.component';
import { TeamComponent } from './teams/team.component';
import { ModuleComponent } from './teams/module.component';

import { AuthService } from './entry/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LandingComponent,
        EntryComponent,
        LoginComponent,
        RegisterComponent,
        TeamComponent,
        ModuleComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ AuthService ]
})

export class AppModule { }
