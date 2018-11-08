import { Loan, Widget } from './loan-info.model';

export class Pipeline {
    sortBy: string;
    sortOrder: string;
    loans?: Loan[];
    widgets?: Widget[];
    widgetId?: string;
    searchTerm: string;
}
