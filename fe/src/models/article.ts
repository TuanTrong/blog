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
  title: string;
  image: string;
  shortContent: string;
  detailContent: string;
  tags: string[];
  author: string;
  publishStatus: PublishStatus;
  visibleStatus: VisibleStatus;
  viewCount: number;

  categoryId: string;
  createDate: Date;

  constructor(
    title: string,
    image: string,
    shortContent: string,
    detailContent: string,
    tags: string[],
    author: string,
    publishStatus: PublishStatus,
    visibleStatus: VisibleStatus,
    viewCount: number,
    categoryId: string
  ) {
    this.title = title;
    this.image = image;
    this.shortContent = shortContent;
    this.detailContent = detailContent;
    this.tags = tags;
    this.author = author;
    this.publishStatus = publishStatus;
    this.visibleStatus = visibleStatus;
    this.viewCount = viewCount;

    this.categoryId = categoryId;
    this.createDate = new Date();
  }
}
