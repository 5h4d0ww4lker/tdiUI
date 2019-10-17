import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { QuotationUnitPricesServiceProxy, CreateOrEditQuotationUnitPriceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { QuotationUnitPriceQuotationLookupTableModalComponent } from './quotationUnitPrice-quotation-lookup-table-modal.component';


@Component({
    selector: 'createOrEditQuotationUnitPriceModal',
    templateUrl: './create-or-edit-quotationUnitPrice-modal.component.html'
})
export class CreateOrEditQuotationUnitPriceModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('quotationUnitPriceQuotationLookupTableModal', { static: true }) quotationUnitPriceQuotationLookupTableModal: QuotationUnitPriceQuotationLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    quotationUnitPrice: CreateOrEditQuotationUnitPriceDto = new CreateOrEditQuotationUnitPriceDto();

    quotationQuotationNumber = '';


    constructor(
        injector: Injector,
        private _quotationUnitPricesServiceProxy: QuotationUnitPricesServiceProxy
    ) {
        super(injector);
    }

    show(quotationUnitPriceId?: number): void {

        if (!quotationUnitPriceId) {
            this.quotationUnitPrice = new CreateOrEditQuotationUnitPriceDto();
            this.quotationUnitPrice.id = quotationUnitPriceId;
            this.quotationQuotationNumber = '';

            this.active = true;
            this.modal.show();
        } else {
            this._quotationUnitPricesServiceProxy.getQuotationUnitPriceForEdit(quotationUnitPriceId).subscribe(result => {
                this.quotationUnitPrice = result.quotationUnitPrice;

                this.quotationQuotationNumber = result.quotationQuotationNumber;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._quotationUnitPricesServiceProxy.createOrEdit(this.quotationUnitPrice)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectQuotationModal() {
        this.quotationUnitPriceQuotationLookupTableModal.id = this.quotationUnitPrice.quotationId;
        this.quotationUnitPriceQuotationLookupTableModal.displayName = this.quotationQuotationNumber;
        this.quotationUnitPriceQuotationLookupTableModal.show();
    }


        setQuotationIdNull() {
        this.quotationUnitPrice.quotationId = null;
        this.quotationQuotationNumber = '';
    }


        getNewQuotationId() {
        this.quotationUnitPrice.quotationId = this.quotationUnitPriceQuotationLookupTableModal.id;
        this.quotationQuotationNumber = this.quotationUnitPriceQuotationLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
