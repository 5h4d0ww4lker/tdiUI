import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetQuotationForViewDto, QuotationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewQuotationModal',
    templateUrl: './view-quotation-modal.component.html'
})
export class ViewQuotationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetQuotationForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetQuotationForViewDto();
        this.item.quotation = new QuotationDto();
    }

    show(item: GetQuotationForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
