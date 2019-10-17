import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSubCategoriesServiceProxy, ProductSubCategoryDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditProductSubCategoryModalComponent } from './create-or-edit-productSubCategory-modal.component';
import { ViewProductSubCategoryModalComponent } from './view-productSubCategory-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './productSubCategories.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ProductSubCategoriesComponent extends AppComponentBase {

    @ViewChild('createOrEditProductSubCategoryModal', { static: true }) createOrEditProductSubCategoryModal: CreateOrEditProductSubCategoryModalComponent;
    @ViewChild('viewProductSubCategoryModalComponent', { static: true }) viewProductSubCategoryModal: ViewProductSubCategoryModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    pipeDiameterFilter = '';
    wallSFilter = '';
    sdrFilter = '';
    pnFilter = '';
    wpmFilter = '';
    outputKGHFilter = '';
    hauiOffSpeedFilter = '';
    outputTAFilter = '';
    productionTimeKMAFilter = '';
    productionPipeLengthKMAFilter = '';
    pipeLengthMFilter = '';
        productCategoryMaterialFilter = '';




    constructor(
        injector: Injector,
        private _productSubCategoriesServiceProxy: ProductSubCategoriesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getProductSubCategories(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._productSubCategoriesServiceProxy.getAll(
            this.filterText,
            this.pipeDiameterFilter,
            this.wallSFilter,
            this.sdrFilter,
            this.pnFilter,
            this.wpmFilter,
            this.outputKGHFilter,
            this.hauiOffSpeedFilter,
            this.outputTAFilter,
            this.productionTimeKMAFilter,
            this.productionPipeLengthKMAFilter,
            this.pipeLengthMFilter,
            this.productCategoryMaterialFilter,
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

    createProductSubCategory(): void {
        this.createOrEditProductSubCategoryModal.show();
    }

    deleteProductSubCategory(productSubCategory: ProductSubCategoryDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._productSubCategoriesServiceProxy.delete(productSubCategory.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._productSubCategoriesServiceProxy.getProductSubCategoriesToExcel(
        this.filterText,
            this.pipeDiameterFilter,
            this.wallSFilter,
            this.sdrFilter,
            this.pnFilter,
            this.wpmFilter,
            this.outputKGHFilter,
            this.hauiOffSpeedFilter,
            this.outputTAFilter,
            this.productionTimeKMAFilter,
            this.productionPipeLengthKMAFilter,
            this.pipeLengthMFilter,
            this.productCategoryMaterialFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
