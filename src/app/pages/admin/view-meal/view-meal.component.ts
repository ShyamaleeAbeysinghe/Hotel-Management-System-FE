import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ModalModule, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HallComponent } from '../hall/hall/hall.component';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';import { MatInputModule } from '@angular/material/input';
import { MealComponent } from '../meal/meal.component';

interface Meal {
  name: string,
  price: string,
  description: string,
  
}

@Component({
  selector: 'app-view-meal',
  standalone: true,
  imports: [SideNavComponent,ModalModule, MatPaginator, MatSort,MatTableModule,
    MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule],
  templateUrl: './view-meal.component.html',
  styleUrl: './view-meal.component.css'
})
export class ViewMealComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['name', 'price',  'description', 'edit','delete'];
  dataSource: MatTableDataSource<Meal>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private modalService: ModalService){
    const meals=[
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"},
      {name:"abc",price:"200",description:"medium"}

      
      
    ];
    this.dataSource = new MatTableDataSource(meals);
  

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;   
  }
  ngOnInit(): void {
    
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

  editMeal(meals: Meal) {
    this.modalService.show<Meal>(MealComponent, {
      title: "Update Meal",
      model: meals
    });
  }

}
