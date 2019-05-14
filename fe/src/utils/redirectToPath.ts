import { RouteComponentProps } from "react-router";

export function redirectToPath(
  component: React.Component<RouteComponentProps>,
  path: string
): void {
  return component.props.history.push(path);
}
