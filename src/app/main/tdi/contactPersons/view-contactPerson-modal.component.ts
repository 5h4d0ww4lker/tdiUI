import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetContactPersonForViewDto, ContactPersonDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewContactPersonModal',
    templateUrl: './view-contactPerson-modal.component.html'
})
export class ViewContactPersonModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetContactPersonForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetContactPersonForViewDto();
        this.item.contactPerson = new ContactPersonDto();
    }

    show(item: GetContactPersonForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
