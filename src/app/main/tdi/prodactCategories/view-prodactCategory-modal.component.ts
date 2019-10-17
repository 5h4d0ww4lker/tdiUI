import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetProdactCategoryForViewDto, ProdactCategoryDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewProdactCategoryModal',
    templateUrl: './view-prodactCategory-modal.component.html'
})
export class ViewProdactCategoryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetProdactCategoryForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetProdactCategoryForViewDto();
        this.item.prodactCategory = new ProdactCategoryDto();
    }

    show(item: GetProdactCategoryForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
