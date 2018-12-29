export class Task {

  constructor(
    public id: string,
    public title: string,
    public description: string,
  ) {}

  /**
   * JSONをパースしてインスタンス化
   * @param data JSONデータ
   * @return Taskのインスタンス
   */
  public static parseJson(data: any): Task {
    return new Task(
      data.id,
      data.title,
      data.description,
    );
  }
}
