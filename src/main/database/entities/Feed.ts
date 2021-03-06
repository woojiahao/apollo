import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Article from "./Article";
import Tag from "./Tag";

// TODO: Maybe keep track of the base URL given? To prevent adding the same feed again and again
@Entity()
export default class Feed {
  @PrimaryGeneratedColumn()
  public id: number

  /// Original RSS link provided by user
  @Column('text', { nullable: false, unique: true })
  public rssUrl: string

  @Column('text', { nullable: false })
  public title: string

  @Column('text', { nullable: false })
  public description: string

  /// Link provided by the server
  @Column('text', { nullable: false })
  public url: string

  @Column('timestamp', { nullable: true })
  public lastUpdate: Date | null

  @CreateDateColumn({ update: false })
  public readonly addedOn: Date

  @DeleteDateColumn()
  public deletedOn: Date | null

  @ManyToOne(() => Tag, tag => tag.feeds)
  public tag: Tag

  @OneToMany(() => Article, article => article.feed, { cascade: true })
  public articles: Article[]
}