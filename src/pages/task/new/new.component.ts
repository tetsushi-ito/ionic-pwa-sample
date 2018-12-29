import { Component } from '@angular/core';
import { LoadingController, ViewController } from 'ionic-angular';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'page-new',
  templateUrl: 'new.component.html',
})
export class NewPageComponent {

  title = '';
  description = '';

  constructor(
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private taskService: TaskService,
  ) {}

  get isValid(): boolean {
    if (this.title.trim().length === 0) {
      return false;
    }

    if (this.description.trim().length === 0) {
      return false;
    }

    return true;
  }

  onBackButtonClicked() {
    this.dismissView();
  }

  onFormSubmitted() {
    if (!this.isValid) { return; }

    const loading = this.loadingCtrl.create({
      content: 'タスクを作成中...',
    });

    loading.present();

    this.taskService.createTask(this.title, this.description).then(() => {
      loading.dismiss();
      this.dismissView();
    }, () => {
      loading.dismiss();
    });
  }

  private dismissView() {
    this.viewCtrl.dismiss(null, null, { animation: 'md-transition' });
  }
}
