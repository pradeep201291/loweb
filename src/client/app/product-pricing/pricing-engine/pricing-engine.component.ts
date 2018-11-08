/**
 * Product price it component
 */
import { Component, Input } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import { ProductPricingService } from '../product-pricing.service';
import { EnumtypeList, PriceItEnumListData, PriceItEnum, ProductPricingList } from '../product-pricing.typedef';

import { ProductPricingResource } from './../product-pricing.resource';
import { Router } from '@angular/router';

@Component({
    selector: 'sl-pricing-engine',
    templateUrl: './pricing-engine.component.html',
    providers: []
})
export class PricingEngineComponent {
    resource: { [key: string]: string } = ProductPricingResource.pricingEngine;
    /**
     * productpriceEnumTypes
     * 
     * @type {EnumtypeList}
     * @memberOf ProductPriceItPage
     */
    productpriceEnumTypes: EnumtypeList;

    /**
     * ausResult
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    ausResult: PriceItEnum[];

    /**
     * citizenship
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    citizenship: PriceItEnum[];

    /**
     * docType
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    docType: PriceItEnum[];

    /**
     * loanPurpose
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    loanPurpose: PriceItEnum[];

    /**
     * lockTerm
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    lockTerm: PriceItEnum[];

    /**
     * occupancy
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    occupancy: PriceItEnum[];

    /**
     * propertyType
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    propertyType: PriceItEnum[];

    /**
     * propState
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    propState: PriceItEnum[];

    /**
     * mortInsurance
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    mortInsurance: PriceItEnum[];

    /**
     * origComp
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    origComp: PriceItEnum[];

    /**
     * amortTerm
     * 
     * @type {PriceItEnum[]}
     * @memberOf ProductPriceItPage
     */
    amortTerm: PriceItEnum[];

    /**
     * priceItEnumListData
     * 
     * @private
     * @type {PriceItEnumListData[]}
     * @memberOf ProductPriceItPage
     */
    private priceItEnumListData: PriceItEnumListData[];

    /**
     * productPricingList
     * 
     * @private
     * @type {ProductPricingList}
     * @memberOf ProductPriceItPage
     */
    private productPricingList: ProductPricingList;

    /**
     * loanFicoErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    loanFicoErr: boolean;

    /**
     * propertyZipErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    propertyZipErr: boolean;

    /**
     * purchaseMarketValueErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    purchaseMarketValueErr: boolean;

    /**
     * ltvErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    ltvErr: boolean;

    dtiErr: boolean;

    /**
     * loanAmountErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    loanAmountErr: boolean;

    /**
     * rateErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    rateErr: boolean;

    /**
     * cltvErr
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    cltvErr: boolean;

    /**
     * loanFICOReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    loanFICOReq: boolean = false;

    /**
     * propertyZipReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    propertyZipReq: boolean = false;

    /**
     * purchaseMarketValueReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    purchaseMarketValueReq: boolean = false;

    /**
     * ltvReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    ltvReq: boolean = false;

    /**
     * loanAmountReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    loanAmountReq: boolean = false;

    /**
     * rateReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    rateReq: boolean = false;

    /**
     * impoundsReq
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    impoundsReq: boolean = false;

    /**
     * isAmortTypeClicked
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    isAmortTypeClicked: boolean = false;

    /**
     * isLoanTypeClicked
     * 
     * @type {boolean}
     * @memberOf PricingEngineComponent
     */
    isLoanTypeClicked: boolean = false;

    /**
     * selectedLoanType
     * 
     * @type {string}
     * @memberOf PricingEngineComponent
     */
    selectedAmortType: string = '';

    /**
     * selectedLoanType
     * 
     * @type {string}
     * @memberOf PricingEngineComponent
     */
    selectedLoanType: string = '';

    previousPage: boolean = false;

    /**
     * Get the input and intiate to filter the enum list
     * 
     * 
     * @memberOf ProductPriceItPage
     */
    @Input() set productPriceEnumList(value: PriceItEnumListData[]) {
        if (value.length > 0) {
            this.priceItEnumListData = value;
            this.getAllEnumValues();
        }
    }

    /**
     * 
     * Makes the DB call on the page initilisation to get drop down values
     * 
     * @memberOf PricingEngineComponent
     */
    ngOnInit() {

        if (this.productPricingService.productPricingListData && this.productPricingService.productPricingListData.priceQuoteId) {
            this.previousPage = true;
        }
        this.productPricingService.getPriceItEnums()
            .subscribe(items => {
                this.productPriceEnumList = items.data;
                this.productPricingService.priceItEnumListData = items.data;
            });
    }


    /**
     * Creates an instance of PricingEngineComponent.
     * 
     * @param {ProductPricingService} productPricingService
     * @param {Router} router
     * 
     * @memberOf PricingEngineComponent
     */
    constructor(private productPricingService: ProductPricingService, private router: Router) {
        if (!this.productPricingService.productPricingListData) {
            this.reset();
        } else {
            this.loanFicoErr = false;
            this.propertyZipErr = false;
            this.purchaseMarketValueErr = false;
            this.ltvErr = false;
            this.loanAmountErr = false;
            this.rateErr = false;
            this.productPricingList = this.productPricingService.productPricingListData;
            if (this.productPricingList.loan_type_conv && !this.productPricingList.loan_type_fha && !this.productPricingList.loan_type_va) {
                this.selectedLoanType = 'Conventional';
            } else if (!this.productPricingList.loan_type_conv && this.productPricingList.loan_type_fha &&
                !this.productPricingList.loan_type_va) {
                this.selectedLoanType = 'FHA';
            } else if (!this.productPricingList.loan_type_conv && !this.productPricingList.loan_type_fha &&
                this.productPricingList.loan_type_va) {
                this.selectedLoanType = 'VA';
            }

            if (this.productPricingList.amort_type_arm === false && this.productPricingList.amort_type_fixed === true) {
                this.selectedAmortType = 'Fixed';
            } else if (this.productPricingList.amort_type_arm === true && this.productPricingList.amort_type_fixed === false) {
                this.selectedAmortType = 'ARM';
            }
        }
    }

    /**
     * 
     * Filter the value as per the enum and form a simple array
     * 
     * @memberOf ProductPriceItPage
     */
    getAllEnumValues() {
        this.ausResult = this.getEnumArray('AUSResult');
        this.citizenship = this.getEnumArray('Citizenship');
        this.docType = this.getEnumArray('DocType');
        this.loanPurpose = this.getEnumArray('LoanPurpose');
        this.lockTerm = this.getEnumArray('LockTerm');
        this.occupancy = this.getEnumArray('Occupancy');
        this.propertyType = this.getEnumArray('PropertyType');
        this.propState = this.getEnumArray('PropState');
        this.mortInsurance = this.getEnumArray('MortInsurance');
        this.origComp = this.getEnumArray('OrigComp');
        this.amortTerm = this.getEnumArray('AmortTerm');
    }

    /**
     * 
     * 
     * @param {string} type
     * @returns {PriceItEnum[]}
     * 
     * @memberOf PricingEngineComponent
     */
    getEnumArray(type: string): PriceItEnum[] {
        let data = this.priceItEnumListData.filter(e => e.property_name === type)[0].enums.filter(e => e.t !== '');
        return data;
    }

    /**
     * 
     * Do the Loan FICO validation on tap out of the rage from 300 to 900
     * 
     * @memberOf PricingEngineComponent
     */
    onLoanFICO() {
        this.loanFicoErr = false;
        this.loanFICOReq = false;
        if (this.productPricingList.loanFICO && this.productPricingList.loanFICO < 300 || this.productPricingList.loanFICO > 900) {
            this.loanFicoErr = true;
        }
    }

    /**
     * 
     *  Do the property zip validation on tap out
     * 
     * @memberOf PricingEngineComponent
     */
    onPropertyZip() {
        this.propertyZipErr = false;
        this.propertyZipReq = false;
        if (this.productPricingList.propertyZIP && this.productPricingList.propertyZIP.toString().length < 5) {
            this.propertyZipErr = true;
        } else if (!this.propertyZipErr && this.productPricingList.propertyZIP) {
            this.productPricingService.validateZIPCode(this.productPricingList.propertyZIP.toString())
                .subscribe(items => {
                    if (!items.data[0]) {
                        this.propertyZipErr = true;
                    } else {
                        this.productPricingList.country = items.data[0].county;
                        this.productPricingList.propertyState = items.data[0].state;
                    }
                });
        }
    }

    /**
     * Do the purchase market value validation of the rage from 0 to 100000000
     * 
     * 
     * @memberOf PricingEngineComponent
     */
    onPurchaseMarketValue() {
        this.purchaseMarketValueErr = false;
        this.purchaseMarketValueReq = false;
        if (this.productPricingList.purchaseMarketValue < 0 || this.productPricingList.purchaseMarketValue > 100000000) {
            this.purchaseMarketValueErr = true;
        }
        if ((!this.productPricingService.isPurchaseMarketValueCalculated) && this.purchaseMarketValueErr === false) {
            if (this.productPricingList.purchaseMarketValue !== null && this.productPricingList.ltv !== null &&
                this.purchaseMarketValueErr === false && this.ltvErr === false && this.productPricingList.ltv.toString() !== '') {
                this.productPricingList.loanAmount =
                    Math.round((this.productPricingList.purchaseMarketValue * this.productPricingList.ltv) / 100);
                this.productPricingService.isPurchaseMarketValueCalculated = true;
            }
        } else if ((this.productPricingService.isPurchaseMarketValueCalculated) && this.purchaseMarketValueErr === false) {
            if (this.productPricingList.purchaseMarketValue !== null && this.productPricingList.ltv !== null &&
                this.productPricingList.loanAmount !== null && this.productPricingList.loanAmount.toString() !== '' &&
                this.purchaseMarketValueErr === false && this.ltvErr === false &&
                this.productPricingList.purchaseMarketValue.toString() !== '') {
                this.productPricingList.ltv =
                    Math.round((this.productPricingList.loanAmount * 100) / this.productPricingList.purchaseMarketValue * 100) / 100;
                this.productPricingService.isPurchaseMarketValueCalculated = true;
                if (this.productPricingList.ltv > 0 && (this.productPricingList.ltv.toString() !== 'Infinity')) {
                    if (this.productPricingList.ltv.toString() === 'NaN') {
                        this.productPricingList.ltv = 0;
                    }
                } else {
                    this.productPricingList.ltv = 0;
                }
            }
        }
        if (this.productPricingList.purchaseMarketValue === null || this.productPricingList.purchaseMarketValue.toString() === '') {
            this.productPricingList.loanAmount = null;
            this.productPricingService.isPurchaseMarketValueCalculated = false;
        }

    }

    /**
     * 
     * Do the ltv amount validation of the rage from 0 to 150
     * 
     * @memberOf PricingEngineComponent
     */
    onLtv() {
        this.ltvErr = false;
        this.ltvReq = false;
        if (this.productPricingList.ltv < 0 || this.productPricingList.ltv > 150) {
            this.ltvErr = true;
        } else {
            if (this.productPricingList.purchaseMarketValue !== null && this.productPricingList.ltv !== null &&
                this.purchaseMarketValueErr === false && this.ltvErr === false && this.productPricingList.ltv.toString() !== ''
                && this.productPricingList.purchaseMarketValue.toString() !== '') {
                this.productPricingList.loanAmount =
                    Math.round((this.productPricingList.purchaseMarketValue * this.productPricingList.ltv) / 100);
            }
        }
        if (this.productPricingList.ltv !== null && this.productPricingList.ltv.toString() !== '') {
            if ((this.productPricingList.ltv.toString().split('.').length - 1) > 1) {
                this.ltvErr = true;
            }
        }
    }

    /**
     * 
     * Do the loan amount validation of the rage from 0 to 100000000
     * 
     * @memberOf PricingEngineComponent
     */
    onLoanAmount() {
        this.loanAmountErr = false;
        this.loanAmountReq = false;
        if (this.productPricingList.loanAmount < 0 || this.productPricingList.loanAmount > 100000000) {
            this.loanAmountErr = true;
        } else if (this.productPricingList.loanAmount !== null &&
            this.ltvErr === false && this.loanAmountErr === false && this.productPricingList.loanAmount.toString() !== '' &&
            this.productPricingList.purchaseMarketValue !== null && this.productPricingList.purchaseMarketValue.toString() !== '') {
            this.productPricingList.ltv =
                Math.round((this.productPricingList.loanAmount * 100) / this.productPricingList.purchaseMarketValue * 100) / 100;
            if (this.productPricingList.ltv > 0) {
                if (this.productPricingList.ltv.toString() === 'NaN') {
                    this.productPricingList.ltv = 0;
                }
            } else {
                this.productPricingList.ltv = 0;
            }
        }
        if ((this.productPricingList.loanAmount === null || this.productPricingList.loanAmount.toString() === '') &&
            this.productPricingList.purchaseMarketValue !== null && this.productPricingList.purchaseMarketValue.toString() !== '' &&
            this.productPricingList.ltv.toString() !== '' && this.productPricingList.ltv !== null) {
            this.productPricingList.loanAmount =
                Math.round((this.productPricingList.purchaseMarketValue * this.productPricingList.ltv) / 100);
        }

    }

    /**
     * Do the rate validation of the rage from 0 to 1000
     * 
     * 
     * @memberOf PricingEngineComponent
     */
    onRate() {
        this.rateErr = false;
        this.rateReq = false;
        if (this.productPricingList.rate < 0 || this.productPricingList.rate > 1000) {
            this.rateErr = true;
        }
    }

    /**
     * removes the error message when the user selects the impound
     * 
     * @param {string} value
     * 
     * @memberOf PricingEngineComponent
     */
    onImpounds() {
        this.impoundsReq = false;
    }

    /**
     * 
     * 
     * 
     * @memberOf PricingEngineComponent
     */
    onCLTV() {
        this.cltvErr = false;
        if (this.productPricingList.cltv < 0 || this.productPricingList.cltv > 135) {
            this.cltvErr = true;
        }
        if (this.productPricingList.cltv !== null) {
            if ((this.productPricingList.cltv.toString().split('.').length - 1) > 1) {
                this.cltvErr = true;
            }
        }
    }

    /**
     * 
     * 
     * 
     * @memberOf PricingEngineComponent
     */
    onDTI() {
        this.dtiErr = false;
        if (this.productPricingList.dti < 0 || this.productPricingList.dti > 100) {
            this.dtiErr = true;
        }
        if (this.productPricingList.dti !== null) {
            if ((this.productPricingList.dti.toString().split('.').length - 1) > 1) {
                this.dtiErr = true;
            }
        }
    }

    /**
     * Act as common function which is called form constructor and Reset button
     * 
     * 
     * @memberOf PricingEngineComponent
     */
    reset() {
        this.loanFicoErr = false;
        this.propertyZipErr = false;
        this.purchaseMarketValueErr = false;
        this.ltvErr = false;
        this.loanAmountErr = false;
        this.rateErr = false;
        this.loanFICOReq = false;
        this.propertyZipReq = false;
        this.purchaseMarketValueReq = false;
        this.ltvReq = false;
        this.loanAmountReq = false;
        this.impoundsReq = false;
        this.productPricingList = {
            loanFICO: null,
            propertyZIP: null,
            purchaseMarketValue: null,
            ltv: 80,
            loanAmount: null,
            loanPurpose: '1',
            occupacy: '1',
            propertyType: '1',
            impounds: '2',
            lockTerm: '30',
            rate: null,
            bestEx: '0',
            amort_type_arm: true,
            amort_type_fixed: true,
            amortTerm: 'Please Select',
            loan_type_conv: true,
            loan_type_fha: true,
            loan_type_va: true,
            docType: '1',
            propertyState: 'CA',
            country: '',
            citizenship: '1',
            existigNewTD: null,
            stearnsFinancedRefi: '0',
            totatEstQMFees: null,
            cltv: null,
            ausResult: 'Please Select',
            mortgageInsurance: '3',
            dti: 43,
            firstTimeHouseBuyer: '2',
            priceQuoteId: (this.previousPage === true ? this.productPricingList.priceQuoteId : 0),
            firstName: (this.previousPage === true ? this.productPricingList.firstName : ''),
            lastName: (this.previousPage === true ? this.productPricingList.lastName : '')
        };
    }

    /**
     * validate the null field and stores the value and redirect to producut page
     * 
     * 
     * @memberOf PricingEngineComponent
     */
    onSubmit() {
        this.productPricingList.loanFICO && this.productPricingList.loanFICO !== null ?
            this.loanFICOReq = false : this.loanFICOReq = true;
        this.productPricingList.propertyZIP && this.productPricingList.propertyZIP !== null ?
            this.propertyZipReq = false : this.propertyZipReq = true;
        this.productPricingList.purchaseMarketValue && this.productPricingList.purchaseMarketValue !== null ?
            this.purchaseMarketValueReq = false : this.purchaseMarketValueReq = true;
        this.productPricingList.ltv && this.productPricingList.ltv !== null ?
            this.ltvReq = false : this.ltvReq = true;
        this.productPricingList.loanAmount && this.productPricingList.loanAmount !== null ?
            this.loanAmountReq = false : this.loanAmountReq = true;
        // this.productPricingList.cltv && this.productPricingList.cltv !== null ?
        //     this.cltvErr = false : this.rateReq = true;
        this.productPricingList.impounds && this.productPricingList.impounds !== '2' ?
            this.impoundsReq = false : this.impoundsReq = true;
        if (this.loanFICOReq === false && this.propertyZipReq === false && this.purchaseMarketValueReq === false
            && this.ltvReq === false && this.loanAmountReq === false && this.rateReq === false &&
            this.impoundsReq === false) {
            if (this.loanFicoErr === false && this.propertyZipErr === false && this.purchaseMarketValueErr === false &&
                this.ltvErr === false && this.loanAmountErr === false && this.rateErr === false) {
                this.productPricingService.productPricingListData = this.productPricingList;
                this.router.navigate(['/pricing/products']);
            }
        }
    }

    /**
     * 
     * Amort Type checkbox click and unclick
     * 
     * @memberOf PricingEngineComponent
     */
    onAmortTypeClick() {
        this.isAmortTypeClicked = !this.isAmortTypeClicked;
    }

    /**
     * 
     * Loan type checkbox click and unclick
     * 
     * @memberOf PricingEngineComponent
     */
    onLoanTypeClick() {
        this.isLoanTypeClicked = !this.isLoanTypeClicked;
    }

    /**
     * select the multicheck and assign the value to last selected item
     * 
     * @param {string} value
     * 
     * @memberOf PricingEngineComponent
     */
    selectAmortType(value: string) {
        if (this.productPricingList.amort_type_arm === false && this.productPricingList.amort_type_fixed === true) {
            this.selectedAmortType = 'Fixed';
        } else if (this.productPricingList.amort_type_arm === true && this.productPricingList.amort_type_fixed === false) {
            this.selectedAmortType = 'ARM';
        }
    }

    /**
     * select the multicheck and assign the value to last selected item
     * 
     * @param {string} value
     * 
     * @memberOf PricingEngineComponent
     */
    selectLoanType(value: string) {
        if (this.productPricingList.loan_type_conv && !this.productPricingList.loan_type_fha && !this.productPricingList.loan_type_va) {
            this.selectedLoanType = 'Conventional';
        } else if (!this.productPricingList.loan_type_conv && this.productPricingList.loan_type_fha &&
            !this.productPricingList.loan_type_va) {
            this.selectedLoanType = 'FHA';
        } else if (!this.productPricingList.loan_type_conv && !this.productPricingList.loan_type_fha &&
            this.productPricingList.loan_type_va) {
            this.selectedLoanType = 'VA';
        }
    }
}

