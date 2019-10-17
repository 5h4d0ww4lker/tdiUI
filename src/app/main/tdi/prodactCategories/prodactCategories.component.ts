import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdactCategoriesServiceProxy, ProdactCategoryDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditProdactCategoryModalComponent } from './create-or-edit-prodactCategory-modal.component';
import { ViewProdactCategoryModalComponent } from './view-prodactCategory-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './prodactCategories.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ProdactCategoriesComponent extends AppComponentBase {

    @ViewChild('createOrEditProdactCategoryModal', { static: true }) createOrEditProdactCategoryModal: CreateOrEditProdactCategoryModalComponent;
    @ViewChild('viewProdactCategoryModalComponent', { static: true }) viewProdactCategoryModal: ViewProdactCategoryModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    materialFilter = '';
    extruderFilter = '';
    pipeheadFilter = '';




    constructor(
        injector: Injector,
        private _prodactCategoriesServiceProxy: ProdactCategoriesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getProdactCategories(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._prodactCategoriesServiceProxy.getAll(
            this.filterText,
            this.materialFilter,
            this.extruderFilter,
            this.pipeheadFilter,
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

    createProdactCategory(): void {
        this.createOrEditProdactCategoryModal.show();
    }

    deleteProdactCategory(prodactCategory: ProdactCategoryDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._prodactCategoriesServiceProxy.delete(prodactCategory.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._prodactCategoriesServiceProxy.getProdactCategoriesToExcel(
        this.filterText,
            this.materialFilter,
            this.extruderFilter,
            this.pipeheadFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
