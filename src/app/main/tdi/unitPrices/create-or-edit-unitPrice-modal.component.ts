import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { UnitPricesServiceProxy, CreateOrEditUnitPriceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { UnitPriceProductLookupTableModalComponent } from './unitPrice-product-lookup-table-modal.component';


@Component({
    selector: 'createOrEditUnitPriceModal',
    templateUrl: './create-or-edit-unitPrice-modal.component.html'
})
export class CreateOrEditUnitPriceModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('unitPriceProductLookupTableModal', { static: true }) unitPriceProductLookupTableModal: UnitPriceProductLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    unitPrice: CreateOrEditUnitPriceDto = new CreateOrEditUnitPriceDto();

    productDescription = '';


    constructor(
        injector: Injector,
        private _unitPricesServiceProxy: UnitPricesServiceProxy
    ) {
        super(injector);
    }

    show(unitPriceId?: number): void {

        if (!unitPriceId) {
            this.unitPrice = new CreateOrEditUnitPriceDto();
            this.unitPrice.id = unitPriceId;
            this.productDescription = '';

            this.active = true;
            this.modal.show();
        } else {
            this._unitPricesServiceProxy.getUnitPriceForEdit(unitPriceId).subscribe(result => {
                this.unitPrice = result.unitPrice;

                this.productDescription = result.productDescription;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._unitPricesServiceProxy.createOrEdit(this.unitPrice)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectProductModal() {
        this.unitPriceProductLookupTableModal.id = this.unitPrice.productId;
        this.unitPriceProductLookupTableModal.displayName = this.productDescription;
        this.unitPriceProductLookupTableModal.show();
    }


        setProductIdNull() {
        this.unitPrice.productId = null;
        this.productDescription = '';
    }


        getNewProductId() {
        this.unitPrice.productId = this.unitPriceProductLookupTableModal.id;
        this.productDescription = this.unitPriceProductLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
