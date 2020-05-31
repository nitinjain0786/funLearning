import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { forbiddenEmailValidator,sameAsValidator } from '../shared/validators/functions';
import { ActivatedRoute,Router } from '@angular/router';
import {AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm : FormGroup;
  messageTimeOut: NodeJS.Timer;
  message: string;
  errors: BwmApi.Error[]=[];
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  constructor(private fb :FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private auth: AuthService) { }

  ngOnInit(): void {
  this.initForm();

   this.route.queryParams.subscribe(params =>{
      // alert('params');
    params['message'] ? this.message = params['message'] : null;
  
   this.messageTimeOut= setTimeout(()=>{

       this.router.navigate([],{
         
          replaceUrl: true,
          queryParams: {message: null},
          queryParamsHandling: 'merge'


       })

   this.message='';

    },2000);

   })
  }

  ngOnDestroy(){

   this.messageTimeOut && clearTimeout(this.messageTimeOut);

  }

 // initForm(){

 //  this.loginForm = this.fb.group({
 //      email : ['',[Validators.required,Validators.pattern(
 //  this.emailPattern),forbiddenEmailValidator('07nitin@gmail.com')]],
//    password : ['',[Validators.required,Validators.minLength(6)]]
//},{ validators : [sameAsValidator(['password','email'])]});

initForm(){

   this.loginForm = this.fb.group({
    email : ['',[Validators.required,Validators.pattern(this.emailPattern),forbiddenEmailValidator('07nitin@gmail.com')]],
    password : ['',[Validators.required,Validators.minLength(6)]]
});

  }

  login(){

  if(this.loginForm.invalid){
      return;
  }

 // alert(this.diagnostic);
    this.errors=[];
   return this.auth.login(this.loginForm.value).
           subscribe((_:string)=>{
    
            if(this.auth.redirectUrl){

               this.router.navigate([this.auth.redirectUrl]);
               this.auth.redirectUrl =null;

            }else {

             this.router.navigate(['/rentals']);
            }

          
        // console.log(token);
},(errors:BwmApi.Error[])=>{

     this.errors=errors;

           })

  }


  get email() : AbstractControl{

   return this.loginForm.get('email');

  }


  get password() : AbstractControl{

   return this.loginForm.get('password');

  }

 get diagnostic() : string{

  return JSON.stringify(this.loginForm.value);
  }


}
