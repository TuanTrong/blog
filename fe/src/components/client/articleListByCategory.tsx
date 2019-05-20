import React from "react";
import Axios from "axios";
import { ArticleComponent } from "./article";
import { Article } from "../../models/article";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { RouteComponentProps } from "react-router-dom";

export interface IArticleListByCategoryProps {
  categoryId: string;
}

@observer
export class ArticleListByCategory extends React.Component<
  RouteComponentProps<IArticleListByCategoryProps>
> {
  @observable
  articles: Article[] = [];

  async componentDidMount() {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_URL_CATEGORY}/${
        this.props.match.params.categoryId
      }/articles`
    );

    this.articles = result.data;
  }

  render() {
    return (
      <div className="col-md-9">
        <h5 className="my-4">Articles</h5>
        <div className="card-columns">
          {this.articles.map((a: Article) => (
            <ArticleComponent key={a._id} article={a} />
          ))}
        </div>
      </div>
    );
  }
}
