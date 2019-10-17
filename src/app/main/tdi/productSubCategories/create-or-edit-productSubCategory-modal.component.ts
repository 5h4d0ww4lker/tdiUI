import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ProductSubCategoriesServiceProxy, CreateOrEditProductSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { ProductSubCategoryProductCategoryLookupTableModalComponent } from './productSubCategory-productCategory-lookup-table-modal.component';


@Component({
    selector: 'createOrEditProductSubCategoryModal',
    templateUrl: './create-or-edit-productSubCategory-modal.component.html'
})
export class CreateOrEditProductSubCategoryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('productSubCategoryProductCategoryLookupTableModal', { static: true }) productSubCategoryProductCategoryLookupTableModal: ProductSubCategoryProductCategoryLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    productSubCategory: CreateOrEditProductSubCategoryDto = new CreateOrEditProductSubCategoryDto();

    productCategoryMaterial = '';


    constructor(
        injector: Injector,
        private _productSubCategoriesServiceProxy: ProductSubCategoriesServiceProxy
    ) {
        super(injector);
    }

    show(productSubCategoryId?: number): void {

        if (!productSubCategoryId) {
            this.productSubCategory = new CreateOrEditProductSubCategoryDto();
            this.productSubCategory.id = productSubCategoryId;
            this.productCategoryMaterial = '';

            this.active = true;
            this.modal.show();
        } else {
            this._productSubCategoriesServiceProxy.getProductSubCategoryForEdit(productSubCategoryId).subscribe(result => {
                this.productSubCategory = result.productSubCategory;

                this.productCategoryMaterial = result.productCategoryMaterial;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._productSubCategoriesServiceProxy.createOrEdit(this.productSubCategory)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectProductCategoryModal() {
        this.productSubCategoryProductCategoryLookupTableModal.id = this.productSubCategory.productCategoryId;
        this.productSubCategoryProductCategoryLookupTableModal.displayName = this.productCategoryMaterial;
        this.productSubCategoryProductCategoryLookupTableModal.show();
    }


        setProductCategoryIdNull() {
        this.productSubCategory.productCategoryId = null;
        this.productCategoryMaterial = '';
    }


        getNewProductCategoryId() {
        this.productSubCategory.productCategoryId = this.productSubCategoryProductCategoryLookupTableModal.id;
        this.productCategoryMaterial = this.productSubCategoryProductCategoryLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
