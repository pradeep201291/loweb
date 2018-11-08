import { Component, Input } from '@angular/core';

// import * as _ from 'lodash';
import { Widget, PipelineType } from './../shared/loan-Info.model';

import { FilterPipelineService } from './../shared/filter.pipeline.service';
import { GlobalConstants } from './../../core/global-constant/global-constant';
import { InteractionService } from './../../../sl-ui-framework/infrastructure/interaction.service';

declare var $: any;

/**
 * 
 */
@Component({
    selector: 'sl-progressTrack',
    templateUrl: './progress-track.component.html'
})

export class ProgressTrackComponent {
    @Input() widgets: Widget[];
    @Input() widget_id: string;
    isWidgetShown: boolean = false;
    widgetText: string = 'View More';

    /**
     * Creates an instance of ProgressTrackComponent.
     * 
     * @param {FilterPipelineService} filterPipelineService
     * @param {InteractionService} interactionService
     * 
     * @memberOf ProgressTrackComponent
     */
    constructor(private filterPipelineService: FilterPipelineService,
        private interactionService: InteractionService) {

    }

    get selectWidgets(): Widget[] {
        if (!this.isWidgetShown) {
            this.widgetText = 'View More';
            return this.widgets.filter((item, index) => index < GlobalConstants.pipelineWidgetCount);
        } else {
            this.widgetText = 'View Less';
            return this.widgets;
        }
    }


    ngOnInit() {
        /**
         * get widget item of origination or closing item widget
         */
        // let widgetItem = this.widgets.
        //     find(x => x.widget_id === this.widget_id);
        // /**if filtered item is not null */
        // if (widgetItem && widgetItem !== null) {
        //     this.setStyle(widgetItem);
        //     /**publish the resultant widget item  */
        //     // this.clickHandler(widgetItem);
        // }
    }


    private setStyle(widget: Widget) {

        this.widget_id = widget.widget_id;
    }

    /**
     * 
     * 
     * @param {string} status
     * 
     * @memberOf ProgressTrackComponent
     */
    clickHandler(widget: Widget) {
        if (widget) {
            if (this.widget_id !== widget.widget_id) {
                this.setStyle(widget);
                if (widget.searchType === PipelineType.Action) {
                    /**The selected widget id updates the style change */
                    this.filterPipelineService.publish(widget.widget_id);
                } else {
                    /**The selected widget name updates the style change */
                    /** this is loan status filter */
                    this.interactionService.filter(widget.name);
                }
            }
        }
    }

    scrollToTable() {
        $('html,body').animate({
            scrollTop: $('#tab-table').offset().top - 80
        },
            'slow');
    }

    toggleWidget() {
        this.isWidgetShown = !this.isWidgetShown;
        setTimeout(function () {
            let elmnt = document.getElementById('wrapperItems'),
                dashboardTableHeight = ($('#tab-table').height()) - 90,
                marketingHeight = 200,
                progressHeight = dashboardTableHeight - marketingHeight - 35,
                windowWidth = $(window).width(),
                windowHeight = $(window).height();
                $('#wrapperItems').css('max-height', progressHeight);
                if (windowHeight < 940 && windowWidth > 1199) {
                    progressHeight = windowHeight - marketingHeight - 60 - 135 ;
                    $('#wrapperItems').css('max-height', progressHeight);
                }

            elmnt.scrollTop = 400;
        },
          0);
    }
}
