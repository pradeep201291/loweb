export interface Completion {
    c: number;
    v: string;
}

export interface ConditionList {
    additional_comments: string;
    cond_comments: string;
    cond_desc: string;
    cond_id: string;
    date_added: string;
    responsible_party: string;
    status: string;
    type_id: string;
}

export interface ConditionDetails {
    completion: Completion;
    data: ConditionList[];
}
