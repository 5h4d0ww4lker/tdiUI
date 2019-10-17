import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetQuotationItemForViewDto, QuotationItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewQuotationItemModal',
    templateUrl: './view-quotationItem-modal.component.html'
})
export class ViewQuotationItemModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetQuotationItemForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetQuotationItemForViewDto();
        this.item.quotationItem = new QuotationItemDto();
    }

    show(item: GetQuotationItemForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
