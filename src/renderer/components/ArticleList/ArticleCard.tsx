import React from "react";
import { MdCheck, MdOutlineBookmark } from "react-icons/md";
import { SimpleArticle } from "../../../main/database/mappers/ArticleMapper";

interface ArticleCardProps {
  article: SimpleArticle
  onSelectArticle: (id: number) => void
}

export default class ArticleCard extends React.Component<ArticleCardProps> {
  render() {
    return (
      <div className="mb-4 cursor-pointer" onClick={() => this.props.onSelectArticle(this.props.article.id)}>
        <div className="flex items-center justify-between">
          <h2 className={this.props.article.isRead ? 'text-subtitle' : 'text-primary'}>{this.props.article.title}</h2>
          <div className="flex">
            <MdOutlineBookmark className="mx-4 hover:fill-current hover:text-subtitle" />
            <MdCheck className="hover:fill-current hover:text-subtitle" />
          </div>
        </div>

        {this.props.article.description &&
          <p className={this.props.article.isRead ? 'text-faint' : 'text-subtitle'}>{this.props.article.description}</p>}
      </div>
    )
  }
}