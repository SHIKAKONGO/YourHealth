import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit , AfterViewInit , OnDestroy {

  displayedColumns = ['date' , 'name' , 'calories' , 'duration' , 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription: Subscription;

  @ViewChild(MatSort , {static: false}) sort: MatSort;
  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

  constructor(private trainingServcie: TrainingService) { }


  ngOnInit() {
    this.exChangedSubscription =  this.trainingServcie.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingServcie.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toString();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

}
