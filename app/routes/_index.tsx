import type { MetaFunction } from "@remix-run/node";
import { Game } from "~/components/Game";

export const meta: MetaFunction = () => {
  return [
    { title: "DopaClick" },
    { name: "description", content: "Welcome to DopaClick!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Game />
    </div>
  );
}
