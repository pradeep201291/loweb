
export enum UploadStatus {
    InProgress = 0,
    Successful = 1,
    Failure = 2
}

interface Completion {
    c: number;
    v: string;
}

export interface FileInfo {
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    showConditions: boolean;
    uploadStatus: UploadStatus;
    loanNumber: string;
    /**
     * Base64 encoded string
     * 
     * @type {*}
     * @memberOf FileInfo
     */
    content: any;
    is_selected: boolean;
}

export interface UploadDocumentResponse {
    document_name: string;
    document_id: string;
    upload_status: string;
}

interface Data {
    document_name: string;
    document_id: string;
    upload_status: string;
}
