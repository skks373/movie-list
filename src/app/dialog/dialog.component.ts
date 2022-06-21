import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  movieForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder: FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      movieName : ['',Validators.required],
      category : ['',Validators.required],
      date : ['',Validators.required],
      actors : ['',Validators.required],
      reviews : ['',Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.movieForm.controls['movieName'].setValue(this.editData.movieName);
      this.movieForm.controls['category'].setValue(this.editData.category);
      this.movieForm.controls['date'].setValue(this.editData.date);
      this.movieForm.controls['actors'].setValue(this.editData.actors);
      this.movieForm.controls['reviews'].setValue(this.editData.reviews);
    }
  }

  addMovie(){
    if(!this.editData){
      if(this.movieForm.valid){
        this.api.postMovie(this.movieForm.value)
        .subscribe({
          next:(res)=>{
            alert("Movie added")
            this.movieForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error, coudln't add the movie")
          }
        })
      }
    }else{
      this.updateMovie()
    }
  }

  updateMovie(){
    this.api.putMovie(this.movieForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Movie updated");
        this.movieForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error updating the data!")
      }
    })
  }
}
