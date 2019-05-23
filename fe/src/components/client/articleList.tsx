import React from "react";
import axios from "../../utils/axios";
import { ArticleComponent } from "./article";
import { Article, VisibleStatus, PublishStatus } from "../../models/article";
import {
  sortArticle,
  getArticlesByVisibleStatus,
  getArticlesByPublishedStatus
} from "../../utils/articleUtils";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { CardColumns } from "react-bootstrap";

@observer
export class ArticleList extends React.Component {
  @observable
  articles: Article[] = [];

  async componentDidMount() {
    let result = await axios.get(`${process.env.REACT_APP_API_URL_ARTICLE}`);

    this.articles = result.data;
  }

  render() {
    if (!this.articles.length) return <div>Loading articles.....</div>;

    const publishedArticles = getArticlesByPublishedStatus(
      this.articles,
      PublishStatus.Published
    );
    const dockedArticles = getArticlesByVisibleStatus(
      publishedArticles,
      VisibleStatus.Docked
    );
    const hotArticles = getArticlesByVisibleStatus(
      publishedArticles,
      VisibleStatus.Hot
    );
    const mostViewedArticles = sortArticle(
      publishedArticles,
      article => article.viewCount
    );

    return (
      <div className="col-md-9">
        <h3 className="my-4">{process.env.REACT_APP_HEADER_TITLE}</h3>
        {ArticleList.renderArticleList("Docked", dockedArticles)}
        {ArticleList.renderArticleList("Hot", hotArticles)}
        {ArticleList.renderArticleList("Most Viewed", mostViewedArticles)}
      </div>
    );
  }

  public static renderArticleList(
    listTitle: string,
    articles: Article[]
  ): JSX.Element | undefined {
    if (!articles.length) return undefined;

    return (
      <div>
        <h5 className="my-4">{listTitle}</h5>
        <CardColumns>
          {articles.map((a: Article) => (
            <ArticleComponent key={a._id} article={a} />
          ))}
        </CardColumns>
      </div>
    );
  }
}
