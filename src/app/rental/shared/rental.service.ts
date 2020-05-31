import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService{


          constructor(private http : HttpClient){
                             
                             }


public getRentalById(rentalId : string) : Observable<Rental> {
	
          return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`);
}


public getRentals() : Observable<Rental[]>{

	        return this.http.get<Rental[]>(`/api/v1/rentals`);

}



}