import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    username: string;
    password: string;

    constructor(private authService: AuthService) { }

    login() {
        console.log('login');
        this.authService.login(this.username, this.password);
    }
}
