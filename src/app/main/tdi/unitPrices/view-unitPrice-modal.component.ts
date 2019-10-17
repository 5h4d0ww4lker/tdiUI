import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetUnitPriceForViewDto, UnitPriceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewUnitPriceModal',
    templateUrl: './view-unitPrice-modal.component.html'
})
export class ViewUnitPriceModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetUnitPriceForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetUnitPriceForViewDto();
        this.item.unitPrice = new UnitPriceDto();
    }

    show(item: GetUnitPriceForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
