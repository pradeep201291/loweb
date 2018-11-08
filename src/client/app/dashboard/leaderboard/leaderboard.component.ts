import { Component, OnInit } from '@angular/core';

import { LeaderBoardService } from './leaderboard.service';
import { FunderDO } from './leaderboard.model';

import * as _ from 'lodash';
/**
 * 
 */
@Component({
    selector: 'sl-leaderboard',
    templateUrl: './leaderboard.component.html'
})

export class LeaderboardComponent implements OnInit {

    /**
     * 
     * 
     * @type {boolean}
     * @memberOf LeaderboardComponent
     */
    isAmount: boolean = true;

    /**
     * 
     * 
     * @type {boolean}
     * @memberOf LeaderboardComponent
     */
    isUnit: boolean = false;

    /**
     * 
     * 
     * @type {FunderDO[]}
     * @memberOf LeaderboardComponent
     */
    fundersCollection: FunderDO[];

    /**
     * 
     * 
     * @type {FunderDO[]}
     * @memberOf LeaderboardComponent
     */
    totalCollection: FunderDO[];
    private sortOrder: string;

    /**
     * Creates an instance of LeaderboardComponent.
     * 
     * @param {LeaderBoardService} leaderBoardSrc
     * 
     * @memberOf LeaderboardComponent
     */
    constructor(private leaderBoardSrc: LeaderBoardService) { }

    ngOnInit() {
        this.sortOrder = 'asc';
        this.getFunders();
    }


    /**
     * 
     * Get the leader board Data from API
     * 
     * @memberOf LeaderboardComponent
     */
    getFunders() {
        this.leaderBoardSrc.getFunders()
            .subscribe(items => {
                this.totalCollection = items.data;
                this.fundersCollection = this.totalCollection.filter(e => e.label === 'Funded');
                this.fundersCollection = _.orderBy(this.fundersCollection, [(e) => e.rank], [this.sortOrder]);
            });
    }


    /**
     * Sort the leaderboard list based on Amount and Rank
     * 
     * @param {string} type
     * 
     * @memberOf LeaderboardComponent
     */
    sortClick(type: string) {
        if (type === 'amount') {
            this.isAmount = true;
            this.isUnit = false;
            this.fundersCollection = this.totalCollection.filter(e => e.label === 'Funded');
            this.fundersCollection = _.orderBy(this.fundersCollection, [(e) => e.rank], [this.sortOrder]);
        } else {
            this.isAmount = false;
            this.isUnit = true;
            this.fundersCollection = this.totalCollection.filter(e => e.label === 'Units');
            this.fundersCollection = _.orderBy(this.fundersCollection, [(e) => e.rank], [this.sortOrder]);
        }
    }

}
