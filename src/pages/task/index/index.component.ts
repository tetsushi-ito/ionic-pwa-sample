import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';
import { NewPageComponent } from '../new/new.component';
import { ShowPageComponent } from '../show/show.component';

@Component({
  selector: 'page-index',
  templateUrl: 'index.component.html',
})
export class IndexPageComponent {

  tasks: Task[] = [];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private taskService: TaskService,
  ) {}

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'タスクを読み込み中...',
    });

    loading.present();

    this.loadData().then(() => {
      loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }

  onAddButtonClicked() {
    this.navCtrl.push(NewPageComponent, {}, { animation: 'md-transition' });
  }

  onTaskClicked(task: Task) {
    this.navCtrl.push(ShowPageComponent, { task: task });
  }

  onRefresherActivated(event: any) {
    this.loadData().then(() => {
      event.complete();
    }, () => {
      event.complete();
    });
  }

  private loadData(): Promise<any> {
    return this.taskService.loadTasks().then(tasks => {
      this.tasks = tasks;
    });
  }
}
