import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HallComponent } from '../hall/hall/hall.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';
import { MealComponent } from '../meal/meal.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../service/dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableExporterModule } from 'mat-table-exporter';

interface Meal {
  id:number,
  foodName: string,
  price: string,
  description: string,
  img:string
  
}

@Component({
  selector: 'app-view-meal',
  standalone: true,
  imports: [SideNavComponent,ModalModule, MatPaginator, MatSort,MatTableModule,
    MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule,MatTableExporterModule,MatIconModule],
  templateUrl: './view-meal.component.html',
  styleUrl: './view-meal.component.css'
})
export class ViewMealComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['foodName', 'price',  'description', 'edit','delete'];
  dataSource: MatTableDataSource<Meal>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService,private toastr: ToastrService,private dashboardService: DashboardService){
    // const meals=[
    //   {name:"abc",price:"200",description:"medium"},
    
      
    // ];
    const meals:any[] | undefined = [];
    this.dataSource = new MatTableDataSource(meals);

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;   
  }
  ngOnInit(): void {

    this.loadHall()
  }
  async loadHall() {
    this.dashboardService.getAllMeals().subscribe(response =>{
      console.log(response)
      if (response != null) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
        
    })
  }
  applyFilter(event: any) {
    const filterValue=event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMeal() {
    this.modalService.show<Meal>(MealComponent, {
      title: "Add Meal"

    });
  }
  deleteMeal(id:any){
    if(window.confirm("Are you sure?")){
      this.dashboardService.deleteMeals(id).subscribe(response =>{
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

  editMeal(meals: Meal) {
    this.modalService.show<Meal>(MealComponent, {
      title: "Update Meal",
      model: meals
    });
  }

}
