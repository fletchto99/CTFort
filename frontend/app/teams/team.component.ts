import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../entry/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-team',
    templateUrl: 'team.component.html',
    styleUrls: ['team.component.css']
})

export class TeamComponent implements OnInit {
    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/entry/login']);
    }
}
