import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { Tag } from "./Tag";

// TODO: Maybe keep track of the base URL given? To prevent adding the same feed again and again
@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  public feedId: number

  @Column({ nullable: false })
  public feedTitle: string

  @Column({ nullable: false })
  public feedDescription: string

  /// Link provided by the server
  @Column({ nullable: false })
  public feedUrl: string

  @Column({ nullable: true })
  public lastUpdate: Date | null

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @ManyToOne(() => Tag, tag => tag.feeds)
  public tag: Tag

  @OneToMany(() => Article, article => article.feed)
  public articles: Article[]
}