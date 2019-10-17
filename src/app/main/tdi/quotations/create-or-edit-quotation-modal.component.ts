import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { QuotationsServiceProxy, CreateOrEditQuotationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { QuotationClientLookupTableModalComponent } from './quotation-client-lookup-table-modal.component';


@Component({
    selector: 'createOrEditQuotationModal',
    templateUrl: './create-or-edit-quotation-modal.component.html'
})
export class CreateOrEditQuotationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('quotationClientLookupTableModal', { static: true }) quotationClientLookupTableModal: QuotationClientLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    quotation: CreateOrEditQuotationDto = new CreateOrEditQuotationDto();

    clientClientName = '';


    constructor(
        injector: Injector,
        private _quotationsServiceProxy: QuotationsServiceProxy
    ) {
        super(injector);
    }

    show(quotationId?: number): void {

        if (!quotationId) {
            this.quotation = new CreateOrEditQuotationDto();
            this.quotation.id = quotationId;
            this.clientClientName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._quotationsServiceProxy.getQuotationForEdit(quotationId).subscribe(result => {
                this.quotation = result.quotation;

                this.clientClientName = result.clientClientName;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._quotationsServiceProxy.createOrEdit(this.quotation)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectClientModal() {
        this.quotationClientLookupTableModal.id = this.quotation.clientId;
        this.quotationClientLookupTableModal.displayName = this.clientClientName;
        this.quotationClientLookupTableModal.show();
    }


        setClientIdNull() {
        this.quotation.clientId = null;
        this.clientClientName = '';
    }


        getNewClientId() {
        this.quotation.clientId = this.quotationClientLookupTableModal.id;
        this.clientClientName = this.quotationClientLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
