import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationUnitPricesServiceProxy, QuotationUnitPriceDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditQuotationUnitPriceModalComponent } from './create-or-edit-quotationUnitPrice-modal.component';
import { ViewQuotationUnitPriceModalComponent } from './view-quotationUnitPrice-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './quotationUnitPrices.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class QuotationUnitPricesComponent extends AppComponentBase {

    @ViewChild('createOrEditQuotationUnitPriceModal', { static: true }) createOrEditQuotationUnitPriceModal: CreateOrEditQuotationUnitPriceModalComponent;
    @ViewChild('viewQuotationUnitPriceModalComponent', { static: true }) viewQuotationUnitPriceModal: ViewQuotationUnitPriceModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    descriptionFilter = '';
    unitFilter = '';
    priceFilter = '';
        quotationQuotationNumberFilter = '';




    constructor(
        injector: Injector,
        private _quotationUnitPricesServiceProxy: QuotationUnitPricesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getQuotationUnitPrices(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._quotationUnitPricesServiceProxy.getAll(
            this.filterText,
            this.descriptionFilter,
            this.unitFilter,
            this.priceFilter,
            this.quotationQuotationNumberFilter,
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

    createQuotationUnitPrice(): void {
        this.createOrEditQuotationUnitPriceModal.show();
    }

    deleteQuotationUnitPrice(quotationUnitPrice: QuotationUnitPriceDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._quotationUnitPricesServiceProxy.delete(quotationUnitPrice.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._quotationUnitPricesServiceProxy.getQuotationUnitPricesToExcel(
        this.filterText,
            this.descriptionFilter,
            this.unitFilter,
            this.priceFilter,
            this.quotationQuotationNumberFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
