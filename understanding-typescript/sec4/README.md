# new JavaScript features

## let & const

変数宣言を行う`let`や定数宣言を行う`const`を使用する場合、TypeScriptではコンパイルエラーを表示させることができる。
通常は、JavaScriptのエラーは実行時にエラーが生じるため、ソースコードの編集時にはエラーが検知できない。

`var`は`let`と異なり、グローバルスコープか関数スコープしか存在しない。
`let`はブロックスコープを採用しているため、`if`文内で定義されている変数を、ブロック外の箇所で使用することはできない。

## references

- [ES6 JS Features](https://kangax.github.io/compat-table/es6/)