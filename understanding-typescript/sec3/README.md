# Configuration and Compiler

ファイル単体でコンパイルする場合は以下のコマンドを使用していた。

```sh
> tsc <ts-file>
```

## Watch Mode

Watchモードを使用することで、特定のファイルの変更を監視して自動的にコンパイルするように設定することができる。

```sh
> tsc <ts-file> --watch
```

## Compile Entire Project

ファイルを複数指定してコンパイルを実行することもできる。
TypeScript用のプロジェクトを作成する必要がある。
これは指定のディレクトリで以下のコマンドを実行し、`tsconfig.json`ファイルが作成されることを確認する。

```sh
> tsc --init
```

これで以下のコマンドを実行することでフォルダ内のTSファイルの変更をすべて自動的に監視して、コンパイルを行う。

```js
> tsc
> tsc --watch
> tsc -w
```

## Include & Exclude Files

`tsconfig.json`を編集することで、コンパイル対象のファイルを設定することも可能である。
`exclude`のキーを設定することで、コンパイルしないファイルを指定できる。

```json
"exclude": [
    "analytics.ts",
    "node_modules"
]
```

なお`node_modules`は`exclude`を指定しないときは自動的にコンパイル対象から排除される。
`exlucde`を設定している場合には、`node_modules`を必ず設定するようにする。

また以下のようにワイルドカードを使用して、ファイルを指定することが可能である。

```json
"exclude": [
    "**/*.dev.ts"
]
```

また`include`オプションを指定することで、コンパイル対象のファイルを指定することができる。

```json
"include": [
    "app.ts"
]
```

## Configure Compile Target

`target`オプションは、どのバージョンのJavaScriptを対象にするのか設定することができる。
以下の場合は`es5`に準拠するJavaScriptにコンパイルされる。つまり`es5`の場合には`let`や`const`を指定しても`var`に変換される。

```json
"target": "es5"
```

これで古いブラウザでも動作するJavaScriptになることが保証される。

## Configure Lib (build-in API)

以下のようなファイルを指定した場合、DOMなどのオブジェクトに対してもTypeScriptを動作させるにはどうすればいいのか考える。

```js
const button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log("clicked");
})
```

`lib`を指定することで、TypeScriptで使用可能なオブジェクトを指定できる。
何も設定しない場合には、デフォルトの設定が反映される。

`es6`を指定している場合には、DOMなどもオブジェクトが自動的に使用可能となる。

```json
"lib": [
    "DOM",
    "ES6",
    "DOM.Iterable",
    "ScriptHost"
]
```

上記の設定は`target`に`es6`を指定した際に自動的に使用可能となるオブジェクトの一覧である。
`target`ごとにどのようなオブジェクトが使用可能か調査する際は、以下の公式ドキュメントを参照する。

- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## Other Compile Options

`allowJS`を指定することで、JavaScriptファイルもコンパイル対象に設定することができる。
`checkJS`を指定することで、コンパイルを実行せずにエラーの検証のみを実行できる。
`jsx`はReactを使用する場合に設定する。
`declaration`はライブラリを公開する際に設定する。

## Source Map

`sourceMap`オプションを設定すると、`*.ts.map`拡張子のファイルが作成される。
このファイルはJavaScriptとTypeScriptの何行目と何行目が対応するのかを示しており、このファイルがあることで、ブラウザ上の検証ツールで`Sources`を指定した際に、JavaScriptファイルだけではなく、TypeScriptファイルに対してブレークポイントなどを設定することが可能である。

デバッグなどを実行する際に便利な設定になっている。

