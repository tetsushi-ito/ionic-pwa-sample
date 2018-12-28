import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Task } from '@models/task.model';

@Component({
  selector: 'page-show',
  templateUrl: 'show.component.html',
})
export class ShowPageComponent {

  task: Task = this.navParams.get('task');

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
  ) {}

}
