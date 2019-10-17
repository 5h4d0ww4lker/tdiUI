import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderedProductsServiceProxy, OrderedProductDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditOrderedProductModalComponent } from './create-or-edit-orderedProduct-modal.component';
import { ViewOrderedProductModalComponent } from './view-orderedProduct-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './orderedProducts.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class OrderedProductsComponent extends AppComponentBase {

    @ViewChild('createOrEditOrderedProductModal', { static: true }) createOrEditOrderedProductModal: CreateOrEditOrderedProductModalComponent;
    @ViewChild('viewOrderedProductModalComponent', { static: true }) viewOrderedProductModal: ViewOrderedProductModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    quantityFilter = '';
    totalAmountInETBFilter = '';
        quotationItemDescriptionFilter = '';




    constructor(
        injector: Injector,
        private _orderedProductsServiceProxy: OrderedProductsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getOrderedProducts(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._orderedProductsServiceProxy.getAll(
            this.filterText,
            this.quantityFilter,
            this.totalAmountInETBFilter,
            this.quotationItemDescriptionFilter,
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

    createOrderedProduct(): void {
        this.createOrEditOrderedProductModal.show();
    }

    deleteOrderedProduct(orderedProduct: OrderedProductDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._orderedProductsServiceProxy.delete(orderedProduct.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._orderedProductsServiceProxy.getOrderedProductsToExcel(
        this.filterText,
            this.quantityFilter,
            this.totalAmountInETBFilter,
            this.quotationItemDescriptionFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
