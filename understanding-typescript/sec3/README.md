# Configuration and Compiler

<!-- vscode-markdown-toc -->
1. [Watch Mode](#WatchMode)
2. [Compile Entire Project](#CompileEntireProject)
3. [Include & Exclude Files](#IncludeExcludeFiles)
4. [Configure Compile Target](#ConfigureCompileTarget)
5. [Configure Lib (build-in API)](#ConfigureLibbuild-inAPI)
6. [Other Compile Options](#OtherCompileOptions)
7. [Source Map](#SourceMap)
8. [rootDir & outDir](#rootDiroutDir)
9. [removeComments](#removeComments)
10. [noEmitOnError](#noEmitOnError)
11. [Strict Type-Chekcing](#StrictType-Chekcing)
12. [Additional Checks](#AdditionalChecks)
13. [Debugging on VSCode](#DebuggingonVSCode)
14. [references](#references)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='WatchMode'></a>Watch Mode

ファイル単体でコンパイルする場合は以下のコマンドを使用していた。

```sh
> tsc <ts-file>
```

Watchモードを使用することで、特定のファイルの変更を監視して自動的にコンパイルするように設定することができる。

```sh
> tsc <ts-file> --watch
```

##  2. <a name='CompileEntireProject'></a>Compile Entire Project

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

##  3. <a name='IncludeExcludeFiles'></a>Include & Exclude Files

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

##  4. <a name='ConfigureCompileTarget'></a>Configure Compile Target

`target`オプションは、どのバージョンのJavaScriptを対象にするのか設定することができる。
以下の場合は`es5`に準拠するJavaScriptにコンパイルされる。つまり`es5`の場合には`let`や`const`を指定しても`var`に変換される。

```json
"target": "es5"
```

これで古いブラウザでも動作するJavaScriptになることが保証される。

##  5. <a name='ConfigureLibbuild-inAPI'></a>Configure Lib (build-in API)

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

##  6. <a name='OtherCompileOptions'></a>Other Compile Options

`allowJS`を指定することで、JavaScriptファイルもコンパイル対象に設定することができる。
`checkJS`を指定することで、コンパイルを実行せずにエラーの検証のみを実行できる。
`jsx`はReactを使用する場合に設定する。
`declaration`はライブラリを公開する際に設定する。

##  7. <a name='SourceMap'></a>Source Map

`sourceMap`オプションを設定すると、`*.ts.map`拡張子のファイルが作成される。
このファイルはJavaScriptとTypeScriptの何行目と何行目が対応するのかを示しており、このファイルがあることで、ブラウザ上の検証ツールで`Sources`を指定した際に、JavaScriptファイルだけではなく、TypeScriptファイルに対してブレークポイントなどを設定することが可能である。

デバッグなどを実行する際に便利な設定になっている。

##  8. <a name='rootDiroutDir'></a>rootDir & outDir

ソースコードのファイルをわかりやすく配置するための設定
例えば以下のような配置にする。

`outDir`を指定することでコンパイルされたJavaScriptファイルの配置先を指定することができる。

```sh
- src  # TSファイルなどのソースコード 
- dist # コンパイルされたJavaScriptファイル
```

デフォルトの設定では、`src`内でのTSファイルの階層構造も出力先の`dist`にも反映される。

次にソースが配置されるルートディレクトリ`rootDir`を指定できる。この設定は、コンパイル対象がこのディレクトリ以下に存在するTSファイルのみであることを明示的に指定することになる。

##  9. <a name='removeComments'></a>removeComments

`removeComments`を設定しておくことで、ソースコード中にあるコメント文を削除してコンパイルを実施できる。

##  10. <a name='noEmitOnError'></a>noEmitOnError

エラーが発生した際に、JavaScriptファイルを生成しないようにする設定は`noEmitOnError`を使用する。
なおデフォルトでは、JavaScriptファイルがエラーが発生しようとも出力される。

これはエラーが存在するファイルが1つでも存在する場合は、何もファイルを出力しない。

##  11. <a name='StrictType-Chekcing'></a>Strict Type-Chekcing

`strict`を設定しておくことで、厳格な型チェックを実行できるようになり、ほかのルールを設定することが可能になる。

`noImplicitAny`では、型推論で`any`型と推論された場合にはエラーを発生するようにできる。

`strictNullChecks`では、`null`の可能性のあるオブジェクトが存在する場合にエラーを発生するようになる。

`strictFunctionTypes`では、関数の引数と返り値に必ず型を設定するように促すことができる。

`strictBindCallApply`では、関数を使用する場合に、引数などや返り値が定義と合致しているかどうかを検証できる。

##  12. <a name='AdditionalChecks'></a>Additional Checks

コードの品質を向上させるための設定も存在する。

`noUnusedLocals`では、利用されていないローカル変数が存在しないか検証することができる。

`noImplicitReturns`では、以下のような分岐によって暗黙的な返り値が存在しないか検証できる。

```js
function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
        return n1 + n2
    }
    // 暗黙的にundefinedが返される。
    // return; としておけばエラーは解消できる。
}
```

##  13. <a name='DebuggingonVSCode'></a>Debugging on VSCode

便利な拡張機能

- ESLint
- Prettier
- Debugger for Chrome
  - ブレークポイントを指定してChromeでのデバッグを指定
  - `launch.json`を編集
    - `url`は`localhost:3000`

##  14. <a name='references'></a>references

- [Debugging TypeScript](https://code.visualstudio.com/docs/typescript/typescript-debugging)

