import React from "react";
import Axios from "axios";
import { Article } from "../../models/article";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { RouteComponentProps } from "react-router-dom";
import { ArticleList } from "./articleList";

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
    await this.loadArticlesByCategory();
  }

  async componentWillReceiveProps(
    nextProps: RouteComponentProps<IArticleListByCategoryProps>
  ) {
    const isNewCategory =
      this.props.match.params.categoryId !== nextProps.match.params.categoryId;

    if (isNewCategory) {
      this.props.match.params.categoryId = nextProps.match.params.categoryId;
      await this.loadArticlesByCategory();
    }
  }

  render() {
    return (
      <div className="col-md-9">
        {ArticleList.renderArticleList("Articles by category", this.articles)}
      </div>
    );
  }

  private async loadArticlesByCategory() {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_URL_CATEGORY}/${
        this.props.match.params.categoryId
      }/articles`
    );
    this.articles = result.data;
  }
}
