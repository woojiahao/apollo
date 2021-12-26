export default abstract class Handler<R> {
  readonly key: string

  constructor(key: string) {
    this.key = key
  }

  abstract handle(...args: any[]): Promise<R>
}
