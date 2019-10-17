import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ClientUnitPricesServiceProxy, CreateOrEditClientUnitPriceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { ClientUnitPriceClientLookupTableModalComponent } from './clientUnitPrice-client-lookup-table-modal.component';
import { ClientUnitPriceProductSubCategoryLookupTableModalComponent } from './clientUnitPrice-productSubCategory-lookup-table-modal.component';


@Component({
    selector: 'createOrEditClientUnitPriceModal',
    templateUrl: './create-or-edit-clientUnitPrice-modal.component.html'
})
export class CreateOrEditClientUnitPriceModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('clientUnitPriceClientLookupTableModal', { static: true }) clientUnitPriceClientLookupTableModal: ClientUnitPriceClientLookupTableModalComponent;
    @ViewChild('clientUnitPriceProductSubCategoryLookupTableModal', { static: true }) clientUnitPriceProductSubCategoryLookupTableModal: ClientUnitPriceProductSubCategoryLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    clientUnitPrice: CreateOrEditClientUnitPriceDto = new CreateOrEditClientUnitPriceDto();

    clientClientName = '';
    productSubCategoryPipeDiameter = '';


    constructor(
        injector: Injector,
        private _clientUnitPricesServiceProxy: ClientUnitPricesServiceProxy
    ) {
        super(injector);
    }

    show(clientUnitPriceId?: number): void {

        if (!clientUnitPriceId) {
            this.clientUnitPrice = new CreateOrEditClientUnitPriceDto();
            this.clientUnitPrice.id = clientUnitPriceId;
            this.clientClientName = '';
            this.productSubCategoryPipeDiameter = '';

            this.active = true;
            this.modal.show();
        } else {
            this._clientUnitPricesServiceProxy.getClientUnitPriceForEdit(clientUnitPriceId).subscribe(result => {
                this.clientUnitPrice = result.clientUnitPrice;

                this.clientClientName = result.clientClientName;
                this.productSubCategoryPipeDiameter = result.productSubCategoryPipeDiameter;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._clientUnitPricesServiceProxy.createOrEdit(this.clientUnitPrice)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectClientModal() {
        this.clientUnitPriceClientLookupTableModal.id = this.clientUnitPrice.clientId;
        this.clientUnitPriceClientLookupTableModal.displayName = this.clientClientName;
        this.clientUnitPriceClientLookupTableModal.show();
    }
        openSelectProductSubCategoryModal() {
        this.clientUnitPriceProductSubCategoryLookupTableModal.id = this.clientUnitPrice.productSubCategoryId;
        this.clientUnitPriceProductSubCategoryLookupTableModal.displayName = this.productSubCategoryPipeDiameter;
        this.clientUnitPriceProductSubCategoryLookupTableModal.show();
    }


        setClientIdNull() {
        this.clientUnitPrice.clientId = null;
        this.clientClientName = '';
    }
        setProductSubCategoryIdNull() {
        this.clientUnitPrice.productSubCategoryId = null;
        this.productSubCategoryPipeDiameter = '';
    }


        getNewClientId() {
        this.clientUnitPrice.clientId = this.clientUnitPriceClientLookupTableModal.id;
        this.clientClientName = this.clientUnitPriceClientLookupTableModal.displayName;
    }
        getNewProductSubCategoryId() {
        this.clientUnitPrice.productSubCategoryId = this.clientUnitPriceProductSubCategoryLookupTableModal.id;
        this.productSubCategoryPipeDiameter = this.clientUnitPriceProductSubCategoryLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
