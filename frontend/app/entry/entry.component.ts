import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-entry',
    templateUrl: 'entry.component.html',
    styleUrls: ['entry.component.css']
})

export class EntryComponent implements OnInit {
    ngOnInit() {
        $('#entry-card .tabs').tabs();
    }
}
