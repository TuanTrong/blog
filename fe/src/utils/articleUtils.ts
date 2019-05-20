import { Article, VisibleStatus, PublishStatus } from "../models/article";

export function sortArticle(
  articles: Article[],
  valueGetter: (article: Article) => any
): Article[] {
  return articles.slice().sort((a1: Article, a2: Article) => {
    if (valueGetter(a2) > valueGetter(a1)) {
      return 1;
    }

    if (valueGetter(a2) < valueGetter(a1)) {
      return -1;
    }

    return 0;
  });
}

export function getArticlesByVisibleStatus(
  articles: Article[],
  visibleStatus: VisibleStatus
): Article[] {
  return articles.filter(article => article.visibleStatus === visibleStatus);
}

export function getArticlesByPublishedStatus(
  articles: Article[],
  publishedStatus: PublishStatus
): Article[] {
  return articles.filter(article => article.publishStatus === publishedStatus);
}
