export enum PublishStatus {
  Draft = "Draft",
  Published = "Published",
  Deleted = "Deleted"
}

export enum VisibleStatus {
  Normal = "Normal",
  Hot = "Hot",
  Docked = "Docked"
}

export class Article {
  _id: string | undefined;
  title: string | undefined;
  image: string | undefined;
  shortContent: string | undefined;
  detailContent: string | undefined;
  tags: string[] | undefined;
  author: string | undefined;
  publishStatus: PublishStatus | undefined;
  visibleStatus: VisibleStatus | undefined;
  viewCount: number | undefined;

  categoryId: string | undefined;
  createDate: Date | undefined;
}
