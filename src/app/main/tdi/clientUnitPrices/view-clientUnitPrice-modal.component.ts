import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetClientUnitPriceForViewDto, ClientUnitPriceDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewClientUnitPriceModal',
    templateUrl: './view-clientUnitPrice-modal.component.html'
})
export class ViewClientUnitPriceModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetClientUnitPriceForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetClientUnitPriceForViewDto();
        this.item.clientUnitPrice = new ClientUnitPriceDto();
    }

    show(item: GetClientUnitPriceForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
