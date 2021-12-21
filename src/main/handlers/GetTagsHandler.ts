import { getCustomRepository } from "typeorm";
import TagRepository from "../database/repositories/TagRepository";
import Handler from "./Handler";

export default class GetTagsHandler implements Handler<string[]> {
  async handle() {
    const tags = await getCustomRepository(TagRepository).getAvailable()
    return tags.map(t => t.name)
  }
}