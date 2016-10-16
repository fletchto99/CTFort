import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-team',
    templateUrl: 'team.component.html',
    styleUrls: ['team.component.css']
})

export class TeamComponent implements OnInit {
	ngOnInit() {
        $('.modal-trigger').leanModal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
		});
	}
}
