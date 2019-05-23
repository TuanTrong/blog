import React from "react";
import axios from "../../utils/axios";
import { Article } from "../../models/article";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { RouteComponentProps } from "react-router-dom";
import { ArticleList } from "./articleList";
import { Col } from "react-bootstrap";

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
      <Col md={{ span: 9 }}>
        {ArticleList.renderArticleList("Articles by category", this.articles)}
      </Col>
    );
  }

  private async loadArticlesByCategory() {
    let result = await axios.get(
      `${process.env.REACT_APP_API_URL_CATEGORY}/${
        this.props.match.params.categoryId
      }/articles`
    );
    this.articles = result.data;
  }
}
