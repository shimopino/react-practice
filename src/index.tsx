// @ts-expect-error react-server-dom-webpackの型定義が存在していない
import rsdws from "react-server-dom-webpack/server";
const { renderToPipeableStream } = rsdws;

import { App } from "./app/App.js";

renderToPipeableStream(<App />).pipe(process.stdout);
