import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetClientForViewDto, ClientDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewClientModal',
    templateUrl: './view-client-modal.component.html'
})
export class ViewClientModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetClientForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetClientForViewDto();
        this.item.client = new ClientDto();
    }

    show(item: GetClientForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
