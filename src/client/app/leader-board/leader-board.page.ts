/**
 * Leaderboard page component
 * 
 */
import { Component, OnInit } from '@angular/core';

import { LeaderBoardService } from './leader-board.service';
import { LeaderBoardData, LeaderBoardFilteredData } from './leader-board.typedef';
import { ProductPricingService } from './../../app/product-pricing/product-pricing.service';


@Component({
    selector: 'sl-leaderboard',
    templateUrl: './leader-board.page.html'
})
export class LeaderboardPage implements OnInit {

    /**
     *
     *
     * @type {LeaderBoardData[]}
     * @memberOf LeaderboardComponent
     */
    fundersCollection: LeaderBoardData[];

    /**
     *
     *
     * @type {LeaderBoardData[]}
     * @memberOf LeaderboardComponent
     */
    totalCollection: LeaderBoardData[];

    leaderBoardFilteredData: Array<LeaderBoardFilteredData>;


    /**
     * Creates an instance of LeaderboardComponent.
     *
     * @param {LeaderBoardService} leaderBoardSrc
     *
     * @memberOf LeaderboardComponent
     */
    constructor(private leaderBoardService: LeaderBoardService,
        private productPricingService: ProductPricingService) {
    }

    ngOnInit() {
        this.getLeaderBoard();
    }


    /**
     *
     * Get the leader board Data from API
     *
     * @memberOf LeaderboardComponent
     */
    getLeaderBoard() {
        this.productPricingService.productPricingListData = null;
        this.leaderBoardService.getLeaderBoardData()
            .subscribe(items => {
                // this.leaderBoardFilteredData = this.leaderBoardService.manipulateLeaderBoard(items.data);
                this.totalCollection = items.data;
            });
    }

}
