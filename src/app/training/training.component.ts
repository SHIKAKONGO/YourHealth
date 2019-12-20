import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit , OnDestroy {

  ongoingTraining = false;
  sbuscription: Subscription;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
   this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
     if (exercise) {
      this.ongoingTraining = true;
     } else {
       this.ongoingTraining = false;
     }
   });
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
