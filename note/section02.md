# 環境準備

## VScode

- js ファイルを編集するには JSX 用に右下の言語を React 用の JS に変更する。
- 上記の変更を反映させるためにはユーザー設定の Open Settings（JSON）を選択
  - 以下を追加する
  - "file.associations": {"\*.js": "javascriptreact"}
- フォーマット設定を行う。
  - 使用する拡張機能は`prettier`
  - "editor.defaultFormatter": "esbenp.prettier-vscode",
  - "editor.formatOnSave": true,
  - "prettier.semi": false,
  - "prettier.printWidth": 99,
  - "editor.tabSize": 2,
  - "prettier.arrowParens": "avoid",
  - "prettier.trailingComma": "none"

## node

今回は Docker で環境構築を実施している。

node package manager(npm)を使用することで react の読み込みが行える。
今回はプロジェクトを初期化するため`npm init -y`を使用する。

また React で使用するパッケージとして`react`と`react-dom`を使用する

## 中身

では HTML を作成する。まずは簡単なガワを構築する。
body では React を読み込む。

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="Main.js"></script>
  </body>
</html>
```

次に React の中身を実装する。
簡単にテキストを表示する飲みにしておく。

```js
// npm installで読み込んだ内容を指定する
import React from "react"
import ReactDOM from "react-dom"

funcrion ExampleComponent() {
  return (
    <div>
      <h1>This is out app!</h1>
      <p>The sky is blue.</p>
    </div>
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))

// 以下を設定することで非同期に画面更新が行われる
if (module.hot) {
  module.hot.accept()
}
```

次に指定している JSX を通常の Javascript に変換するための機能を用意する。
通常は`webpack`を使用して React を Javascript に変換する。

まずは必要なパッケージを用意する。

```python
npm install webpack webpack-cli webpack-dev-server
```

その後に webpack の設定を記述する。

```js
const path = require("path")

module.exports = {
  entry: "./app/Main.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundled.js"
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "app"),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
}
```

上記を見てわかるように JSX を使用して記述している`Main.js`を`bundle.js`に変換しており、HTML 側でもこのファイルを読み込むように変換する。

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

なおこの`bundle.js`は実際に生成されるわけではなくコンピューター内部で作成されるファイルとなっている。
あとは実行環境の`babel`パッケージを読み込む

```python
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader
```

最後に`package.json`の`script`タグに`dev: webpack-dev-server`を追加して、`npm run dev`を実行すればポート 3000 でプロジェクトが立ち上がることが確認できる。

## docker & その他

今回は Docker で環境構築をしているため設定が少々異なる。
以下のように起動するサーバの設定を全 IP に指定して置かなければ、ホスト側からアクセスできない。

```js
devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "app"),
    hot: true,
    // 以下の部分を追加する必要がある。
    host: "0.0.0.0"
  }
```
