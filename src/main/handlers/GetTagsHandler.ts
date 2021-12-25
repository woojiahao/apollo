import { getCustomRepository } from "typeorm";
import TagRepository from "../database/repositories/TagRepository";
import Handler from "./Handler";

export default class GetTagsHandler extends Handler<string[]> {
  constructor() {
    super('get-tags')
  }

  async handle() {
    const tags = await getCustomRepository(TagRepository).getAvailable()
    return tags.map(t => t.name)
  }
}