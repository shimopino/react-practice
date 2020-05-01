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

JSXを使用すれば、HTMLと同じような感覚でUIを構築することができる。
JSXをcodepenで使用するにはJavascript PreprocessorにBabelを指定する。

- [code](https://codepen.io/learnwebcode/pen/LYEaLEe?editors=1010)

```javascript
// function OurApp() {
//   return React.createElement("div", null, [
//     React.createElement("h1", null, "Our Amazing App Header"),
//     React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
//     React.createElement("small", null, "Copyright Footer Text")
//   ])
// }

function OurApp() {
    return (
        // 1つのトップレベルエレメントのみが許可される
        <div>
            <h1>Out Amazing App Header</h1>
            <p>The current time is blank.</p>
            <small>Copyright Footer Text</small>
        </div>
    )
}
```

またJSXでCSSを適用するために、クラス名属性をつける場合にはキャメルケースを採用している。

```javascript
function OurApp() {
    return (
        // 1つのトップレベルエレメントのみが許可される
        <>
            // キャメルケースでの指定
            <h1 className="special">Out Amazing App Header</h1>
            // {}で変数を指定できる。
            <p>The current time is {new Date().toLocaleString()}.</p>
            <small>Copyright Footer Text</small>
        </>
    )
}
```

JSXのレンダリングを行う際には、先程から少し変更する。

```javascript
setInterval(function() {
    // OurAppでコンポーネントの指定が可能
    ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではUI部分をどのように細かく分割すればいいのか。

## Organization

ReactではUIを分割するためにコンポーネントを導入している。
これは例えば上記のコードに対してh1タグやpタグごとにUIを分割できる。

- [code](https://codepen.io/learnwebcode/pen/ZEYZyQb?editors=1010)

```javascript
function OurApp() {
    return (
        // 1つのトップレベルエレメントのみが許可される
        <>
            <OurHeader />
            // {}で変数を指定できる。
            <p>The current time is {new Date().toLocaleString()}.</p>
            <small>Copyright Footer Text</small>
        </>
    )
}

function OurHeader() {
    // 1要素しか無い場合は()は要らない
    return <h1 className="special">Our Amazing App Header</h1>
}
```

あとはこれを他のコンポーネントにも同様に適用すれば、UIとコンポーネントを細かく分割することが可能になる。

```javascript
function OurApp() {
  return (
    <>
      <OurHeader />
      <TimeArea />
      <Footer />
    </>
  )
}

function Footer() {
  return <small>Copyright Footer Text</small>
}

function TimeArea() {
  return <p>The current time is {new Date().toLocaleString()}.</p>
}

function OurHeader() {
  return <h1 className="special">Our Amazing App Header</h1>
}

setInterval(function() {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではこのコンポーネントにデータを適用するにはどうすればいいのか。

## Props

ReactでHTMLのように`<a href=>`のようにコンポーネントの属性を指定するにはどうすればいいでしょうか。

- [code](https://codepen.io/learnwebcode/pen/ExazaOd?editors=1010)

```javascript
function OurApp() {
  return (
    <>
        <ul>
            <Pet />
            <Pet />
            <Pet />
        </ul>
    </>
  )
}

// まずは変更の無いコンポーネントを作成する
function Pet() {
    return <li>This is a pet.</li>
}

setInterval(function() {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではHTMLのようにコンポーネントに対して属性を付与して挙動の確認を行う.


```javascript
function OurApp() {
  return (
    <>
        <ul>
            <Pet name="Meowsalot" species="cat" age="5" />
            <Pet name="Meowsalot" species="cat" age="5" />
            <Pet name="Meowsalot" species="cat" age="5" />
        </ul>
    </>
  )
}

// コンポーネントが引数を受取るように変更する。
function Pet() {
    return <li>{props.name} is a {props.species} and is {props.age} years old.</li>
}

setInterval(function() {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではこのPetコンポーネントを数百もの個数を配置する必要が出てきた場合にはどうすればいいのか。

## Collection of Data

