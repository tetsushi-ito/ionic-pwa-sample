import { Component } from '@angular/core';
import { ViewController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'page-show',
  templateUrl: 'show.component.html',
})
export class ShowPageComponent {

  task: Task = this.navParams.get('task');

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private taskService: TaskService,
  ) {}

  onBackButtonClicked() {
    this.viewCtrl.dismiss();
  }

  onMoreButtonClicked() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'タスクの操作',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            const loading = this.loadingCtrl.create({
              content: 'タスクを削除中...',
            });

            loading.present();

            this.taskService.removeTask(this.task.id).then(() => {
              loading.dismiss();
              this.viewCtrl.dismiss();
            }, () => {
              loading.dismiss();
            });
          }
        },
        {
          text: 'キャンセル',
        },
      ],
    });

    actionSheet.present();
  }
}
