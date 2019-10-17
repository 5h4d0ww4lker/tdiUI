import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { QuotationItemsServiceProxy, CreateOrEditQuotationItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { QuotationItemQuotationLookupTableModalComponent } from './quotationItem-quotation-lookup-table-modal.component';
import { QuotationItemProductCategoryLookupTableModalComponent } from './quotationItem-productCategory-lookup-table-modal.component';
import { QuotationItemProductSubCategoryLookupTableModalComponent } from './quotationItem-productSubCategory-lookup-table-modal.component';
import { QuotationItemUnitPriceLookupTableModalComponent } from './quotationItem-unitPrice-lookup-table-modal.component';
import { QuotationItemClientUnitPriceLookupTableModalComponent } from './quotationItem-clientUnitPrice-lookup-table-modal.component';
import { QuotationItemQuotationUnitPriceLookupTableModalComponent } from './quotationItem-quotationUnitPrice-lookup-table-modal.component';


@Component({
    selector: 'createOrEditQuotationItemModal',
    templateUrl: './create-or-edit-quotationItem-modal.component.html'
})
export class CreateOrEditQuotationItemModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('quotationItemQuotationLookupTableModal', { static: true }) quotationItemQuotationLookupTableModal: QuotationItemQuotationLookupTableModalComponent;
    @ViewChild('quotationItemProductCategoryLookupTableModal', { static: true }) quotationItemProductCategoryLookupTableModal: QuotationItemProductCategoryLookupTableModalComponent;
    @ViewChild('quotationItemProductSubCategoryLookupTableModal', { static: true }) quotationItemProductSubCategoryLookupTableModal: QuotationItemProductSubCategoryLookupTableModalComponent;
    @ViewChild('quotationItemUnitPriceLookupTableModal', { static: true }) quotationItemUnitPriceLookupTableModal: QuotationItemUnitPriceLookupTableModalComponent;
    @ViewChild('quotationItemClientUnitPriceLookupTableModal', { static: true }) quotationItemClientUnitPriceLookupTableModal: QuotationItemClientUnitPriceLookupTableModalComponent;
    @ViewChild('quotationItemQuotationUnitPriceLookupTableModal', { static: true }) quotationItemQuotationUnitPriceLookupTableModal: QuotationItemQuotationUnitPriceLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    quotationItem: CreateOrEditQuotationItemDto = new CreateOrEditQuotationItemDto();

    quotationQuotationNumber = '';
    productCategoryMaterial = '';
    productSubCategoryPipeDiameter = '';
    unitPricePrice = '';
    clientUnitPriceDescription = '';
    quotationUnitPriceDescription = '';


    constructor(
        injector: Injector,
        private _quotationItemsServiceProxy: QuotationItemsServiceProxy
    ) {
        super(injector);
    }

    show(quotationItemId?: number): void {

        if (!quotationItemId) {
            this.quotationItem = new CreateOrEditQuotationItemDto();
            this.quotationItem.id = quotationItemId;
            this.quotationQuotationNumber = '';
            this.productCategoryMaterial = '';
            this.productSubCategoryPipeDiameter = '';
            this.unitPricePrice = '';
            this.clientUnitPriceDescription = '';
            this.quotationUnitPriceDescription = '';

            this.active = true;
            this.modal.show();
        } else {
            this._quotationItemsServiceProxy.getQuotationItemForEdit(quotationItemId).subscribe(result => {
                this.quotationItem = result.quotationItem;

                this.quotationQuotationNumber = result.quotationQuotationNumber;
                this.productCategoryMaterial = result.productCategoryMaterial;
                this.productSubCategoryPipeDiameter = result.productSubCategoryPipeDiameter;
                this.unitPricePrice = result.unitPricePrice;
                this.clientUnitPriceDescription = result.clientUnitPriceDescription;
                this.quotationUnitPriceDescription = result.quotationUnitPriceDescription;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._quotationItemsServiceProxy.createOrEdit(this.quotationItem)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectQuotationModal() {
        this.quotationItemQuotationLookupTableModal.id = this.quotationItem.quotationId;
        this.quotationItemQuotationLookupTableModal.displayName = this.quotationQuotationNumber;
        this.quotationItemQuotationLookupTableModal.show();
    }
        openSelectProductCategoryModal() {
        this.quotationItemProductCategoryLookupTableModal.id = this.quotationItem.productCategoryId;
        this.quotationItemProductCategoryLookupTableModal.displayName = this.productCategoryMaterial;
        this.quotationItemProductCategoryLookupTableModal.show();
    }
        openSelectProductSubCategoryModal() {
        this.quotationItemProductSubCategoryLookupTableModal.id = this.quotationItem.productSubCategoryId;
        this.quotationItemProductSubCategoryLookupTableModal.displayName = this.productSubCategoryPipeDiameter;
        this.quotationItemProductSubCategoryLookupTableModal.show();
    }
        openSelectUnitPriceModal() {
        this.quotationItemUnitPriceLookupTableModal.id = this.quotationItem.unitPriceId;
        this.quotationItemUnitPriceLookupTableModal.displayName = this.unitPricePrice;
        this.quotationItemUnitPriceLookupTableModal.show();
    }
        openSelectClientUnitPriceModal() {
        this.quotationItemClientUnitPriceLookupTableModal.id = this.quotationItem.clientUnitPriceId;
        this.quotationItemClientUnitPriceLookupTableModal.displayName = this.clientUnitPriceDescription;
        this.quotationItemClientUnitPriceLookupTableModal.show();
    }
        openSelectQuotationUnitPriceModal() {
        this.quotationItemQuotationUnitPriceLookupTableModal.id = this.quotationItem.quotationUnitPriceId;
        this.quotationItemQuotationUnitPriceLookupTableModal.displayName = this.quotationUnitPriceDescription;
        this.quotationItemQuotationUnitPriceLookupTableModal.show();
    }


        setQuotationIdNull() {
        this.quotationItem.quotationId = null;
        this.quotationQuotationNumber = '';
    }
        setProductCategoryIdNull() {
        this.quotationItem.productCategoryId = null;
        this.productCategoryMaterial = '';
    }
        setProductSubCategoryIdNull() {
        this.quotationItem.productSubCategoryId = null;
        this.productSubCategoryPipeDiameter = '';
    }
        setUnitPriceIdNull() {
        this.quotationItem.unitPriceId = null;
        this.unitPricePrice = '';
    }
        setClientUnitPriceIdNull() {
        this.quotationItem.clientUnitPriceId = null;
        this.clientUnitPriceDescription = '';
    }
        setQuotationUnitPriceIdNull() {
        this.quotationItem.quotationUnitPriceId = null;
        this.quotationUnitPriceDescription = '';
    }


        getNewQuotationId() {
        this.quotationItem.quotationId = this.quotationItemQuotationLookupTableModal.id;
        this.quotationQuotationNumber = this.quotationItemQuotationLookupTableModal.displayName;
    }
        getNewProductCategoryId() {
        this.quotationItem.productCategoryId = this.quotationItemProductCategoryLookupTableModal.id;
        this.productCategoryMaterial = this.quotationItemProductCategoryLookupTableModal.displayName;
    }
        getNewProductSubCategoryId() {
        this.quotationItem.productSubCategoryId = this.quotationItemProductSubCategoryLookupTableModal.id;
        this.productSubCategoryPipeDiameter = this.quotationItemProductSubCategoryLookupTableModal.displayName;
    }
        getNewUnitPriceId() {
        this.quotationItem.unitPriceId = this.quotationItemUnitPriceLookupTableModal.id;
        this.unitPricePrice = this.quotationItemUnitPriceLookupTableModal.displayName;
    }
        getNewClientUnitPriceId() {
        this.quotationItem.clientUnitPriceId = this.quotationItemClientUnitPriceLookupTableModal.id;
        this.clientUnitPriceDescription = this.quotationItemClientUnitPriceLookupTableModal.displayName;
    }
        getNewQuotationUnitPriceId() {
        this.quotationItem.quotationUnitPriceId = this.quotationItemQuotationUnitPriceLookupTableModal.id;
        this.quotationUnitPriceDescription = this.quotationItemQuotationUnitPriceLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
