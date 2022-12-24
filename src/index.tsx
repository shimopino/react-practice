// @ts-expect-error react-server-dom-webpackの型定義が存在していない
import rsdws from "react-server-dom-webpack/server";
const { renderToPipeableStream } = rsdws;

import { App } from "./app/App.js";

const bundlerConfig = {
  // filenameとnameをキーとする辞書オブジェクト
  "src/app/Clock.tsx": {
    Clock: {
      // webpackのモジュールID
      id: "Clock.tsx",
      // そのモジュールからexportされている名前
      name: "Clock",
      // そのモジュールをrequireするのに必要なチャンクのIDの一覧
      chunks: ["pika", "chu"],
    },
  },
};

renderToPipeableStream(<App />, bundlerConfig).pipe(process.stdout);
