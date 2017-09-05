import { Component , OnInit } from '@angular/core'
import { FormControl , FormGroup , Validators} from '@angular/forms'
import { AuthService } from './auth.service';
import { Router } from '@angular/router'


@Component({
  templateUrl:'app/user/profile.component.html',
  styles:[`
  em {float:right ; color#E05C65; padding-left:10px;}
  .error input {background-color:red}
  `]
})
export class ProfileComponent implements OnInit {
       profileForm : FormGroup ;
       firstName: FormControl ; 
       lastName: FormControl ;

       constructor(private authService : AuthService, private router : Router){}

       ngOnInit(){
         console.log(this.authService.currentUser.firstName ,'this.authService.currentUser.firstName')
         
         this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required , Validators.pattern('[a-zA-Z.*]'));
         this.lastName  = new FormControl(this.authService.currentUser.lastName, Validators.required);
         this.profileForm = new FormGroup({
            firstName : this.firstName,
            lastName  : this.lastName
         })
        }
      
       saveProfile(formValues){
         console.log('this.profileForm.valid')
         console.log(this.profileForm.valid)
         if(this.profileForm.valid){
          this.authService.updateCurrentUser(formValues.firstName
                              ,formValues.lastName);
          this.router.navigate(['events']);
         }                              
       }

       cancel(){
         this.router.navigate(['events'])
       }
       validateLastName(){
         console.log('validateLastName')
        return this.lastName.invalid || this.lastName.touched

       }
       validateFirstName(){
        console.log('validateFirstName')
        return this.firstName.invalid || this.firstName.touched

       }
}