export interface LeaderBoardData {
    name: string;
    type: string;
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
    data: LeaderBoardData[];
}

export interface LeaderBoardFilteredData {
    name: string;
    volume: number;
    unit: string;
    rank: string;
}

