import { BaseModel } from "./base";

export class Category extends BaseModel {
  parentId: string | undefined;

  value: string | undefined;
  nodes: Category[] | undefined;
}
