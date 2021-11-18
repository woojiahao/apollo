import DatabaseError from "./DatabaseError";

export default class FeedExistsError extends DatabaseError {
  constructor() {
    super("Add Feed", "Feed exists already")
  }
}