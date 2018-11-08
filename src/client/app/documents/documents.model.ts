
/**
 * 
 * 
 * @export
 * @interface Completion
 */
export interface Completion {
    c: number;
    v: string;
}

/**
 * 
 * 
 * @export
 * @interface Datum
 */
export interface Documents {
    document_id: string;
    document_name: string;
    document_type: string;
    category: string;
    last_update_datetime: Date;
    last_update_username: string;
    document_size: number;
}

/**
 * 
 * 
 * @export
 * @interface RootObject
 */
export interface DocumentList {
    completion: Completion;
    data: Documents[];
}



export interface DocumentData {
    document_id: string;
    document_name: string;
    document_type: string;
    category: string;
    last_update_datetime: Date;
    last_update_username: string;
    document_size: number;
    image: string;
}

export interface ViewDocument {
    completion: Completion;
    data: DocumentData;
}

/**
 * 
 * 
 * @export
 * @interface Loan
 */
export interface Loan {
    loan_num: string;
    src: string;
}

/**
 * 
 * 
 * @export
 * @interface UploadDocumentModel
 */
export interface UploadDocumentModel {
    file_name: string;
    loan_num: string;
    need_ids: number[];
    type: string;
    document_name: string;
    image: string;
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

