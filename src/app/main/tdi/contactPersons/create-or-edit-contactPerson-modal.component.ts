import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ContactPersonsServiceProxy, CreateOrEditContactPersonDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditContactPersonModal',
    templateUrl: './create-or-edit-contactPerson-modal.component.html'
})
export class CreateOrEditContactPersonModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    contactPerson: CreateOrEditContactPersonDto = new CreateOrEditContactPersonDto();



    constructor(
        injector: Injector,
        private _contactPersonsServiceProxy: ContactPersonsServiceProxy
    ) {
        super(injector);
    }

    show(contactPersonId?: number): void {

        if (!contactPersonId) {
            this.contactPerson = new CreateOrEditContactPersonDto();
            this.contactPerson.id = contactPersonId;

            this.active = true;
            this.modal.show();
        } else {
            this._contactPersonsServiceProxy.getContactPersonForEdit(contactPersonId).subscribe(result => {
                this.contactPerson = result.contactPerson;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._contactPersonsServiceProxy.createOrEdit(this.contactPerson)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
