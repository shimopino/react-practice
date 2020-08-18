# new JavaScript features

<!-- vscode-markdown-toc -->
1. [let & const](#letconst)
2. [arrow function](#arrowfunction)
3. [default parameter](#defaultparameter)
4. [spread operator](#spreadoperator)
5. [rest parameter](#restparameter)
6. [destructuring](#destructuring)
7. [references](#references)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='letconst'></a>let & const

変数宣言を行う`let`や定数宣言を行う`const`を使用する場合、TypeScriptではコンパイルエラーを表示させることができる。
通常は、JavaScriptのエラーは実行時にエラーが生じるため、ソースコードの編集時にはエラーが検知できない。

`var`は`let`と異なり、グローバルスコープか関数スコープしか存在しない。
`let`はブロックスコープを採用しているため、`if`文内で定義されている変数を、ブロック外の箇所で使用することはできない。

##  2. <a name='arrowfunction'></a>arrow function

矢印を使用した新しい関数定義は、以下のように使用する。

```js
const add = (a: number, b: number) => {
    return a + b;
};

// 1行の場合には波括弧は必要ではない
const add = (a: number, b: number) => a + b;

const printOutput = (outout: string | number) => {
    console.log(output);
};

// 引数が1つだけの場合は定数側に型設定を追加できる
const printOutput : (output: string | number) => void = output => {
    consoloe.log(output);
};

const button = document.querySelector('button');

// カッコを書かずに引数からそのまま関数を定義することも可能
if (button) {
    button,addEventListener('click', event => {
        console.log(event);
    });
}
```

##  3. <a name='defaultparameter'></a>default parameter

関数で渡すパラメータのデフォルト値を設定することで、パラメータの省略を実施することができる。
ただし、Pythonと同様に順番に注意する。

```js
const add = (a: number, b: number = 1) => a + b;

// デフォルトパラメータは省略しても問題ない
add(2);
```

##  4. <a name='spreadoperator'></a>spread operator

スプレッド演算子(`...`)を使用することで、配列からすべての値を取り出すことが可能である。
以下のように従来では要素を取り出して操作を行う必要がある機能に関して、その要素を個別に操作を実行できる

```js
const button = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(hobbies[0], hobbies[1]);

activeHobbies.push(...hobbies);
```

スプレッド演算子は配列以外にも、オブジェクトに対して使用することができる。
以下では、もとの`person`オブジェクトのコピーを作成し、他のオブジェクトに複製している。

```js
const person = {
    name: 'Max',
    age: 30,
};

const copiedperson = {
    ...person,
}
```

- [Primitive (プリミティブ)](https://developer.mozilla.org/ja/docs/Glossary/Primitive)
- [JavaScript のデータ型とデータ構造](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures)

##  5. <a name='restparameter'></a>rest parameter

`rest`パラメータを使用することで、任意の数の引数を受け取る関数を作成することができ。

```js
const add = (a: number, b: number) => {
    return a + b;
}

// 任意の数の引数を受け取る
const add = (...numbers: number[]) => {
    let result = 0;
    result = numbers.reduce((curresult, curValue) => {
        return  curResult + curValue;
    }, 0);
}

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers)
```

以下のようにTypeScriptの型機能を使用すれば、引数の数を制限することも可能である。

```js
const add = (...numbers: [number, number, number]) => {}
```

##  6. <a name='destructuring'></a>destructuring

分割代入を行うことで、配列の要素をindex形式ではなく、個々の要素にカッコを通してアクセスすることができる。

```js
const hobbies = ['Sports', 'Cooking'];

const hobby1 = hobbies[0];
const hobby1 = hobbies[0];

// 分割代入を行うと以下のように記述できる。
const [hobby1, hobby2] = hobbies;

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
```

オブジェクトに対しても、その属性に対して分割代入を行うことができる。

```js
const person = {
    firstName: 'Max',
    age: 30,
};

const {
    firstName, age
} = person;
```

##  7. <a name='references'></a>references

- [ES6 JS Features](https://kangax.github.io/compat-table/es6/);
