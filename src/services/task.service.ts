import { Injectable } from '@angular/core';
import { Task } from '@models/task.model';
import { RemoteService } from '@services/remote.service';

@Injectable()
export class TaskService {

  constructor(
    private remoteService: RemoteService,
  ) { }

  /**
   * タスクの一括読み込み
   * @return タスクの配列
   */
  loadTasks(): Promise<Task[]> {
    return this.remoteService.request(
      'LOAD_TASKS'
    ).then(records => records.map(record => Task.parseJson(record)));
  }

  /**
   * タスクの追加
   * @params title タイトル
   * @params description 備考
   * @return Promise
   */
  createTask(title: string, description: string): Promise<any> {
    return this.remoteService.request(
      'CREATE_TASK',
      {
        title: title,
        description: description,
      }
    );
  }

  /**
   * タスクを削除
   * @params id ID
   * @return Promise
   */
  removeTask(id: string): Promise<any> {
    return this.remoteService.request(
      'REMOVE_TASK',
      {
        id: id,
      }
    );
  }
}
