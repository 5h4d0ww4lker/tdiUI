import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ProdactCategoriesServiceProxy, CreateOrEditProdactCategoryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditProdactCategoryModal',
    templateUrl: './create-or-edit-prodactCategory-modal.component.html'
})
export class CreateOrEditProdactCategoryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    prodactCategory: CreateOrEditProdactCategoryDto = new CreateOrEditProdactCategoryDto();



    constructor(
        injector: Injector,
        private _prodactCategoriesServiceProxy: ProdactCategoriesServiceProxy
    ) {
        super(injector);
    }

    show(prodactCategoryId?: number): void {

        if (!prodactCategoryId) {
            this.prodactCategory = new CreateOrEditProdactCategoryDto();
            this.prodactCategory.id = prodactCategoryId;

            this.active = true;
            this.modal.show();
        } else {
            this._prodactCategoriesServiceProxy.getProdactCategoryForEdit(prodactCategoryId).subscribe(result => {
                this.prodactCategory = result.prodactCategory;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._prodactCategoriesServiceProxy.createOrEdit(this.prodactCategory)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
