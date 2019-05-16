export class Category {
  _id: string | undefined;
  title: string | undefined;
  parentId: string | undefined;

  value: string | undefined;
  nodes: Category[] | undefined;
}
