import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bookmark } from "./Bookmark";
import { Feed } from "./Feed";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  public articleId: number

  @Column({ nullable: false })
  public articleTitle: string

  @Column()
  public articleDescription: string | null

  @Column()
  public articleContent: string | null

  @Column()
  public articleLink: string | null

  @Column()
  public publishedDate: Date | null

  @CreateDateColumn()
  public readonly addedOn: Date

  @ManyToOne(() => Feed, feed => feed.articles)
  public feed: Feed

  @OneToOne(() => Bookmark, bookmark => bookmark.article)
  public bookmark: Bookmark
}