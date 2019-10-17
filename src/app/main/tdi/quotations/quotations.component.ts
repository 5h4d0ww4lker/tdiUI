import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationsServiceProxy, QuotationDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditQuotationModalComponent } from './create-or-edit-quotation-modal.component';
import { ViewQuotationModalComponent } from './view-quotation-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EntityTypeHistoryModalComponent } from '@app/shared/common/entityHistory/entity-type-history-modal.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './quotations.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class QuotationsComponent extends AppComponentBase {

    @ViewChild('createOrEditQuotationModal', { static: true }) createOrEditQuotationModal: CreateOrEditQuotationModalComponent;
    @ViewChild('viewQuotationModalComponent', { static: true }) viewQuotationModal: ViewQuotationModalComponent;
    @ViewChild('entityTypeHistoryModal', { static: true }) entityTypeHistoryModal: EntityTypeHistoryModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    quotationNumberFilter = '';
    priceValidityFilter = '';
    termOfPaymentFilter = '';
    shipmentTypesFilter = '';
    discountInPercentFilter = '';
    discountInAmountFilter = '';
        clientClientNameFilter = '';


    _entityTypeFullName = 'MyCompanyName.AbpZeroTemplate.TDI.Quotation';
    entityHistoryEnabled = false;

    constructor(
        injector: Injector,
        private _quotationsServiceProxy: QuotationsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.entityHistoryEnabled = this.setIsEntityHistoryEnabled();
    }

    private setIsEntityHistoryEnabled(): boolean {
        let customSettings = (abp as any).custom;
        return customSettings.EntityHistory && customSettings.EntityHistory.isEnabled && _.filter(customSettings.EntityHistory.enabledEntities, entityType => entityType === this._entityTypeFullName).length === 1;
    }

    getQuotations(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._quotationsServiceProxy.getAll(
            this.filterText,
            this.quotationNumberFilter,
            this.priceValidityFilter,
            this.termOfPaymentFilter,
            this.shipmentTypesFilter,
            this.discountInPercentFilter,
            this.discountInAmountFilter,
            this.clientClientNameFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createQuotation(): void {
        this.createOrEditQuotationModal.show();
    }

    showHistory(quotation: QuotationDto): void {
        this.entityTypeHistoryModal.show({
            entityId: quotation.id.toString(),
            entityTypeFullName: this._entityTypeFullName,
            entityTypeDescription: ''
        });
    }

    deleteQuotation(quotation: QuotationDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._quotationsServiceProxy.delete(quotation.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._quotationsServiceProxy.getQuotationsToExcel(
        this.filterText,
            this.quotationNumberFilter,
            this.priceValidityFilter,
            this.termOfPaymentFilter,
            this.shipmentTypesFilter,
            this.discountInPercentFilter,
            this.discountInAmountFilter,
            this.clientClientNameFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
