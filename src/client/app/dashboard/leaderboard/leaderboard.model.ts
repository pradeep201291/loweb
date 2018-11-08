export interface FunderDO {
    name: string;
    branch: string;
    pic_url: string;
    label: string;
    text: string;
    rank: string;
}

export interface Completion {
    c: number;
    v: string;
}

export interface GetLeaderBoardResponse {
    completion: Completion;
    data: FunderDO[];
}
