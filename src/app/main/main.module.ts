import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { QuotationItemsComponent } from './tdi/quotationItems/quotationItems.component';
import { ViewQuotationItemModalComponent } from './tdi/quotationItems/view-quotationItem-modal.component';
import { CreateOrEditQuotationItemModalComponent } from './tdi/quotationItems/create-or-edit-quotationItem-modal.component';
import { QuotationItemQuotationLookupTableModalComponent } from './tdi/quotationItems/quotationItem-quotation-lookup-table-modal.component';
import { QuotationItemProductCategoryLookupTableModalComponent } from './tdi/quotationItems/quotationItem-productCategory-lookup-table-modal.component';
import { QuotationItemProductSubCategoryLookupTableModalComponent } from './tdi/quotationItems/quotationItem-productSubCategory-lookup-table-modal.component';
import { QuotationItemUnitPriceLookupTableModalComponent } from './tdi/quotationItems/quotationItem-unitPrice-lookup-table-modal.component';
import { QuotationItemClientUnitPriceLookupTableModalComponent } from './tdi/quotationItems/quotationItem-clientUnitPrice-lookup-table-modal.component';
import { QuotationItemQuotationUnitPriceLookupTableModalComponent } from './tdi/quotationItems/quotationItem-quotationUnitPrice-lookup-table-modal.component';

import { QuotationUnitPricesComponent } from './tdi/quotationUnitPrices/quotationUnitPrices.component';
import { ViewQuotationUnitPriceModalComponent } from './tdi/quotationUnitPrices/view-quotationUnitPrice-modal.component';
import { CreateOrEditQuotationUnitPriceModalComponent } from './tdi/quotationUnitPrices/create-or-edit-quotationUnitPrice-modal.component';
import { QuotationUnitPriceQuotationLookupTableModalComponent } from './tdi/quotationUnitPrices/quotationUnitPrice-quotation-lookup-table-modal.component';
import { QuotationUnitPriceProductSubCategoryLookupTableModalComponent } from './tdi/quotationUnitPrices/quotationUnitPrice-productSubCategory-lookup-table-modal.component';

import { ClientUnitPricesComponent } from './tdi/clientUnitPrices/clientUnitPrices.component';
import { ViewClientUnitPriceModalComponent } from './tdi/clientUnitPrices/view-clientUnitPrice-modal.component';
import { CreateOrEditClientUnitPriceModalComponent } from './tdi/clientUnitPrices/create-or-edit-clientUnitPrice-modal.component';

import { ClientUnitPriceClientLookupTableModalComponent } from './tdi/clientUnitPrices/clientUnitPrice-client-lookup-table-modal.component';
import { ClientUnitPriceProductSubCategoryLookupTableModalComponent } from './tdi/clientUnitPrices/clientUnitPrice-productSubCategory-lookup-table-modal.component';

import { ProductSubCategoriesComponent } from './tdi/productSubCategories/productSubCategories.component';
import { ViewProductSubCategoryModalComponent } from './tdi/productSubCategories/view-productSubCategory-modal.component';
import { CreateOrEditProductSubCategoryModalComponent } from './tdi/productSubCategories/create-or-edit-productSubCategory-modal.component';
import { ProductSubCategoryProductCategoryLookupTableModalComponent } from './tdi/productSubCategories/productSubCategory-productCategory-lookup-table-modal.component';

import { ProductCategoriesComponent } from './tdi/productCategories/productCategories.component';
import { ViewProductCategoryModalComponent } from './tdi/productCategories/view-productCategory-modal.component';
import { CreateOrEditProductCategoryModalComponent } from './tdi/productCategories/create-or-edit-productCategory-modal.component';

import { ProdactCategoriesComponent } from './tdi/prodactCategories/prodactCategories.component';
import { ViewProdactCategoryModalComponent } from './tdi/prodactCategories/view-prodactCategory-modal.component';
import { CreateOrEditProdactCategoryModalComponent } from './tdi/prodactCategories/create-or-edit-prodactCategory-modal.component';

import { UnitPricesComponent } from './tdi/unitPrices/unitPrices.component';
import { ViewUnitPriceModalComponent } from './tdi/unitPrices/view-unitPrice-modal.component';
import { CreateOrEditUnitPriceModalComponent } from './tdi/unitPrices/create-or-edit-unitPrice-modal.component';
import { UnitPriceProductLookupTableModalComponent } from './tdi/unitPrices/unitPrice-product-lookup-table-modal.component';

import { ProductsComponent } from './tdi/products/products.component';
import { ViewProductModalComponent } from './tdi/products/view-product-modal.component';
import { CreateOrEditProductModalComponent } from './tdi/products/create-or-edit-product-modal.component';

import { QuotationsComponent } from './tdi/quotations/quotations.component';
import { ViewQuotationModalComponent } from './tdi/quotations/view-quotation-modal.component';
import { CreateOrEditQuotationModalComponent } from './tdi/quotations/create-or-edit-quotation-modal.component';
import { QuotationClientLookupTableModalComponent } from './tdi/quotations/quotation-client-lookup-table-modal.component';

import { ClientsComponent } from './tdi/clients/clients.component';
import { ViewClientModalComponent } from './tdi/clients/view-client-modal.component';
import { CreateOrEditClientModalComponent } from './tdi/clients/create-or-edit-client-modal.component';
import { ClientContactPersonLookupTableModalComponent } from './tdi/clients/client-contactPerson-lookup-table-modal.component';


import { ClientProductsComponent } from './tdi/clientProducts/clientProducts.component';
import { ContactPersonsComponent } from './tdi/contactPersons/contactPersons.component';
import { ViewContactPersonModalComponent } from './tdi/contactPersons/view-contactPerson-modal.component';
import { CreateOrEditContactPersonModalComponent } from './tdi/contactPersons/create-or-edit-contactPerson-modal.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';import { FileUploadModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule, TabsModule, TooltipModule, BsDropdownModule, PopoverModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
		InputMaskModule,		TableModule,

        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PopoverModule.forRoot()
    ],
    declarations: [
		QuotationItemsComponent,
		ViewQuotationItemModalComponent,		CreateOrEditQuotationItemModalComponent,
    QuotationItemQuotationLookupTableModalComponent,
    QuotationItemProductCategoryLookupTableModalComponent,
    QuotationItemProductSubCategoryLookupTableModalComponent,
    QuotationItemUnitPriceLookupTableModalComponent,
    QuotationItemClientUnitPriceLookupTableModalComponent,
    QuotationItemQuotationUnitPriceLookupTableModalComponent,
		QuotationUnitPricesComponent,
		ViewQuotationUnitPriceModalComponent,		CreateOrEditQuotationUnitPriceModalComponent,
    QuotationUnitPriceQuotationLookupTableModalComponent,
    QuotationUnitPriceProductSubCategoryLookupTableModalComponent,
		ClientUnitPricesComponent,
		ViewClientUnitPriceModalComponent,		CreateOrEditClientUnitPriceModalComponent,

		ClientUnitPricesComponent,
		ViewClientUnitPriceModalComponent,		CreateOrEditClientUnitPriceModalComponent,
    ClientUnitPriceClientLookupTableModalComponent,

    ClientUnitPriceProductSubCategoryLookupTableModalComponent,
		ProductSubCategoriesComponent,
		ViewProductSubCategoryModalComponent,		CreateOrEditProductSubCategoryModalComponent,
    ProductSubCategoryProductCategoryLookupTableModalComponent,
		ProductCategoriesComponent,
		ViewProductCategoryModalComponent,		CreateOrEditProductCategoryModalComponent,
		ProdactCategoriesComponent,
		ViewProdactCategoryModalComponent,		CreateOrEditProdactCategoryModalComponent,
		UnitPricesComponent,
		ViewUnitPriceModalComponent,		CreateOrEditUnitPriceModalComponent,
    UnitPricesComponent,
    ClientProductsComponent,
		ViewUnitPriceModalComponent,		CreateOrEditUnitPriceModalComponent,
    UnitPriceProductLookupTableModalComponent,
		ProductsComponent,
		ViewProductModalComponent,		CreateOrEditProductModalComponent,
		QuotationsComponent,
		ViewQuotationModalComponent,		CreateOrEditQuotationModalComponent,
    QuotationClientLookupTableModalComponent,
		ClientsComponent,
		ViewClientModalComponent,		CreateOrEditClientModalComponent,
    ClientContactPersonLookupTableModalComponent,
		ContactPersonsComponent,
		ViewContactPersonModalComponent,		CreateOrEditContactPersonModalComponent,
        DashboardComponent
    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale }
    ]
})
export class MainModule { }
