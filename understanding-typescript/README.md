# Understanding Typescript

## What is TypeScript?

JavaScriptの仕様をベースに拡張を行った言語。
しかしブラウザで直接実行することはできない。

TypeScriptのコンパイラで実際に実行されるJavaScriptのコードが生成される。
一度変換をはさむことで、新機能をJavaScriptに組み込んだりエラーチェックなどの判定も可能になる。

つまり以下のようなコードに対して、関数の引数が指定の型ではない時点でコンパイルエラーを発生させることで、通常のJavaScriptだと発生してしまう可能性のあるエラーを排除している。

```js
function add(num1, num2) {
    return num1 + num2;
}

// 以下ではエラーは発生しない
console.log(add("2", "3"));
```

TypeScriptのコンパイラは以下のコマンドでインストールする。

```sh
> npm install -g typescript
```

TypeScriptのコンパイラを使用するには以下のコマンドを実行すればいい

```sh
> tsc <ts file>
```

---

TypeScriptが追加する機能とは、**型**や**新しい世代のJavaScriptの機能**を提供する。Typescriptの特徴は、こうした新しい機能を追加しても古いブラウザで動作するように自動的にコンパイル時にコードを変換してくれることになる。

そのほかにも**インターフェース**や**ジェネリクス**などのJavaScriptに存在しない機能を使用することもできる。


