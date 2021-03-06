import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from './shared/message-page.service';

import { Data, SenderRequest, Contact, Message } from './shared/message-page.model';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { Loan } from './shared/loan.model';
import { DashboardDataService } from './../shared/dashboard.data.service';
import { MessageWindowComponent } from './message-window/message-window.component';

/**
 * 
 * 
 * @export
 * @class MessagePage
 * @implements {OnInit}
 */
@Component({
    selector: 'sl-message',
    templateUrl: 'message.page.html'
})

export class MessagePage implements OnInit {
    @ViewChild(MessageWindowComponent) msgWindow: MessageWindowComponent;

    /**
     * 
     * 
     * @type {Data}
     * @memberOf MessagePage
     */
    messageData: Data;

    /**
     * 
     * 
     * @type {Contact}
     * @memberOf MessagePage
     */
    selectedContact: Contact;

    /**
     * Conversation
     * 
     * @type {Message[]}
     * @memberOf MessagePage
     */
    conversation: Message[];

    /**
     * Selected Loan
     * 
     * @type {Loan}
     * @memberOf MessagePage
     */
    selectedLoan: Loan;

    contacts: Contact[];

    contactItem: Contact;

    /**
     * Creates an instance of ConverseMessagePage.
     * 
     * @param {MessageService} msgService
     * @param {MessageDataService} msgDataService
     * 
     * @memberOf ConverseMessagePage
     */
    constructor(private msgService: MessageService,
        private dashboardDataService: DashboardDataService,
        private route: Router) {

    }


    /**
     * 
     * 
     * 
     * @memberOf ConverseMessagePage
     */
    ngOnInit() {
        /**
         * @todo request object is framed instead of loan selector for release
         */
        this.selectedLoan = this.dashboardDataService.SelectedLoan;
        this.getMessage(null, false);

    }


    /**
     * 
     * 
     * @private
     * @param {Contact} selectedContact
     * @param {boolean} callBack
     * 
     * @memberOf MessagePage
     */
    private getMessage(selectedContact: Contact, callBack: boolean) {
        if (this.selectedLoan) {
            let request = {
                src: this.selectedLoan.src,
                loan_num: this.selectedLoan.loan_num
            };
            this.msgService.getMessageResponse(request).subscribe((response) => {
                this.messageData = response.data;
                this.messageData.contacts.forEach(eachContact => {
                    eachContact.unread_count = this.messageData.messages
                        .filter(eachMessage => eachContact.name === eachMessage.from_name && eachMessage.status === 1).length;
                });
                if (!this.contacts) {
                    this.contacts = this.messageData.contacts;
                }
                if (selectedContact) {
                    this.onContactSelected(selectedContact, callBack);
                } else {
                    this.onContactSelected(this.setContact(), callBack);
                }

            });
        } else {
            this.route.navigate(['/dashboard']);
        }

    }

    /**
     * 
     * Send message to selectd Loan Officer of multiple Loan Officer
     * 
     * @memberOf ConverseMessagePage
     */
    sendMessage(senderRequest: SenderRequest) {
        this.msgService.sendMessage(senderRequest).subscribe((response) => {
            if (response.data.status === 'success') {
                //  this.getMessage();
            }
        }, error => {
            let errorMsg = error;
            console.log(errorMsg);
        });
    }


    /**
     * 
     * 
     * @param {Contact} selectedContact
     * 
     * @memberOf MessagePage
     */
    onContactSelected(selectedContact: Contact, isCallBack: boolean) {
        if (!isCallBack) {
            this.contacts.forEach(e => {
                e.is_selected = false;
            });
        }
        if (selectedContact) {
            this.contacts.find(e => e.name === selectedContact.name).is_selected = true;
            this.selectedContact = selectedContact;
            this.conversation = this.messageData.messages
                .filter(e => e.from_name === selectedContact.name || e.to_name === selectedContact.name);
            /**
            * @todo refactor
            */
            this.conversation.forEach(e => {
                this.contacts.forEach(c => {
                    if (c.name === e.from_name) {
                        e.pic_url = c.pic_url;
                    }
                });
            });
        } else {
            /** User selected all conversations */
            this.conversation = this.messageData.messages;
            this.selectedContact = null;
            /**
             * @todo refactor
             */
            this.conversation.forEach(e => {
                this.contacts.forEach(c => {
                    if (c.name === e.from_name) {
                        e.pic_url = c.pic_url;
                    }
                });
            });
        }
        setTimeout(function () {
            if (this.msgWindow && this.msgWindow !== null) {
                this.msgWindow.updateMessageView();
            }
        }.bind(this), 0);
    }

    /**
     * On Message Sent
     * 
     * @param {Contact} selectedContact
     * 
     * @memberOf MessagePage
     */
    onMessageSent(selectedContact: Contact) {
        this.getMessage(selectedContact, true);
    }

    setContact(): Contact {
        let contactArray: Contact[];
        this.contactItem = null;
        let loanOfficerName = this.msgService.selectedContactName;
        if (loanOfficerName && loanOfficerName !== '') {
            if (this.messageData && this.messageData.contacts) {
                contactArray = this.messageData.contacts.filter((value, index, array) => {
                    if (value.name) {
                        return value.name.toLowerCase().trim() === loanOfficerName.toLowerCase().trim();
                    }
                });
            }
        }
        contactArray && contactArray.length > 0 ?
            this.contactItem = contactArray.shift() : this.contactItem = null;
        this.msgService.selectedContactName = '';
        return this.contactItem;
    }

}
