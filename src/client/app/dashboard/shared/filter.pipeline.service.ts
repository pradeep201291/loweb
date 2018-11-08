import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * 
 * 
 * @export
 * @class FilterPipelineService
 */
@Injectable()
export class FilterPipelineService {
    private attentionListener = new Subject<string>();
    attentionListener$ = this.attentionListener.asObservable();

    /**
     * 
     * publishes the click event
     * @param {string} action
     * 
     * @memberOf FilterPipelineService
     */
    publish(action: string) {
        this.attentionListener.next(action);
    }
}
