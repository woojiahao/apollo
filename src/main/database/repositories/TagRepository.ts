import { EntityRepository, IsNull, Repository } from "typeorm";
import Tag from "../entities/Tag";

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  getAvailable(): Promise<Tag[]> {
    return this.find({
      where: {
        deletedOn: IsNull()
      }
    })
  }

  async createIfNotExists(tagName: string): Promise<Tag> {
    let tag = await this.findOne({ where: { tagName: tagName } })

    if (!tag) {
      // Tag does not exist in DB yet
      tag = new Tag()
      tag.tagName = tagName
      tag.feeds = []
      tag = await this.save(tag)
    }

    return tag
  }
}
