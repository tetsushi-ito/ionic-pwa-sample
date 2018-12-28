import { Component } from '@angular/core';
import { IndexPageComponent as TaskIndexPageComponent } from '@pages/task/index/index.component';

@Component({
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage: any = TaskIndexPageComponent;
}

