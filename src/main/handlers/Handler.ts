import { getConnection, getCustomRepository } from "typeorm";
import ArticleRepository from "../database/repositories/ArticleRepository";
import FeedRepository from "../database/repositories/FeedRepository";
import TagRepository from "../database/repositories/TagRepository";

export default interface Handler<R> {
  handle(...args: any[]): Promise<R>
}