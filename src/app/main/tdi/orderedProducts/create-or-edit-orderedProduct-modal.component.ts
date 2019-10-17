import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { OrderedProductsServiceProxy, CreateOrEditOrderedProductDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { OrderedProductQuotationItemLookupTableModalComponent } from './orderedProduct-quotationItem-lookup-table-modal.component';


@Component({
    selector: 'createOrEditOrderedProductModal',
    templateUrl: './create-or-edit-orderedProduct-modal.component.html'
})
export class CreateOrEditOrderedProductModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('orderedProductQuotationItemLookupTableModal', { static: true }) orderedProductQuotationItemLookupTableModal: OrderedProductQuotationItemLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    orderedProduct: CreateOrEditOrderedProductDto = new CreateOrEditOrderedProductDto();

    quotationItemDescription = '';


    constructor(
        injector: Injector,
        private _orderedProductsServiceProxy: OrderedProductsServiceProxy
    ) {
        super(injector);
    }

    show(orderedProductId?: number): void {

        if (!orderedProductId) {
            this.orderedProduct = new CreateOrEditOrderedProductDto();
            this.orderedProduct.id = orderedProductId;
            this.quotationItemDescription = '';

            this.active = true;
            this.modal.show();
        } else {
            this._orderedProductsServiceProxy.getOrderedProductForEdit(orderedProductId).subscribe(result => {
                this.orderedProduct = result.orderedProduct;

                this.quotationItemDescription = result.quotationItemDescription;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._orderedProductsServiceProxy.createOrEdit(this.orderedProduct)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectQuotationItemModal() {
        this.orderedProductQuotationItemLookupTableModal.id = this.orderedProduct.quotationItemId;
        this.orderedProductQuotationItemLookupTableModal.displayName = this.quotationItemDescription;
        this.orderedProductQuotationItemLookupTableModal.show();
    }


        setQuotationItemIdNull() {
        this.orderedProduct.quotationItemId = null;
        this.quotationItemDescription = '';
    }


        getNewQuotationItemId() {
        this.orderedProduct.quotationItemId = this.orderedProductQuotationItemLookupTableModal.id;
        this.quotationItemDescription = this.orderedProductQuotationItemLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
