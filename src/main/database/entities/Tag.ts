import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Feed } from "./Feed"

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  public tagId: number

  @Column({ nullable: false, unique: true })
  public tagName: string

  @CreateDateColumn()
  public readonly addedOn: Date

  @OneToMany(() => Feed, feed => feed.tag)
  public feeds: Feed[]
}