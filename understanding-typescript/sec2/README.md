# Type

<!-- vscode-markdown-toc -->
1. [basics](#basics)
2. [number, string, boolean](#numberstringboolean)
3. [Object](#Object)
4. [Array](#Array)
5. [Tuple](#Tuple)
6. [Enum](#Enum)
7. [Any](#Any)
8. [Union](#Union)
9. [Literal](#Literal)
10. [alias and custom](#aliasandcustom)
11. [function型](#function)
12. [variable function型](#variablefunction)
13. [callback型](#callback)
14. [unknow型](#unknow)
15. [never型](#never)
16. [reference](#reference)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='basics'></a>basics

JavaScriptは動的型付け言語

- number
- string
- boolean

実際に以下のように関数に引数に型を指定した状態で、以下のファイルを作成すると、エディターにもエラーが表示され、コンパイル時にもエラーが発生する。

しかしJavaScriptの動作自体には影響は与えないため、以下のファイルでもコンパイルが実行されるようにしていた場合、問題なくブラウザ上で誤った結果が出力される。

```js
functon add(n1: number, n2: number) {
    return n1 + n2;
}

const number1 = '5';
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
```

なおJavaScriptでも`typeof`を使用すれば一応型チェックを実行することができる。
`typeof`演算子は、実行時に変数に割り当てられるデータ型を取得することが可能な演算子である。

```js
functon add(n1: number, n2: number) {
    if (typeof n1 != 'number' || typeof n2 != 'number') {
        throw New Error('型が異なる。');
    }
    return n1 + n2;
}

const number1 = '5';
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
```

なおTypescriptは開発時にのみ影響を与える言語であるため、JavaScriptの実行には何ら影響を与えないことに注意。

##  2. <a name='numberstringboolean'></a>number, string, boolean

`number`以外の型指定は以下のように行う。
注意点としては、型を指定する以外の演算などは、JavaScriptとして実行されるため、演算の中で文字列と数値型を足し算すると、エラーが生じることなく結果が出力されるため、数値型のみでの計算などは別途行っておく。

```js
functon add(n1: number, n2: number, showResult: boolean, phrase: string) {

    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    } else {
        return result;        
    }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result: ';

add(number1, number2, printResult, resultPhrase);
```

TypescriptにはType Inference（型推論）が存在する。コードから型が推論可能な場合には自動的に変数に型を割り当てる。そのため、以下のようなコードではエラーが発生してしまう。

```js
// 以下で型推論を行いnumber1がnumber型として解釈される
let number1 = 5; 
// number型の変数に文字列を代入しようとするとエラーが発生する
number1 = 'sample string';
```

なお以下のように明示的に型を指定することも可能だが、冗長な書き方である。

```js
let number1: number = 1;
```

##  3. <a name='Object'></a>Object

`object`型とは`{age: 30}`などのJSON形式なども含んでいる、JavaScriptのすべてのobjectである。

```js
const person = {
    name: 'yota',
    age: 30
}

console.log(person);
```

Typescriptでは、明示されていないプロパティにアクセスしようとすると
エラーを発生させます。

```js
console.log(person.nickname);
```

またTypescriptでObjectを使用する際に以下のように明示的に各要素の型を指定することも可能だが、Typescriptの型推論の機能に任せるのが一般的である。

```js
const person: {
    name: string;
    age: number;
} = {
    name: 'yota',
    age: 30,
}
```

##  4. <a name='Array'></a>Array

以下のように配列を追加すれば型推論が行われ、`person`オブジェクトのプロパティに`string[]`型という文字列の配列の型が追加される。

```js
const person = {
    name: 'yota',
    age: 30
    hobbies: ['sports', 'cooking'],
}

console.log(person);
```

TypeScriptでは配列を使用することで、自動的に配列の要素に対しても型推論が実行されるため、要素に対して何かしらの操作を行おうとすれば、対象の型に属する関数などにアクセスすることが可能である。

```js
// 変数hobbyはstring型として認識される
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()) // これはエラーが生じる
}
```

##  5. <a name='Tuple'></a>Tuple

TypeScriptでは、JavaScriptには存在しない型を追加することもできる。
例えば`Tuple`型では、配列長固定の要素の型も指定可能な配列を提供する。

```js
const person = {
    name: 'yota',
    age: 30
    hobbies: ['sports', 'cooking'],
    role: [2, 'author'], 
}

console.log(person);
```

このままでは以下のように配列に意図していない要素を追加することが可能になってしまう。

```js
person.role.push('admin');
person.role[1] = 1;
```

そこで以下のように明示的に配列の要素と長さを指定する。

```js
const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]; // ここでTuple型を指定する
} = {
    name: 'yota',
    age: 30
    hobbies: ['sports', 'cooking'],
    role: [2, 'author'], 
}
```

注意点としては、以下のように代入に関してはエラーを検知することは可能だが、`push`などの要素数を変更する関数ではエラー検知できない点である。

```js
// エラー検知できない
person.role.push('admin');
// エラー検知できる
person.role[1] = 1;
person.role = [];
```

##  6. <a name='Enum'></a>Enum

`Enum`型では定数のリストを追加することが可能となる。

```js
// cosnt ADMIN = 0;
// const READ_ONLY = 1;
// CONST AUTHOR = 2;

// enumでは指定した定数に自動的に0から数値が割り当てられる。
enum Role {
    ADMIN, READ_ONLY, AUTHOR
}

// 以下のように要素を指定することも可能
enum Role {
    ADMIN = 'ADMIN', 
    READ_ONLY = 200, 
    AUTHOR = 0,
}

const person = {
    name: 'yota',
    age: 30
    hobbies: ['sports', 'cooking'],
    role: Role.ADMIN, 
}

if (person.role === Role.ADMIN) {
    console.log('管理者ユーザ');
}
```

##  7. <a name='Any'></a>Any

`Any`型には型を指定しない場合に使用する。
変数が配列かどうかの検証を行うためにも使用できる。

```js
let sample: any[];
sample = [];
sample = 1;  // エラーが発生する
```

しかし型を指定しないのはTypescriptの機能を十分に活用することができないため、使用しないほうがいい。

##  8. <a name='Union'></a>Union

`Union`型を使用すればパイプ演算子`|`を使用することで、柔軟に型指定を実行することができる。

しかし以下のように受け取った方に依存して後続の処理を分岐させる必要がある場合には、実行時のデータ型を取得して処理を分岐させるといい。

```js
functon combine(input1: number | string, input2: number | string) {

    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const conbineAges = combine(30, 26);
console.log(conbineAges)

const conbineNames = combine('Nax', 'Anna');
console.log(conbineNames);
```

##  9. <a name='Literal'></a>Literal

`Literal`型とは`const`などで入力値の値を型として設定する機能である。
例えば以下の構文では、Typescriptはnumber1変数を`number`型ではなく、`2.8`型という`number`型よりもさらに絞った型を制限する。

```js
const number1 = 2.8;
```

この`Literal`型と`Union`型を組み合わせて、関数の引数で指定された文字列しか受け取れないようにすることが可能になる。

```js
functon combine(input1: number | string, input2: number | string, returnConversion: 'as-string' | 'as-number') {}
```

これで関数内や関数の呼び出しもとで、指定された文字列以外を指定しているとエラーが発生するようになり、より安全にコーディングを行うことが可能になる。

##  10. <a name='aliasandcustom'></a>alias and custom

Typescript独自の`type`演算子で型を作成することができる。

```js
type Conbinable = number | string;
type resultConversionDescriptor = 'as-number' | 'as-text'

functon combine(input1: Conbinable, input2: Conbinable, returnConversion: resultConversionDescriptor) {}
```

これで型自体の指定を間違ってしまう可能性を下げることができる。

```js
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 }; // this works!
```

さらに

```js
type User = { name: string; age: number };
 
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

##  11. <a name='function'></a>function型

関数の戻り値の型も指定することが可能になる。

```js
// 以下は型推論により、自動的に戻り値がnumber型と推論される
function add(n1: number, n2: number) {
    result n1 + n2;
}

// 以下は型推論により、自動的に戻り値がstring型と推論される
function add(n1: number, n2: number) {
    result n1.toString() + n2.toString();
}
```

TypeScriptでは返り値なしの`void`型を指定することも可能である。

```js
// 本来は型推論により自動的にvoid型と推論されるため、明示的に追加する必要はなし
function printResult(num: number): void {
    console.log('Result: ' + num);
}

printResult(add(5, 12));
```

JavaScriptでは実際にこの関数は`undefined`と返される。

##  12. <a name='variablefunction'></a>variable function型

JavaScriptでは変数に関数を割り当てることが可能である。

```js
function add(n1: number, n2: number) {
    return n1 + n2;
}

let conbineValues;
conbineValues = add;
console.log(conbineValues(8, 8));
```

しかし上記のコードでは、変数に関数以外を割り当てることが可能であり、また目的としている関数以外も割り当てることが可能である。
Typescriptでは関数用の型を以下のように定義できる。

```js
// 以下で関数であればなんでも受け取れる型を指定
let conbineValues: Function;

// 以下で引数と返り値が指定された型を指定
let conbineValues: (a: number, b: number) => number;
```

##  13. <a name='callback'></a>callback型

TypeScriptでは関数の引数に関数を受け取るような場合であっても、引数となるコールバック関数の引数や返り値を指定することができる。

```js
function add(n1: number, n2: number) {
    return n1 + n2;
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
})
```

##  14. <a name='unknow'></a>unknow型

Typescriptでは型が明示的に指定することができない場合に`unknown`型を指定することが可能である。
これは`any`型と異なり、型指定がされている変数に、`unknown`型の変数を代入することができずに、型チェックを行うことが強制される。

```js
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

// 以下はエラーが発生する。
userName = userInput;

if (typeof userInput === 'string') {
    userName = userInput;
}
```

##  15. <a name='never'></a>never型

関数の戻り値に使用できる。
`void`型と異なり、関数の戻り値が100％発生しえないことを表現できる。

```js
// 例外を送出する関数は、返り値を返さない
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
}

generateError('エラーが発生しました', 500);
```

##  16. <a name='reference'></a>reference

- [TYpeScript Deep Dive](https://typescript-jp.gitbook.io/deep-dive/)