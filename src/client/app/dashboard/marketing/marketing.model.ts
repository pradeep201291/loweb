export interface Completion {
    c: number;
    v: string;
}

export interface MarketingResponse {
    message_text: string;
    message_url: string;
    message_link: string;
}

export interface GetMarketingResponse {
    completion: Completion;
    data: MarketingResponse[];
}


