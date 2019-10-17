import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ClientsServiceProxy, CreateOrEditClientDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { ClientContactPersonLookupTableModalComponent } from './client-contactPerson-lookup-table-modal.component';


@Component({
    selector: 'createOrEditClientModal',
    templateUrl: './create-or-edit-client-modal.component.html'
})
export class CreateOrEditClientModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('clientContactPersonLookupTableModal', { static: true }) clientContactPersonLookupTableModal: ClientContactPersonLookupTableModalComponent;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    client: CreateOrEditClientDto = new CreateOrEditClientDto();

    contactPersonFullName = '';


    constructor(
        injector: Injector,
        private _clientsServiceProxy: ClientsServiceProxy
    ) {
        super(injector);
    }

    show(clientId?: number): void {

        if (!clientId) {
            this.client = new CreateOrEditClientDto();
            this.client.id = clientId;
            this.contactPersonFullName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._clientsServiceProxy.getClientForEdit(clientId).subscribe(result => {
                this.client = result.client;

                this.contactPersonFullName = result.contactPersonFullName;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._clientsServiceProxy.createOrEdit(this.client)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }

        openSelectContactPersonModal() {
        this.clientContactPersonLookupTableModal.id = this.client.contactPersonId;
        this.clientContactPersonLookupTableModal.displayName = this.contactPersonFullName;
        this.clientContactPersonLookupTableModal.show();
    }


        setContactPersonIdNull() {
        this.client.contactPersonId = null;
        this.contactPersonFullName = '';
    }


        getNewContactPersonId() {
        this.client.contactPersonId = this.clientContactPersonLookupTableModal.id;
        this.contactPersonFullName = this.clientContactPersonLookupTableModal.displayName;
    }


    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
