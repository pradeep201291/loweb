import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InteractionService } from './../../sl-ui-framework/infrastructure/interaction.service';
import { FilterPipelineService } from './shared/filter.pipeline.service';
import { LoanInformationService } from './shared/loan-Info.service';
import { Loan, Widget, Summary, PipelineSearchModel, PipelineType } from './shared/loan-Info.model';
import { DashboardDataService } from './shared/dashboard-data.service';
import { PipeLineService } from '../pipeline/pipeline.service';
import { MenuService } from '../../sl-ui-framework/layout/service/menu.service';
import { DashboardService } from './dashboard.service';
import { GetScenarioPipelineRequest, PriceQuote } from './dashboard.typedef';
import { ProductPricingService } from '../../app/product-pricing/product-pricing.service';
declare var $: any;
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

const origination_state = 'In Origination';
const fullPipeline = '130';


/**
 *  The main Dashboard view component.
 * The service will be called from this component and will be shared to the child components
 */
/**
 * 
 * 
 * @export
 * @class DashBoardPage
 */
@Component({
    selector: 'sl-dashboard',
    templateUrl: './dashboard.page.html',
    host: {
        '(document:click)': 'onClick($event)',
    },

})
export class DashBoardPage implements OnInit, OnDestroy {
    loanDetails: Loan[];
    summary: Summary[];
    searchTerm: string = '';
    searchBorrower: string;
    currentTab: string = 'action';
    widgetId: string;
    private _actionSearch: PipelineSearchModel;
    private _statusSearch: PipelineSearchModel;
    private componentDestroyed: Subject<void>;

    get currentPipelineName(): string {
        switch (this.currentTab) {
            case 'action':
                return this._actionSearch ?
                    this._actionSearch.widgets.find(e => e.widget_id === this._actionSearch.widgetId).name + ': ' : '';
            case 'status':
                if (this._statusSearch && this._statusSearch.widgetId === '') {
                    return '';
                }
                return (this._statusSearch && this._statusSearch.summary) ?
                    this._statusSearch.summary.find(e => e.name === this._statusSearch.widgetId).name + ': ' : '';

        }
    }
    get actionSearch(): PipelineSearchModel {
        return this._actionSearch;
    }

    set actionSearch(value: PipelineSearchModel) {
        this._actionSearch = value;
        this.dashboardDataService.setActionState(value);
        this.dashboardDataService.setLastState(PipelineType.Action);
    }

    get statusSearch(): PipelineSearchModel {
        return this._statusSearch;
    }

    set statusSearch(value: PipelineSearchModel) {
        this._statusSearch = value;
        this.dashboardDataService.setStatusState(value);
        this.dashboardDataService.setLastState(PipelineType.Status);
    }

    getScenarioPipelineRequest: GetScenarioPipelineRequest;

    get isScenarioPipeline(): boolean {
        return this.currentTab === 'scenarios';
    }

    get isPipeline(): boolean {
        return this.currentTab === 'action';
    }

    widgetDetails: Widget[];

    get currentPipeline(): PipelineSearchModel {
        switch (this.currentTab) {
            case 'action': return this.actionSearch;
            case 'status': return this.statusSearch;
        }
    }

    get totalCount(): number {
        return this.currentPipeline ? this.currentPipeline.loans.length : 0;
    }

    get totalAmount(): number {
        return this.currentPipeline ? _.sumBy(this.currentPipeline.loans, (each) => parseInt(each.loan_amt, 10)) : 0;

    }

    priceQuote: PriceQuote[];

    filterPriceQuote: PriceQuote[];

    /**
     * Creates an instance of DashBoardPage.
     * 
     * @param {InteractionService} interactionService
     * @param {LoanInformationService} loanInformationService
     * 
     * @memberOf DashBoardPage
     */
    constructor(private interactionService: InteractionService,
        private loanInformationService: LoanInformationService,
        private filterPipelineService: FilterPipelineService,
        private dashboardDataService: DashboardDataService,
        private pipeLineService: PipeLineService,
        private dashboardService: DashboardService,
        private productPricingService: ProductPricingService,
        private menuService: MenuService,
        private activeRoute: ActivatedRoute) {
        this.getScenarioPipelineRequest = {
            borrower_name: '',
            page_number: 0,
            page_size: 100
        };
    }

    /**
     * 
     * 
     * @param {*} $event
     * 
     * @memberOf DashBoardPage
     */
    onClick($event: any) {
        this.interactionService.hidePopover();
    }


    /**
     * Gets the pipeline by widget.
     * 
     * @private
     * @param {string} widgetId
     * 
     * @memberOf DashBoardPage
     */
    private getPipelineByWidget(widgetId: string): void {
        this.loanInformationService.getPipelineByWidget(widgetId)
            .subscribe((response) => {
                this.actionSearch = {
                    loans: response.data.loans,
                    searchTerm: '',
                    sortBy: '',
                    sortOrder: '',
                    widgets: response.data.widgets,
                    searchType: PipelineType.Action,
                    widgetId: widgetId
                };

                this.widgetDetails = this.actionSearch.widgets.map(e => {
                    return {
                        name: e.name,
                        count: e.count,
                        widget_id: e.widget_id,
                        searchType: PipelineType.Action

                    };
                });
            });
    }

    /**
     * Search Pipeline by field and value
     * 
     * @private
     * @param {string} field
     * @param {string} value
     * 
     * @memberOf DashBoardPage
     */
    private searchPipeline(): void {
        let currentTab = this.currentTab;
        if (currentTab === 'action') {
            this.loanInformationService
                .searchPipeline('', this.actionSearch.searchTerm, false)
                .subscribe((response) => {
                    this.actionSearch = {
                        searchTerm: this.actionSearch.searchTerm,
                        loans: response.data.loans,
                        sortBy: '',
                        sortOrder: '',
                        widgets: this.actionSearch.widgets,
                        searchType: PipelineType.Action,
                        widgetId: this.actionSearch.widgetId
                    };
                });
        } else if (currentTab === 'status') {
            this.loanInformationService
                .searchPipeline('', this.statusSearch.searchTerm, false)
                .subscribe((response) => {
                    this.statusSearch = {
                        searchTerm: this.statusSearch.searchTerm,
                        loans: response.data.loans,
                        sortBy: '',
                        sortOrder: '',
                        summary: this.statusSearch.summary,
                        searchType: PipelineType.Status,
                        widgetId: this.statusSearch.widgetId
                    };
                });
        }

    }


    /**
     * Set subscriptions for external events.
     * 
     * @private
     * 
     * @memberOf DashBoardPage
     */
    private setSubscriptions() {
        /**
         * Click event handler subscription of actions need your attention card
         */
        let self = this;
        this.filterPipelineService
            .attentionListener$
            .takeUntil(this.componentDestroyed).subscribe((widgetId: string) => {
                self.interactionService.hidePopover();
                self.getPipelineByWidget(widgetId);

            });
        this.dashboardService.getScenarioPipeline(this.getScenarioPipelineRequest)
            .takeUntil(this.componentDestroyed)
            .subscribe(items => {
                self.priceQuote = items.data;
                self.filterPriceQuote = items.data;
            });
        this.interactionService.filterSubject$
            .takeUntil(this.componentDestroyed)
            .subscribe((status) => {
                self.interactionService.hidePopover();
                self.loanInformationService
                    .searchPipeline('loan_status', status, true)
                    .subscribe((response) => {
                        self.statusSearch = {
                            searchTerm: '',
                            loans: response.data.loans,
                            sortBy: '',
                            sortOrder: '',
                            summary: this.statusSearch.summary,
                            searchType: PipelineType.Status,
                            widgetId: status
                        };

                        self.widgetDetails = self.statusSearch.summary.map(e => {
                            return {
                                name: e.name,
                                count: e.count,
                                widget_id: e.name,
                                searchType: PipelineType.Status

                            };
                        });
                    });

            });

        this.pipeLineService.getTotalNotificationCount()
            .takeUntil(this.componentDestroyed).subscribe((response) => {
                self.menuService.showTotalNotification(response.data.total_unread_count);
            });

        this.interactionService.resetDashboard$
            .subscribe(x => {
                this.dashboardDataService.reset();
            });
    }

    /**
     * 
     * 
     * 
     * @memberOf DashBoardPage
     */
    ngOnInit() {
        this.componentDestroyed = new Subject<void>();
        this.productPricingService.productPricingListData = null;
        let pipeline = this.activeRoute.snapshot.params['pipeline'];
        if (pipeline === 'scenario-pipeline') {
            this.currentTab = 'scenarios';
        } else {
            let previousActionState = this.dashboardDataService.getActionState();
            let previousStatusState = this.dashboardDataService.getStatusState();
            let previousSearchType = this.dashboardDataService.getPreviousState();
            if (previousSearchType) {
                this.actionSearch = previousActionState;
                this.statusSearch = previousStatusState;
                if (previousSearchType === 1) {
                    this.actionSearch = previousActionState;
                    this.switchTab('action');
                } else if (previousSearchType === 2) {
                    this.statusSearch = previousStatusState;
                    this.switchTab('status');
                }

            } else {
                this.switchTab('action');
            }
        }
        //  this.getPipeline();

        this.setSubscriptions();

    }
    private stopEventPropagation() {
        if (window.event) {
            window.event.stopPropagation();
        }
    }
    /*
    **
    */
    filterBySearchItem(type: string) {
        if (type === 'pipeline') {
            this.searchPipeline();
            this.interactionService.hidePopover();
            this.stopEventPropagation();
        } else if (type === 'scenarios') {
            if (this.searchTerm) {
                this.priceQuote = _.filter(this.filterPriceQuote, (eachItem) => {
                    return (eachItem.borrower_name.trim().toLowerCase().replace(/\s/g, '').
                        match(this.searchTerm.trim().toLowerCase().replace(/\s/g, '')));
                });
            } else {
                this.priceQuote = this.filterPriceQuote;
            }
        }
    }

    /*
    **Key listener for enter key down
    */
    keyDownFunction(event: any, type: string) {
        if (event.keyCode === 13 || event.which === 13) {
            this.filterBySearchItem(type);
        }
    }

    switchTab(value: string) {
        this.currentTab = value;
        this.showPipeline();
    }

    private showPipeline() {
        switch (this.currentTab) {
            case 'action': if (!this.actionSearch) {
                this.widgetId = fullPipeline;
                this.loanInformationService.getPipelineByWidget(fullPipeline)
                    .subscribe((response) => {
                        this.actionSearch = {
                            loans: response.data.loans,
                            searchTerm: '',
                            widgets: response.data.widgets,
                            sortBy: '',
                            sortOrder: '',
                            widgetId: fullPipeline,
                            searchType: PipelineType.Action
                        };

                        this.widgetDetails = response.data.widgets.map(e => {
                            return {
                                name: e.name,
                                count: e.count,
                                widget_id: e.widget_id,
                                searchType: PipelineType.Action
                            };
                        });
                    });
            } else {
                this.widgetId = this.actionSearch.widgetId;
                this.widgetDetails = this.actionSearch.widgets.map(e => {
                    return {
                        name: e.name,
                        count: e.count,
                        widget_id: e.widget_id,
                        searchType: PipelineType.Action
                    };
                });
            }
                this.dashboardDataService.setLastState(PipelineType.Action);
                break;
            case 'status': if (!this.statusSearch) {
                this.widgetId = origination_state;
                this.loanInformationService.searchPipeline('loan_status', origination_state, true)
                    .subscribe((response) => {
                        if (response.data && response.data.loans && response.data.loans.length > 0) {
                            this.statusSearch = {
                                loans: response.data.loans,
                                searchTerm: '',
                                summary: response.data.summary,
                                sortBy: '',
                                sortOrder: '',
                                status: '',
                                searchType: PipelineType.Status,
                                widgetId: origination_state
                            };
                            this.widgetDetails = this.statusSearch.summary.map(e => {
                                return {
                                    name: e.name,
                                    count: e.count,
                                    widget_id: e.name,
                                    searchType: PipelineType.Status
                                };
                            });
                        } else {

                            this.loanInformationService.getPipeline()
                                .subscribe((pipeline) => {
                                    this.widgetId = '';

                                    this.statusSearch = {
                                        loans: pipeline.data.loans,
                                        searchTerm: '',
                                        summary: pipeline.data.summary,
                                        sortBy: '',
                                        sortOrder: '',
                                        status: '',
                                        searchType: PipelineType.Status,
                                        widgetId: ''
                                    };

                                    this.widgetDetails = this.statusSearch.summary.map(e => {
                                        return {
                                            name: e.name,
                                            count: e.count,
                                            widget_id: e.name,
                                            searchType: PipelineType.Status
                                        };
                                    });
                                });
                        }

                    });

            } else {
                this.widgetId = this.statusSearch.widgetId;
                this.widgetDetails = this.statusSearch.summary.map(e => {
                    return {
                        name: e.name,
                        count: e.count,
                        widget_id: e.name,
                        searchType: PipelineType.Status
                    };
                });

            }
                this.dashboardDataService.setLastState(PipelineType.Status);

                break;
        }
    }
    /**
    * Close the pop up window on browser back button click
    * 
    * 
    * @memberOf DashBoardPage
    */
    ngOnDestroy(): void {
        if ($('.modal-backdrop.in').is(':visible')) {
            $('.modal-backdrop.in').hide();
        }
        this.componentDestroyed.next();
    }
}




