export default class LoadFeedError extends Error {
  readonly baseError: Error

  constructor(baseError: Error) {
    super('Failed to load feed. Ensure your URL is a valid RSS URL')
    this.baseError = baseError
  }
}:w
