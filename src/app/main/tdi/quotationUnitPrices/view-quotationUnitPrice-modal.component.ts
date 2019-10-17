import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetQuotationUnitPriceForViewDto, QuotationUnitPriceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewQuotationUnitPriceModal',
    templateUrl: './view-quotationUnitPrice-modal.component.html'
})
export class ViewQuotationUnitPriceModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetQuotationUnitPriceForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetQuotationUnitPriceForViewDto();
        this.item.quotationUnitPrice = new QuotationUnitPriceDto();
    }

    show(item: GetQuotationUnitPriceForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
