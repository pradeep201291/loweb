
export interface Completion {
    c: number;
    v: string;
}

export interface Widget {
    name: string;
    count: string;
    widget_id: string;
    searchType: PipelineType;

}

export interface Summary {
    name: string;
    count: string;
    searchType: PipelineType;
    widget_id: string;
}

export interface Borrower {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
}

export interface Loan {
    src: string;
    loan_num: string;
    status: string;
    status_code: string;
    prop_address: string;
    prop_city: string;
    prop_state: string;
    prop_zip: string;
    borrower: string;
    loan_amt: string;
    app_date: string;
    lock_date: string;
    lock_exp_date: string;
    est_closing_date: string;
    occupancy: string;
    loan_purpose: string;
    loan_term: string;
    uw_decision_exp_date: string;
    initial_disc_date: string;
    closing_disc_date: string;
    doc_sent_date: string;
    loan_program_name: string;
    rate: string;
    closing_disc_esign_date: string;
    initial_disc_esign_date: string;
    uw_decision_date: string;
    allow_lock: string;
    uw_decision: string;
    borrowers: Borrower[];
}

export interface PipelineInfo {
    widgets: Widget[];
    summary: Summary[];
    loans: Loan[];
}

export interface PipelineServiceResponse {
    completion: Completion;
    data: PipelineInfo;
}


export enum PipelineType {
    Action = 1,
    Status  = 2,
    Scenario = 3
}

export interface PipelineSearchModel {
    searchTerm: '';
    loans?: Loan[];
    widgets?: Widget[];
    summary?: Summary[];
    sortOrder: string;
    sortBy: string;
    widgetId?: string;
    status?: string;
    searchType: PipelineType;
}

