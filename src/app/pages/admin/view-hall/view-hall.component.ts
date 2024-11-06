import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HallComponent } from '../hall/hall/hall.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';

interface Hall {
  name: string,
  price: string,
  chairs: string,
  tables: string
}

@Component({
  selector: 'app-view-hall',
  standalone: true,
  imports: [SideNavComponent,ModalModule, MatPaginator, MatSort,MatTableModule,
    MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule],
  templateUrl: './view-hall.component.html',
  styleUrl: './view-hall.component.css'
})
export class ViewHallComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'chairs', 'tables', 'edit','delete'];
  dataSource: MatTableDataSource<Hall>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService){
    const halls=[
      {name:"abc",price:"200",chairs:"4",tables:"3"},
      {name:"abc",price:"20120",chairs:"4100",tables:"50"},
      {name:"abc",price:"300000",chairs:"100",tables:"30"},
      {name:"abc",price:"2012220",chairs:"500",tables:"100"},
      {name:"abc",price:"200",chairs:"4",tables:"3"},
      {name:"abc",price:"20120",chairs:"4100",tables:"50"},
      {name:"abc",price:"300000",chairs:"100",tables:"30"},
      {name:"abc",price:"2012220",chairs:"500",tables:"100"},
      {name:"abc",price:"200",chairs:"4",tables:"3"},
      {name:"abc",price:"20120",chairs:"4100",tables:"50"},
      {name:"abc",price:"300000",chairs:"100",tables:"30"},
      {name:"abc",price:"2012220",chairs:"500",tables:"100"},
      {name:"abc",price:"200",chairs:"4",tables:"3"},
      {name:"abc",price:"20120",chairs:"4100",tables:"50"},
      {name:"abc",price:"300000",chairs:"100",tables:"30"},
      {name:"abc",price:"2012220",chairs:"500",tables:"100"},
      {name:"abc",price:"200",chairs:"4",tables:"3"},
      {name:"abc",price:"20120",chairs:"4100",tables:"50"},
      {name:"abc",price:"300000",chairs:"100",tables:"30"},
      {name:"abc",price:"2012220",chairs:"500",tables:"100"}
      
    ];
    this.dataSource = new MatTableDataSource(halls);
  

  }
  ngAfterViewInit(): void {
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;   
  }
  ngOnInit() {
  }

  addHall(){
    this.modalService.show<Hall>(HallComponent,{
      title:"Create Hall"
    
    });
  }

  applyFilter(event: any) {
    const filterValue=event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editHall(hall:Hall){
    this.modalService.show<Hall>(HallComponent,{
      title:"Update Hall",
      model:hall
    });
  }
  
  
}
