import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bookmark } from "./Bookmark";
import { Feed } from "./Feed";

@Entity()
export class Article {
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

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @DeleteDateColumn()
  public deletedOn: Date | null

  @ManyToOne(() => Feed, feed => feed.articles)
  public feed: Feed

  @OneToOne(() => Bookmark, bookmark => bookmark.article)
  public bookmark: Bookmark
}