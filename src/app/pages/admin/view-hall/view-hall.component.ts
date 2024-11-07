import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HallComponent } from '../hall/hall/hall.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../service/dashboard.service';

interface Hall {
  hallName: string,
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
export class ViewHallComponent implements OnInit{
  displayedColumns: string[] = ['hallName', 'price', 'chairs', 'tables', 'edit','delete'];
  dataSource: MatTableDataSource<Hall>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService,private toastr: ToastrService,private dashboardService: DashboardService){
    // const halls=[
    //   {name:"abc",price:"200",chairs:"4",tables:"3"},
      
      
    // ];
    const halls:any[] | undefined = [];
    this.dataSource = new MatTableDataSource(halls);
  

  }
  
  ngOnInit() {
    this.loadHall();
  }
  async loadHall() {
    this.dashboardService.getAllHalls().subscribe(response =>{
      console.log(response)
      if (response != null) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
        
    })
  }

  addHall(){
    this.modalService.show<Hall>(HallComponent,{
      title:"Create Hall"
    
    });
  }

  deleteHall(id:any){
    if(window.confirm("Are you sure?")){
      this.dashboardService.deleteHalls(id).subscribe(response =>{
        if(response==true){
          window.location.reload();
          this.toastr.success("Successfully deleted","Success!");
        }
      },(error)=>{
        console.log(error.error);
          this.toastr.error('Please fill all the fields carefully','Error');
          
      })
    }
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
