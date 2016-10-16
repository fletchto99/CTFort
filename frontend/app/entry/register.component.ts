import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    username: string;
    email: string;
    password: string;
    password_again: string;

    constructor(private authService: AuthService,
                private router: Router) { }

    register() {
        this.authService.register(this.username, this.email, this.password)
            .then(() => this.router.navigate(['/teams']));
    }
}
