import { EntityRepository, IsNull, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  getAvailableTags() {
    return this.find({
      where: {
        deletedOn: IsNull()
      }
    })
  }
}
