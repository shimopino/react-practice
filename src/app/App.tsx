// import { Clock } from "./Clock.js";
import { Page } from "./Page.js";

const Clock = {
  // サーバー側から見たクライアントコンポーネントであることを示す
  $$typeof: Symbol.for("react.module.reference"),
  // src/app/Clock.tsxというモジュールからClockという名前でエクスポートされているオブジェクト
  filepath: "src/app/Clock.tsx",
  name: "Clock",
} as unknown as React.ComponentType;

export const App = () => {
  return (
    <Page>
      <p>Hello, world!</p>
      <Clock />
    </Page>
  );
};
