import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }


  login(){
    if(this.loginForm.invalid)
      return
    this.http.get<any>("http://localhost:3000/registerUsers")
    .subscribe(res => {
      const user = res.find((a:any)=>{
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
      })
      if(user){
        alert("You have successfully logged in!")
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
      else{
        alert("User not found!");
      }
    })
  }

}
