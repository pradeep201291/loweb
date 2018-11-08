/**
 * Leaderboard component
 */
import { Component, OnInit, Input } from '@angular/core';
import { LeaderBoardData } from './../leader-board.typedef';
import { LeaderBoard } from './../leader-board.resource';
import * as _ from 'lodash';
import { PagerService } from './../../../sl-ui-framework/infrastructure/pagination/pagination.service';

@Component({
    selector: 'sl-leaderboard-info',
    templateUrl: './leader-board-info.component.html',
    providers: []
})
export class LeaderboardInfoComponent implements OnInit {
    resource: { [key: string]: string } = LeaderBoard.LeaderBoardTable;


    /**
     * 
     * 
     * @type {number}
     * @memberOf LeaderboardInfoComponent
     */
    currentPage: number = 0;

    /**
     * 
     * 
     * @type {*}
     * @memberOf LeaderboardInfoComponent
     */
    pager: any = {};

    /**
     * 
     * 
     * @type {any[]}
     * @memberOf LeaderboardInfoComponent
     */
    pagedItems: any[];

    /**
     * 
     * 
     * @type {LeaderBoardFilteredData[]}
     * @memberOf LeaderboardInfoComponent
     */

    @Input() set leaderBoardData(value: LeaderBoardData[]) {
        if (value) {
            this.testCollection = value;
            this.leaderBoardByVolume = this.testCollection.filter(e => e.label === 'Funded');
            this.leaderBoardByUnit = this.testCollection.filter(e => e.label === 'Units');

            if ((this.leaderBoardByVolume && this.leaderBoardByVolume.length > 0) ||
                (this.leaderBoardByUnit && this.leaderBoardByUnit.length > 0)) {
                this.setPage(1);
            }
        }
            this.isVolumeLoaded = true;
            this.isUnitLoaded = true;
    }

    leaderBoardByVolume: LeaderBoardData[] = [];

    leaderBoardByUnit: LeaderBoardData[] = [];

    leaderBoardByUnitPagination: LeaderBoardData[] = [];

    leaderBoardByVolumePagination: LeaderBoardData[] = [];

    testCollection: LeaderBoardData[];

    isVolumeEnabled: boolean = true;
    isUnitEnabled: boolean = false;
    isVolumeLoaded: boolean = false;
    isUnitLoaded: boolean = false;

    /**
     * 
     * 
     * @private
     * @type {string}
     * @memberOf LeaderboardInfoComponent
     */
    sortOrder: string;

    sortBy: string;


    constructor(
        private pagerService: PagerService) { }

    ngOnInit(): void {
    }


    /**
     * Sort the leaderboard list based on Amount and Rank
     *
     * @param {string} type
     *
     * @memberOf LeaderboardComponent
     */
    sortLeaderBoard(field: string, sortOrder: string) {
        this.sortBy = field;
        this.sortOrder = sortOrder;

        if (field === 'name') {
            this.leaderBoardData = _.orderBy(this.leaderBoardData, [(e) => e.name.toLowerCase()], [sortOrder]);
        } else if (field === 'volume') {
            this.leaderBoardByVolume = _.orderBy(this.leaderBoardByVolume, [(e) => e.text.toLowerCase()], [sortOrder]);
        } else if (field === 'unit') {
            this.leaderBoardByUnit = _.orderBy(this.leaderBoardByUnit, [(e) => e.text.toLowerCase()], [sortOrder]);
        } else if (field === 'rank') {
            if (this.isVolumeEnabled) {
                this.leaderBoardByVolume = _.orderBy(this.leaderBoardByVolume, [field], [sortOrder]);
            } else {
                this.leaderBoardByUnit = _.orderBy(this.leaderBoardByUnit, [field], [sortOrder]);
            }
        }
        if ((this.leaderBoardByVolume && this.leaderBoardByVolume.length > 0) ||
            (this.leaderBoardByUnit && this.leaderBoardByUnit.length > 0)) {
            this.setPage(1);
        }
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
            this.isVolumeEnabled = true;
            this.isUnitEnabled = false;
            this.leaderBoardByVolume = this.testCollection.filter(e => e.label === 'Funded');
        } else {
            this.isVolumeEnabled = false;
            this.isUnitEnabled = true;
            this.leaderBoardByUnit = this.testCollection.filter(e => e.label === 'Units');
        }
        if ((this.leaderBoardByVolume && this.leaderBoardByVolume.length > 0) ||
            (this.leaderBoardByUnit && this.leaderBoardByUnit.length > 0)) {
            this.setPage(1);
        }
    }


    /**
     * 
     * 
     * 
     * @memberOf LeaderboardInfoComponent
     */
    next() {
        this.setPage(this.pager.endPage + 1, false);
    }


    /**
     * 
     * 
     * 
     * @memberOf LeaderboardInfoComponent
     */
    previous() {
        this.setPage(this.pager.startPage - 1, false);
    }


    /**
     * 
     * 
     * @param {number} page
     * 
     * @memberOf LeaderboardInfoComponent
     */
    setCurrentPage(page: number) {
        this.currentPage = page;
        this.setPage(page);
    }

    /**
     * 
     * 
     * @param {number} page
     * @param {boolean} [withinTheFrame=true]
     * @returns
     * 
     * @memberOf LeaderboardInfoComponent
     */
    setPage(page: number, withinTheFrame = true) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        if (this.isVolumeEnabled) {
            this.pager = this.pagerService.getPager(this.leaderBoardByVolume.length, page, withinTheFrame);
            this.leaderBoardByVolumePagination = this.leaderBoardByVolume.slice(this.pager.startIndex, this.pager.endIndex + 1);
            this.currentPage = this.pager.currentPage;
        } else {
            this.pager = this.pagerService.getPager(this.leaderBoardByUnit.length, page, withinTheFrame);
            this.leaderBoardByUnitPagination = this.leaderBoardByUnit.slice(this.pager.startIndex, this.pager.endIndex + 1);
            this.currentPage = this.pager.currentPage;
        }

    }
}

