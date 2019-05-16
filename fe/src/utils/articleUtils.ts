import { Article } from "../models/article";

export function sortArticleByCreatedDate(articles: Article[]): Article[] {
  return articles.slice().sort((a1: Article, a2: Article) => {
    if (a2.createDate! > a1.createDate!) {
      return 1;
    }

    if (a2.createDate! < a1.createDate!) {
      return -1;
    }

    return 0;
  });
}
