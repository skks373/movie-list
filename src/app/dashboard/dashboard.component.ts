import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  title = 'proiect';
  displayedColumns: string[] = ['movieName', 'category', 'date', 'actors', 'reviews', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllMovies();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllMovies();
      }
    })
  }
  getAllMovies(){
    this.api.getMovie()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the data!")
      }
    })
  }
  editMovie(row:any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row

    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllMovies();
      }
    })
  }
  deleteMovie(id:number){
    this.api.deleteMovie(id)
    .subscribe({
      next:(res)=>{
        alert('Movie deleted successfully')
        this.getAllMovies();
      },
      error:()=>{
        alert("Error while deleting the movie.")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
