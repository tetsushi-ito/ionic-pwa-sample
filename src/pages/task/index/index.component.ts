import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Task } from '@models/task.model';
import { ShowPageComponent } from '../show/show.component';

@Component({
  selector: 'page-index',
  templateUrl: 'index.component.html',
})
export class IndexPageComponent {

  tasks: Task[] = [];

  constructor(
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.tasks = [
      new Task(1, 'JavaScript勉強', 'letとconstの違いを学ぶ'),
      new Task(2, 'TypeScript勉強', 'interfaceの定義方法を学ぶ'),
      new Task(3, 'Ruby勉強', 'mapとselectを使えるようになる'),
      new Task(4, 'PHP勉強', 'WP_Queryを使いこなせるようにする'),
      new Task(5, 'React勉強', 'stateとpropsの違いを理解する'),
      new Task(6, 'Angular勉強', 'NgModuleを設定する'),
    ];
  }

  onTaskClicked(task: Task) {
    this.navCtrl.push(ShowPageComponent, { task: task });
  }
}
