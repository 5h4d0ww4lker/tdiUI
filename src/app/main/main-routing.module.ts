import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotationItemsComponent } from './tdi/quotationItems/quotationItems.component';
import { QuotationsComponent } from './tdi/quotations/quotations.component';


import { QuotationUnitPricesComponent } from './tdi/quotationUnitPrices/quotationUnitPrices.component';
import { ClientUnitPricesComponent } from './tdi/clientUnitPrices/clientUnitPrices.component';
import { ProductSubCategoriesComponent } from './tdi/productSubCategories/productSubCategories.component';
import { ProductCategoriesComponent } from './tdi/productCategories/productCategories.component';
import { ProdactCategoriesComponent } from './tdi/prodactCategories/prodactCategories.component';
import { UnitPricesComponent } from './tdi/unitPrices/unitPrices.component';


import { ProductsComponent } from './tdi/products/products.component';

import { ClientsComponent } from './tdi/clients/clients.component';
import { ClientProductsComponent } from './tdi/clientProducts/clientProducts.component';
import { ContactPersonsComponent } from './tdi/contactPersons/contactPersons.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'tdi/quotationItems', component: QuotationItemsComponent, data: { permission: 'Pages.QuotationItems' }  },
                    { path: 'tdi/quotationUnitPrices', component: QuotationUnitPricesComponent, data: { permission: 'Pages.QuotationUnitPrices' }  },
                    { path: 'tdi/clientUnitPrices', component: ClientUnitPricesComponent, data: { permission: 'Pages.ClientUnitPrices' }  },
                    { path: 'tdi/productSubCategories', component: ProductSubCategoriesComponent, data: { permission: 'Pages.ProductSubCategories' }  },
                    { path: 'tdi/productCategories', component: ProductCategoriesComponent, data: { permission: 'Pages.ProductCategories' }  },
                    { path: 'tdi/prodactCategories', component: ProdactCategoriesComponent, data: { permission: 'Pages.ProdactCategories' }  },
                    { path: 'tdi/unitPrices', component: UnitPricesComponent, data: { permission: 'Pages.UnitPrices' }  },
                    { path: 'tdi/products', component: ProductsComponent, data: { permission: 'Pages.Products' }  },
                    { path: 'tdi/quotations', component: QuotationsComponent, data: { permission: 'Pages.Quotations' }  },
                    { path: 'tdi/clients', component: ClientsComponent, data: { permission: 'Pages.Clients' }  },
                    { path: 'tdi/contactPersons', component: ContactPersonsComponent, data: { permission: 'Pages.ContactPersons' }  },
                    { path: 'tdi/clientProducts', component: ClientProductsComponent, data: { permission: 'Pages.ClientProducts' }  },
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
