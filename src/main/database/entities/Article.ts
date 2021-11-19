import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Feed from "./Feed";

@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  public articleId: number

  @Column({ nullable: false })
  public articleTitle: string

  @Column({ nullable: true })
  public articleDescription: string | null

  @Column({ nullable: true })
  public articleContent: string | null

  @Column({ nullable: true })
  public articleLink: string | null

  @Column({ nullable: true })
  public publishedDate: Date | null

  @Column({ nullable: false, default: false })
  public isRead: boolean

  @Column({ nullable: false, default: false })
  public isBookmark: boolean

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @DeleteDateColumn()
  public deletedOn: Date | null

  @ManyToOne(() => Feed, feed => feed.articles)
  public feed: Feed
}