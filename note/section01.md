# 1

1. Reactとは？
2. Reactによって何が解決できる？

以下ではDOMとDataに焦点を当て、Reactが何をどのように解決しているのか見ていく。

## DOM

DOMを使ってVaniila JavaScriptで処理を記述する際の一番の課題は、DOMに特定の領域に従ってコードを記述する必要があるため、コードが乱雑に配置されてしまう可能性が高くなってしまう。

- [code](https://codepen.io/learnwebcode/pen/qBEKBwx?editors=1010)

## Data

Dataを使った手法では、レンダリングを行うようにしてすべてのUIをJavaScript上で行うことも可能であるが、UI部分が非常に複雑な構造になってしまい、またデータの一部を改変した場合、すべてのデータに関して再度レンダリングを行う必要があり非効率である。

- [code](https://codepen.io/learnwebcode/pen/XWJYWwg?editors=1010)

## React

Reactは2番目のDataを使った手法であり、Reactを使用することでDOMを介在させることなく、またデータが改変された部分にのみレンダリングを行うことが可能となる。

codepen上でreactを使うには、JSページの設定で外部パッケージをCDNで読み込むように指定する。必要なのは`react`と`react-DOM`になる。

- [code](https://codepen.io/learnwebcode/pen/BaybWKL?editors=1010)

```javascript
// a: 何をrenderしたいか
// b: どこにrenderしたいか
ReactDOM.render(a, b)

// <div id="app"></div>が対象の場合
ReactDOM.render(a, document.querySelector("#app"))

// 要素を作成する
// a: which element (which tag)
// b: 
// c: Content
React.createElement("h1", null, "Our Amazing App Header")

// すべてを考慮すると以下になる。
ReactDOM.render(React.createElement("h1", null, "Our Amazing App Header"), document.querySelector("#app"))
```

これで作成ができるが上記のやり方は一見して何をしているのかわかりづらい

```javascript
function OutApp() {
    return React.createElement("h1", null, "Our Amazing App Header")
}

// OurAppを別個に定義してレンダリングを行うようにする。
ReactDOM.render(React.createElement(outApp), document.querySelector("#app"))
```

あとはレンダリングを行う対象を変更していけばいい。

```javascript
function OutApp() {
    return React.createElement("div", null, [
        React.createElement("h1", null, "Our Amazing App Header")
    ])
}

// OurAppを別個に定義してレンダリングを行うようにする。
ReactDOM.render(React.createElement(outApp), document.querySelector("#app"))
```

Reactではデータを波括弧で囲うことで変数として扱い文字列の中に導入することが可能となる。
またその際にはダブルクォートではなくバッククォートで囲う。

```javascript
function OurApp() {
  return React.createElement("div", null, [
    React.createElement("h1", null, "Our Amazing App Header"),
    React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
    React.createElement("small", null, "Copyright Footer Text")
  ])
}

// OurAppを別個に定義してレンダリングを行うようにする。
ReactDOM.render(React.createElement(outApp), document.querySelector("#app"))
```

しかしこの状態ではデータが更新されたとしてもブラウザに反映されることがない。
Reactにはこの問題に対処できる機能もあるが、以下ではJavaScriptのアプローチを採用している。

```javascript
function OurApp() {
  return React.createElement("div", null, [
    React.createElement("h1", null, "Our Amazing App Header"),
    React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
    React.createElement("small", null, "Copyright Footer Text")
  ])
}

// OurAppを別個に定義してレンダリングを行うようにする。
// setInterval(a, b)
// a: 実行する関数
// b: 実行間隔をミリ秒で設定
setInterval(function() {
  ReactDOM.render(React.createElement(OurApp), document.querySelector("#app"))
}, 1000)
```

Reactでは特徴的な機能として上記のコードを実行した際に、データが変更されるたびにすべての要素が更新されることなく、対象の要素のみが更新される。

またReactではUI部分とレンダリング部分を分離できている。

実際には上記のようなコードは使用されておらずJSXを使用している。しかしJSXでは背景では上記のようなコードを実行している。

## JSX

- [code](https://codepen.io/learnwebcode/pen/LYEaLEe?editors=1010)