import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  public bookmarkId: number

  @Column({ default: false, nullable: false })
  public isRead: boolean

  @CreateDateColumn()
  public readonly addedOn: Date

  @OneToOne(() => Article, article => article.bookmark)
  @JoinColumn()
  public article: Article
}