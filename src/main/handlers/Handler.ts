export default interface Handler<R> {
  handle(...args: any[]): Promise<R>
}