export default class DatabseError extends Error {
  readonly operation: string

  constructor(operation: string, message: string) {
    super(message)
    this.operation = operation
  }

  print(): string {
    return `Database operation (${this.operation}) encountered the following error :: ${this.message}`
  }
}