import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';
import { Routes,RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { UppercasePipe ,FirstUpperLetterPipe} from './shared/pipe/uppercase.pipe';
import { HightlightDirective , BwmNgIfDirective , BwmNgForDirective } from './shared/directives/custom.directive';
import { HttpClientModule } from '@angular/common/http';
import { RentalSecretComponent } from './rental-secret/rental-secret.component';
import { AuthGuard } from '../auth/shared/auth.gaurd';

const routes :Routes =[
{
path:'rentals',component: RentalComponent ,
children :[

{ path:'',component: RentalListComponent },
{ path : 'secret' ,component: RentalSecretComponent, canActivate: [AuthGuard]},
{ path : ':rentalId' ,component: RentalDetailComponent }

]
}
]

@NgModule({
declarations :[
RentalListComponent,
RentalListItemComponent,
RentalComponent,
RentalDetailComponent,
UppercasePipe,
FirstUpperLetterPipe,
HightlightDirective,
BwmNgIfDirective,
BwmNgForDirective,
RentalSecretComponent

],
imports : [ CommonModule,
   RouterModule.forChild(routes),
   HttpClientModule
 ],
providers : [RentalService]
})
export class RentalModule {
	


}