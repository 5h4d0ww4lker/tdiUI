import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetOrderedProductForViewDto, OrderedProductDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewOrderedProductModal',
    templateUrl: './view-orderedProduct-modal.component.html'
})
export class ViewOrderedProductModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetOrderedProductForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetOrderedProductForViewDto();
        this.item.orderedProduct = new OrderedProductDto();
    }

    show(item: GetOrderedProductForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
