import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstant } from '@constants/app.constant';
import {map} from 'rxjs/operators';

@Injectable()
export class RemoteService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * HTTPリクエストを発行
   * @param action アクション名
   * @param data パラメタ
   * @return Promise
   */
  request(action: string, data: any = {}): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=utf-8',
    });

    return this.http.post(
      AppConstant.apiRoot,
      {
        action: action,
        ...data,
      },
      {
        headers: headers,
        observe: 'response',
      }
    ).pipe(
      map(res => res.body),
    ).toPromise();
  }
}
