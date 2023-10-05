import { PropsWithChildren } from "react";

export function MainLayout(props: PropsWithChildren) {
  return <div id="__layout">{props.children}</div>;
}
