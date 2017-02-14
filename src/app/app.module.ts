import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DetailsComponent } from './details/details.component';
import { RevievsComponent } from './revievs/revievs.component';
import { RegistrationComponent } from './registration/registration.component';

import { HttpRequestService } from './services/http-request.service';
import { NewReviewComponent } from './new-review/new-review.component';
import { StarsDirective } from './directives/stars.directive';
import { ShowMenuDirective } from './directives/show-menu.directive';

let childRoutes: Routes = [
  {path: 'reviews', component: RevievsComponent}

];

let routes: Routes = [
  {path: 'delivery', component: DeliveryComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'products/:id', component: DetailsComponent, children: childRoutes},
  {path: 'products', component: ProductsComponent, pathMatch: 'full'},
  {path: '', component: ProductsComponent, pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DeliveryComponent,
    DetailsComponent,
    RevievsComponent,
    RegistrationComponent,
    NewReviewComponent,
    StarsDirective,
    ShowMenuDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
      RouterModule.forRoot(routes)
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
