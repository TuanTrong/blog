import { Category } from "../models/category";

export function toTree(categories: Category[]) {
  let tree = Object.create(null);

  categories.forEach(
    category =>
      (tree[category._id!] = {
        id: category._id,
        value: category.title,
        nodes: []
      })
  );

  let dataTree: any[] = [];

  categories.forEach(category => {
    if (category.parentId !== "0") {
      tree[category.parentId!].nodes.push(tree[category._id!]);
    } else dataTree.push(tree[category._id!]);
  });

  return dataTree;
}

export function findParentCategory(
  categories: Category[],
  parentId: string
): string {
  if (parentId === "0") return "";

  let parentCategory = categories.find(category => category._id === parentId);

  if (parentCategory && parentCategory.title) return parentCategory.title;

  return "";
}
