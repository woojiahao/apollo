import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Feed from "./Feed"

// TODO: Soft delete tag when no more feeds under it
@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  public tagId: number

  @Column('text', { nullable: false, unique: true })
  public tagName: string

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @DeleteDateColumn()
  public deletedOn: Date | null

  @OneToMany(() => Feed, feed => feed.tag)
  public feeds: Feed[]
}