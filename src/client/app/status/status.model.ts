export interface Completion {
    c: number;
    v: string;
}

export interface LoanParam {
    label: string;
    text: string;
}

export interface CdProgress {
    responsible: string;
    item: string;
    status: string;
}

export interface KeyDate {
    date: Date;
    text: string;
}

export interface MajorEvent {
    date: Date;
    label: string;
}

export interface Snapshot {
    loan_params: LoanParam[];
    cd_progress: CdProgress[];
    key_dates: KeyDate[];
    major_events: MajorEvent[];
}

export interface Data {
    loan_num: string;
    snapshot: Snapshot;
}

export interface SnapShotResponse {
    completion: Completion;
    data: Data;
}


