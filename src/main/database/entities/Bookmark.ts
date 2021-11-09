import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Article from "./Article";

@Entity()
export default class Bookmark {
  @PrimaryGeneratedColumn()
  public bookmarkId: number

  @Column({ default: false, nullable: false })
  public isRead: boolean

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @DeleteDateColumn()
  public deletedOn: Date | null

  @OneToOne(() => Article, article => article.bookmark)
  @JoinColumn()
  public article: Article
}