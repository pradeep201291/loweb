
export interface Completion {
    c: number;
    v: string;
}

export interface Count {
    total_unread_count: number;
}

export interface UnreadNotificationCount {
    completion: Completion;
    data: Count;
}

