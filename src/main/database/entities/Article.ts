import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Feed from "./Feed";

@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  public articleId: number

  @Column('text', { nullable: false })
  public articleTitle: string

  @Column('text', { nullable: true })
  public articleDescription: string | null

  @Column('text', { nullable: true })
  public articleContent: string | null

  @Column('text', { nullable: true })
  public articleLink: string | null

  @Column('timestamp', { nullable: true })
  public publishedDate: Date | null

  @Column('boolean', { nullable: false, default: false })
  public isRead: boolean

  @Column('boolean', { nullable: false, default: false })
  public isBookmark: boolean

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @DeleteDateColumn()
  public deletedOn: Date | null

  @ManyToOne(() => Feed, feed => feed.articles)
  public feed: Feed
}