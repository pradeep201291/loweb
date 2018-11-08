import { Injectable } from '@angular/core';
import { PipelineSearchModel, PipelineType } from './loan-info.model';

/**
 * 
 * 
 * @export
 * @class DashboardDataService
 */
@Injectable()
export class DashboardDataService {
    private _actionstate: PipelineSearchModel;
    private _statusstate: PipelineSearchModel;
    private _pipelineType: PipelineType;

    setActionState(value: PipelineSearchModel) {
        this._actionstate = value;
    }

    setStatusState(value: PipelineSearchModel) {
        this._statusstate = value;
    }

    setLastState(value: PipelineType) {
        this._pipelineType = value;
    }

    getActionState(): PipelineSearchModel {
        return this._actionstate;
    }

    getStatusState() {
        return this._statusstate;
    }

    getPreviousState(): PipelineType {
        return this._pipelineType;
    }

    reset() {
        this._actionstate = null;
        this._statusstate = null;
        this._pipelineType = null;
    }
}
