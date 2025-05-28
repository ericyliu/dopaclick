import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "DopaClick" },
    { name: "description", content: "Welcome to DopaClick!" },
  ];
};

export default function Index() {
  return <div></div>;
}
