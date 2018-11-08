export const ApiConfig = {

    authV1: {
        root: 'api/auth',
        methods: {
            login: 'login',
            logout: 'logout'
        }
    },
    methods: {
        root: 'Methods/api/method',
        methods: {
            getLoanDetails: 'get_loan_details',
            announcements: 'announcements/retail',
            getSnapshot: 'get_snapshot',
            getSummaryAll: 'get_summary_all',
            getSummary: 'get_summary',
            getDashboard: 'get_dashboard',
            getConditions: 'get_conditions'
        }
    },
    loan: {
        root: 'Methods/api/loan',
        methods: {
            getLoanSummary: 'get_loan_summary',
            searchPipeline: 'search_pipeline',
            getPipeline: 'get_pipeline',
            getMyLoans: 'get_my_loans'
        }
    },
    lookup: {
        root: 'lookups/api/lookup',
        methods: {
            enum: 'enum',
            enumType: 'enum_type',
        }
    },
    notification: {
        root: 'Notifications/api/notification',
        methods: {
            getUnreadCount: 'get_unread_count',
            get: 'get',
            markRead: 'mark_read',
            markUnread: 'mark_unread',
            delete: 'delete',
            getBroadcastMsgs: 'get_broadcast_msgs',

        }
    },
    message: {
        root: 'Messages/api/message',
        methods: {
            getUnreadCount: 'get_unread_count',
            markRead: 'mark_read',
            get: 'get',
            putMessage: 'put_message',
        }
    },
    pricing: {
        root: 'Methods/api/pricing',
        methods: {
            getPriceIt: 'get_price_it',
            getPriceItAdjustments: 'get_price_it_adjustments',
            saveScenario: 'save_scenario',
            getPriceQuotes: 'get_price_quotes',
            getPriceItRatesheet: 'get_price_it_ratesheet',
            getPriceQuoteDetails: 'get_price_quote_details',
            getPricingforLoan: 'get_pricing_for_loan',
            lockLoan: 'lock_loan',
            getAdjustments: 'get_adjustments',
            getRatesheet: 'get_ratesheet'

        }
    },
    marketing: {
        root: 'Methods/api/marketing',
        methods: {
            ads: 'ads/retail',
            leaderboard: 'leaderboard'
        }
    },
    document: {
        root: 'documents/api/document',
        methods: {
            getById: 'get_by_id',
            upload: 'upload'
        }
    }
};
