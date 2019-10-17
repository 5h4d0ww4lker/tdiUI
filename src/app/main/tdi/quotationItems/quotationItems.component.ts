import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationItemsServiceProxy, QuotationItemDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditQuotationItemModalComponent } from './create-or-edit-quotationItem-modal.component';
import { ViewQuotationItemModalComponent } from './view-quotationItem-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './quotationItems.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class QuotationItemsComponent extends AppComponentBase {

    @ViewChild('createOrEditQuotationItemModal', { static: true }) createOrEditQuotationItemModal: CreateOrEditQuotationItemModalComponent;
    @ViewChild('viewQuotationItemModalComponent', { static: true }) viewQuotationItemModal: ViewQuotationItemModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    unitOfMeasurementFilter = '';
    quantityFilter = '';
    totalAmountInETBFilter = '';
    descriptionFilter = '';
        quotationQuotationNumberFilter = '';
        productCategoryMaterialFilter = '';
        productSubCategoryPipeDiameterFilter = '';
        unitPricePriceFilter = '';
        clientUnitPriceDescriptionFilter = '';
        quotationUnitPriceDescriptionFilter = '';




    constructor(
        injector: Injector,
        private _quotationItemsServiceProxy: QuotationItemsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getQuotationItems(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._quotationItemsServiceProxy.getAll(
            this.filterText,
            this.unitOfMeasurementFilter,
            this.quantityFilter,
            this.totalAmountInETBFilter,
            this.descriptionFilter,
            this.quotationQuotationNumberFilter,
            this.productCategoryMaterialFilter,
            this.productSubCategoryPipeDiameterFilter,
            this.unitPricePriceFilter,
            this.clientUnitPriceDescriptionFilter,
            this.quotationUnitPriceDescriptionFilter,
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

    createQuotationItem(): void {
        this.createOrEditQuotationItemModal.show();
    }

    deleteQuotationItem(quotationItem: QuotationItemDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._quotationItemsServiceProxy.delete(quotationItem.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._quotationItemsServiceProxy.getQuotationItemsToExcel(
        this.filterText,
            this.unitOfMeasurementFilter,
            this.quantityFilter,
            this.totalAmountInETBFilter,
            this.descriptionFilter,
            this.quotationQuotationNumberFilter,
            this.productCategoryMaterialFilter,
            this.productSubCategoryPipeDiameterFilter,
            this.unitPricePriceFilter,
            this.clientUnitPriceDescriptionFilter,
            this.quotationUnitPriceDescriptionFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
