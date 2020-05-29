import { Injectable } from '@angular/core';
import { RegisterForm } from './register-form.model';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError }  from 'rxjs';
import { catchError,map }  from 'rxjs/operators';
import { exctractApiError } from '../../rental/shared/helper/function';
import { JwtHelperService } from "@auth0/angular-jwt";

import * as moment from 'moment';

const jwt = new JwtHelperService();


   class DecodedToken{
 
     exp: number = 0;
     username: string = '';
     userId: string = '';

   }


    @Injectable({
    providedIn: 'root'


    })
     export class AuthService{

          private decodedToken: DecodedToken;
           redirectUrl: string;

        constructor(private http : HttpClient){ 

             this.decodedToken= new DecodedToken();
             }


       register(formData: RegisterForm): Observable<any>{

           // alert(JSON.stringify(formData));
          return this.http.post('/api/v1/users/register',formData).pipe(catchError((resError: HttpErrorResponse)=>{
                 
                    return throwError(exctractApiError(resError));


          })
          );
       }

       // /api/v1/users/login
       login(formData:any){
               
                return this.http.post('/api/v1/users/login',formData).pipe(map((token:string)=>{

                       const savedToken=this.saveToken(token);
                        return token;

                }),
                catchError((resError: HttpErrorResponse)=>{
                 
                    return throwError(exctractApiError(resError));


          })
          );
               
       }

       logout(){
             localStorage.removeItem('auth_token');
             this.decodedToken= new DecodedToken();

       }


   


    get isAuthenticated(): boolean { 
     return this.decodedToken && moment().isBefore(this.expiration) 
      }


    private saveToken(token): string | null{

    const decodedToken = jwt.decodeToken(token);

    if(!decodedToken){

       return null;
    }


        this.decodedToken=decodedToken;
        localStorage.setItem('auth_token',token);

        return token;
 
    }

    get username(): string{

      return this.decodedToken && this.decodedToken.username;
    }

    private get expiration(){

      return moment.unix(this.decodedToken.exp);
    }

    checkAuthentication(): boolean{
   
      const authToken = localStorage.getItem('auth_token');

      if(authToken){
       return false;
      }

       const decodedToken = jwt.decodeToken(authToken);
               
               if(decodedToken){
       return false;
      }
           
            this.decodedToken=decodedToken;

       return true;
    }
  
     }