import { Injectable } from '@angular/core';

import { Loan } from './loan-info.model';
/**
 * 
 * 
 * @export
 * @class DashboardDataService
 */
@Injectable()
export class DashboardDataService {

    private _selectedLoan: Loan;
    private _sortBy: string;
    private _sortOrder: string;
    private _widgetId: string;
    private _selectedStatus: string;
    private _currentFilter: string;
    private _searchTerm: string;

     SomeText: string;
    /**
     * 
     * 
     * 
     * @memberOf DashboardDataService
     */
    set SearchTerm(value: string) {
        this._searchTerm = value;
        if (value !== '') {
            this._currentFilter = 'Search';
        } else {
            this._currentFilter = '';
        }
    }

    /**
     * 
     * 
     * @type {string}
     * @memberOf DashboardDataService
     */
    get SearchTerm(): string {
        return this._searchTerm;
    }

    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberOf DashboardDataService
     */
    get CurrentFilter(): string {
        return this._currentFilter;
    }

    /**
     * 
     * 
     * 
     * @memberOf DashboardDataService
     */
    set SortBy(value: string) {
        this._sortBy = value;
    }

    /**
     * 
     * 
     * @type {string}
     * @memberOf DashboardDataService
     */
    get SortBy(): string {
        return this._sortBy;
    }

    /**
     * 
     * 
     * 
     * @memberOf DashboardDataService
     */
    set SortOrder(value: string) {
        this._sortOrder = value;
    }

    /**
     * 
     * 
     * @readonly
     * @type {string}
     * @memberOf DashboardDataService
     */
    get SortOder(): string {
        return this._sortOrder;
    }

    /**
     * 
     * 
     * 
     * @memberOf DashboardDataService
     */
    set WidgetId(value: string) {
        this._widgetId = value;
        if (value !== '') {
            this._currentFilter = 'Widget';
        } else {
            this._currentFilter = '';
        }
    }

    /**
     * 
     * 
     * @type {string}
     * @memberOf DashboardDataService
     */
    get WidgetId(): string {
        return this._widgetId;
    }

    /**
     * 
     * 
     * 
     * @memberOf DashboardDataService
     */
    set SelectedStatus(value: string) {
        this._selectedStatus = value;
        this.WidgetId = '';
        if (value !== '') {
            this._currentFilter = 'Summary';
        } else {
            this._currentFilter = '';
        }
    }

    /**
     * 
     * 
     * @type {string}
     * @memberOf DashboardDataService
     */
    get SelectedStatus(): string {
        return this._selectedStatus;
    }

    /**
     * sets the loan
     * 
     * @param {Loan} loan
     * 
     * @memberOf DashboardDataService
     */
    set SelectedLoan(value: Loan) {
        this._selectedLoan = value;
    }

    /**
     * gets the loan
     * 
     * @type {Loan}
     * @memberOf DashboardDataService
     */
    get SelectedLoan(): Loan {
        return this._selectedLoan;
    }

}
