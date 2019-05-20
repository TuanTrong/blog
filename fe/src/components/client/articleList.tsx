import React from "react";
import Axios from "axios";
import { ArticleComponent } from "./article";
import { Article, VisibleStatus, PublishStatus } from "../../models/article";
import {
  sortArticle,
  getArticlesByVisibleStatus,
  getArticlesByPublishedStatus
} from "../../utils/articleUtils";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export class ArticleList extends React.Component {
  @observable
  articles: Article[] = [];

  async componentDidMount() {
    let result = await Axios.get(`${process.env.REACT_APP_API_URL_ARTICLE}`);

    this.articles = result.data;
  }

  render() {
    if (!this.articles.length) return <div>No articles available.</div>;

    const publishedArticles = getArticlesByPublishedStatus(
      this.articles,
      PublishStatus.Published
    );
    const articlesSortedByDate = sortArticle(
      publishedArticles,
      article => article.createDate
    );
    const dockedArticles = getArticlesByVisibleStatus(
      articlesSortedByDate,
      VisibleStatus.Docked
    );
    const hotArticles = getArticlesByVisibleStatus(
      articlesSortedByDate,
      VisibleStatus.Hot
    );
    const mostViewedArticles = sortArticle(
      publishedArticles,
      article => article.viewCount
    );

    return (
      <div className="col-md-9">
        <h3 className="my-4">{process.env.REACT_APP_HEADER_TITLE}</h3>
        {this.renderArticleList("Docked", dockedArticles)}
        {this.renderArticleList("Hot", hotArticles)}
        {this.renderArticleList("Most Viewed", mostViewedArticles)}
      </div>
    );
  }

  renderArticleList(
    listTitle: string,
    articles: Article[]
  ): JSX.Element | undefined {
    if (!articles.length) return undefined;

    return (
      <div>
        <h5 className="my-4">{listTitle}</h5>
        <div className="card-columns">
          {articles.map((a: Article) => (
            <ArticleComponent key={a._id} article={a} />
          ))}
        </div>
      </div>
    );
  }
}
