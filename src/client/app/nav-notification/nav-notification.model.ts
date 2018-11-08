
export interface Completion {
    c: number;
    v: string;
}

export interface NotificationCountInfo {
    total_unread_count: number;
    snap_count: number;
    blast_count: number;
}
export interface NotificationCountResponse {
    completion: Completion;
    data: NotificationCountInfo;
}


export interface Notification {
    message_id: number;
    notification_type: number;
    status_type: number;
    message_text: string;
    link: string;
    message_date: Date;
    isSelected: boolean;
}

export interface NotificationForLoanResponse {
    completion: Completion;
    data: Notification[];
}
