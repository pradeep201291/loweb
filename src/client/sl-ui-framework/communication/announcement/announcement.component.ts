import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from './announcement.service';

import { Announcement } from './announcement.model';
declare let $: any;
/**
 * 
 */
@Component({
    selector: 'sl-announcement',
    templateUrl: './announcement.component.html',
    providers: [AnnouncementService]
})
export class AnnouncementComponent implements OnInit {

    announcementList: Announcement[] = [];

    constructor(private AnnouncementService: AnnouncementService) {

    }


    ngOnInit() {
        this.AnnouncementService.getAnnouncements()
            .subscribe(result =>
                this.announcementList = result.data
            );
    }

     onAnnouncementClose() {
        $('.alert-announce').hide();
    }
}
