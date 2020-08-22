# Advanced Type

<!-- vscode-markdown-toc -->
1. [intersection type](#intersectiontype)
2. [type guard](#typeguard)
3. [discriminated Union](#discriminatedUnion)
4. [type casting](#typecasting)
5. [index type](#indextype)
6. [function overload](#functionoverload)
7. [optional chaining](#optionalchaining)
8. [nullish coalescing](#nullishcoalescing)
9. [references](#references)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->



##  1. <a name='intersectiontype'></a>intersection type

自身で定義したカスタム型に関して、両者を結合させることもできる。
ただしオブジェクトに対して結合をするか、変数に関して結合させるかで挙動は異なる。

まずは以下のようにオブジェクトとしての型を定義して、結合させることを考える。
オブジェクトの場合には、和集合が作られる。

```js
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "MAx",
    privileges: ['create-server'],
    startDate: new Date(),
}
```

変数に対して定義しているカスタム型を結合させると、積集合が形成される。
以下のように変数の積集合になると、作成される型`Universal`は、どちらの型にも共通している`number`を受け取る型になる

```js
// Union型
type Combinable = string | number;
type Numeric = number | bookean;

type Universal = Combinable | Numeric;
```

##  2. <a name='typeguard'></a>type guard

交差型を使用する際の問題は、型を正しく検証することができない点である。
例えば関数の引数に、交差型の変数を受け取った場合、`typeof`を使用して後続の操作が正しく実行できるように分岐処理を実行すればいい。

```js
function add(a: Combnale, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
```

オブジェクトをカスタム型の交差型で定義している場合、対象のオブジェクトにプロパティが属しているかどうかを`in`演算子を使用して、検証することができる。

```js
type UnknownEmokoyee = Employee | Admin;

function printEmployeeInformation(emp: UnkknownEmployee) {
    console.log(emp.name);
    // どちらの型もobject型なので、ランタイムで実行されるtypeofでは識別できない
    console.log('Privileges' + emp.privileges);

    if ('privileges' in emp) {
        console.log('Admin');
    }
    if ('startDate' in emp) {
        console.log('Employee')
    }
} 
```

`in`演算子以外でも、ランタイム時にどのクラスからインスタンスが作成されたのかを検証できる`instanceof`演算子を使用すれば、型の検証をすることができる。

```js
class Car {
    drive() {
        console.log('車を運転中');
    }
}

class Truck {
    drive() {
        console.log('トラックを運転中');
    }

    loadCargo() {
        console.log('荷物を載せています');
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicele.loadCargo();
    }
}

useVehicle(v1);
useVehicle(v2);
```

以下のように関数の引数で受け取ったインスタンスの生成元クラスを検証する。

```js
function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicele.loadCargo();
    }
}
```

インターフェースに対して`instanceof`を使用することはできない。


##  3. <a name='discriminatedUnion'></a>discriminated Union

インターフェースはJavaScriptにコンパイルされることはないため、`instanceof`演算子を使用することはできない。

そこで`in`演算子を使用して対象のオブジェクトに指定のプロパティが属しているかどうかで、型の検証を行うことができる。

```js
interface Bird {
    flyingSpeed: number;
}

interface Horse {
    runningSpeed: number;
}

type Animal = Bird | horse;

funcrion moveAnimal(animal: Animal) {
    if ('flyingSpeed' in animal) {
        console.log(animal.flyingSpeed);
    }
}
```

しかし上記の方法では、対象となるプロパティの値を正しく知っていることが前提となり、タイプミスなどの人的ミスが発生してしまう可能性が存在する。

そこで以下のように交差型のもととなるインターフェースに対して、共通となるプロパティをリテラル型としてもたせておくことで、JavaScriptの`switch`演算子を使用して対象のオブジェクトがどうかを検証することができる。

```js
interface Bird {
    type: 'bird',
    flyingSpeed: number;
}

interface Horse {
    type: 'horse',
    runningSpeed: number;
}

funcrion moveAnimal(animal: Animal) {
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('移動速度: ' : speed);
}

moveAnimal({type: 'horse', runningSpeed: 100});
```

##  4. <a name='typecasting'></a>type casting

TypeScriptでは、型推論で明確に型が決まらない際に、型キャスト機能を使用することができる。

これはDOM要素を取得した際などに発生する。
以下の例は正しく型推論できている場合であり、`HTMLParagraphElement`を取得することができている。

```js
// 推論できる
const parahraph = document.querySelector('p');
```

しかし`id`などでHTML要素を取得した場合には、取得できる要素クラスは`HTMLElement`であり、`HTMLParagraphElement`か`HTMLInputElement`かなどを識別することはできない。

```js
// タグまでは判別できない（HTMLElement）
const paragraph = document.getElementById('message-output');

const userInputElement = document.getElementById('user-input');
```

そこで1つの方法としては、まず`!`修飾子を最後につけることで、`null`ではないことを保証した上で、先頭にキャスト先の型を指定する。

```js
// DOMを追加しているのでできる
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
```

しかしこの手法はReactのJSXのように、一部の文法とかぶってしまう可能性がある。
その場合には、変数の後ろにキャストする構文を使用する。

```js
// reactのJSXとかぶらないようにする
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
```

またこの`as`構文は、`null`ではないことを検証したあとなどに、キャスとそのクラスのプロパティへのアクセスを同時に実行することができる。

```js
if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'hello';
}
```

##  5. <a name='indextype'></a>index type

DOM要素から、任意の属性に対応するユーザーの入力値を受け取るような場合を考える。これは例えば`input`タグの`text`や`email`のようなタイプ指定を取得する場合になる。

そして得られた属性値に応じてエラーメッセージを返すような処理を考える。この場合の問題点は、TypeScriptではオブジェクトに格納すべきプロパティの名称もその型も事前に知ることができない点である。

そこで以下のように、インデックス型を使用して、`email`をプロパティとして設定したり、`username`をプロパティとして設定できるようになる。

```js
// { email: 'error'}
interface ErrorContainer {
    id: string;
    [prop: string]: string;
}

const errorBag = ErrorContainer = {
    email: '正しいメールアドレスを設定してください'
    username: 'ユーザー名に記号を含めることはできない',
};
```

##  6. <a name='functionoverload'></a>function overload

関数の引数と返り値のセットをシグニチャと呼ぶ。
TypeScriptでは、1つの関数に対して複数のシグニチャを設定することができ、この機能を使用することで、対象の関数の返り値や引数を正しく型推論することができるようになる。

まず以下のような関数を考える。

```js
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
```

この関数を以下のように使用する場合、TypeScriptは返り値が文字列型か数値型7日識別することができないため、文字列型を前提として処理はエラーが通知されてしまう。

```js
// エラーが生じる
const result = add('Hello', ' TypeScript') as string;
result.split(' ');
```

そこで以下のように関数の引数の方や返り値を複数設定することで、関数を使用する際にTypeScriptの型サポートを受けることができる。

```js
// 引数の数は1でもいいが、その場合はOptional引数を指定する
// function add(a: number): number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b?: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
```

この関数オーバーロードを行うことで、以下のコードを実行した際に返り値の型が明確になり、エラーが発生しないようになる。

```js
// エラーは起きない
const result = add('Hello', ' TypeScript');
result.split(' ');
```

##  7. <a name='optionalchaining'></a>optional chaining

バックエンドにHTTPリクエストを送信し、レスポンスとしてJSONオブジェクトを取得した場合を考える。

その場合、以下のようなプロパティがオブジェクトに存在しているのかどうかを検証することができない。

```js
const fetchUserData = {
    id: 'u1',
    name: 'user1',
    job: [
        title: 'Developer',
        description: 'TS',
    ].
};

console.log(fetchUserData.job.title);
```

そこでオブジェクトを使用する際に、子要素に対する親要素が存在しているのかを検証する。
JSでは以下のような検証を行うことで、実行時エラーが生じないようにしている。

```js
// JSでの対処法
console.log(fetchUserData.job && fetchUserData.job.title);
```

TypeScriptではOptional Chainingという機能を使用することで同様のことが実現できる。
これは以下のようにアクセス対象のオブジェクトを`?`演算子を使用することで、検証を行っている。

```js
// fetchUserDataが存在する場合には、アクセスを実行
// jobが存在する場合にのみ、アクセスを実行
console.log(fetchUserData?.job?.title);
```

##  8. <a name='nullishcoalescing'></a>nullish coalescing

JSでは、変数の値が`falsy`だった場合に、異なる定数を代入できるような操作を実行することができる。

この問題点は、`falsy`の条件として、`null`や`undefined`以外にも空文字も該当するため、空文字を空文字のまま識別することができない。

```js
const userInput = null;

const storeData = userInput || 'Default';
```

そこでTypeScriptでは以下のように`??`演算子を使用することで、検証対象を`null`と`undefined`のみに絞ることができる。

```js
// nullかundefined
// falsyとは異なる
const storeData = userInput ?? 'default';
```

##  9. <a name='references'></a>references

- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)