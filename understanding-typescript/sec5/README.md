# Class & Interface

## Class

TypeScriptでは、以下のようにクラスを実装することが可能である。
クラスにはクラスが保持するプロパティや、インスタンス化を行う際に実行する関数をコンストラクタとして関数の定義をすることが可能である。

```js
class Department{
    name: string;

    constructor(n: string) {
        this.name = n;
    }
}

const accounting = new Department('Accounting');

console.log(accounting)
```

## Compile

コンパイルを実行すると、TypeScriptと異なる部分が存在する。
クラスの概念に関しては、ES6から導入された機能なので、使用するJSのバージョンに応じて以下のように変換に異なる。

- ES6
  - クラスからプロパティが削除されている。
- ES5
  - コンストラクタ関数を使用する形であり、Javaなど他の言語の経験者が一見して機能を理解しづらい

## Constructor

JavaScriptでは、クラスが保持するメソッドに自分自身を指すオブジェクトとして`this`を追加すれば、メソッドだけコピーされるような挙動を防ぐことができる。

結果的にオブジェクトの安全性を向上させることができる。

```js
class Department{
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log('Department: ' + this.name);
    }
}

const accounting = new Department('Accounting');

accounting.describe()

// 以下のようにメソッドだけをコピーすることを許可しない
const accountingCopy = { describe: accounting.describe };

accountingCopy.describe();

// そのため以下のようにクラスの定義をコピーすれば問題なし
const accountingCopy = { name: 'Sample', describe: accounting.describe };

accountingCopy.describe();
```

## private & public

TypeScriptでは、クラスの属性にアクセス修飾子をつけることで、メソッドの外部からプロパティが直接操作されないようにすることができる。

```js
class Department{
    name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log('Department: ' + this.name);
    }

    addEmployee(employee: string) {
        // validation etc
        this.employees.push(employee);
    }

    printEmployeeInfo() {
        console.log(this.name);
        console.log(this.employees);
    }
}

const accounting = new Department('Accounting');

accounting.addEmployee('Max');

// privateとpublicの違い
accounting.name = 'smaple'; // エラーなし
accounting.employees[2] = 'sample'; // エラーあり
```

## Initialization

コンストラクタを使用している場合、以下のようにクラスのプロパティと、コンストラクタで行っているプロパティの設定を紐付ける必要があった。

これはクラスの属性値が増加することで、コードの行数も増えてしまうことを意味している。

```js
class Department{
    name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }
}
```

そこで`アクセス修飾子`を使用することで、コンストラクタが呼び出された瞬間に、プロパティの宣言と設定を同時に実行することが可能となる。

```js
class Department{
    private employees: string[] = [];

    constructor(private id: string, public name: string) {}

    // 以下のメソッドで、テンプレート文字列を使用してプロパティ値を表示する
    describe(this: Department) {
        console.log(`Department: (${this.id}): ${this.name}`);
    }
}
```

## readonly

TypeScriptで導入された`readonly`を変数の宣言時に指定することで、指定の変数が他の処理から変更された場合に、エラーを表示させることができる。

Javaでいう変数に付与する場合の`final`修飾子に近い。

```js
class Department{
    private employees: string[] = [];

    constructor(private readonly id: string, public name: string) {}

    // 以下のメソッドで、テンプレート文字列を使用してプロパティ値を表示する
    describe(this: Department) {
        console.log(`Department: (${this.id}): ${this.name}`);
    }
}
```

## Inheritance

TypeScriptではクラスの継承を行うことができる。

まずは今までと同様に、以下のような部門を表すクラスを作成する。
このクラスは、コンストラクタに2つの引数を受け取っている。

```js
class Department{
    private employees: string[] = [];

    constructor(private readonly id: string, public name: string) {}

    // 以下のメソッドで、テンプレート文字列を使用してプロパティ値を表示する
    describe(this: Department) {
        console.log(`Department: (${this.id}): ${this.name}`);
    }
}
```

TypeScriptでの継承は`extends`修飾子で使用することが可能である。
なお、継承するクラスは1つしか指定することができない。

またコンストラクタで引数を受け取ってプロパティに設定する場合、先に継承先のクラスのコンストラクタを`super`を使用して呼び出す必要がある。

```js
class ITDepartment extends Department{

    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
}

const it = new ITDepartment('d1', ['Max'])
```

> あとで継承後のコンストラクタで、初期化演算子を使用できるか確認する。

## Override, protected

TypeScriptでは継承先のクラスから、継承元のメソッドを上書きすることが可能である。

まずポイントとしては、継承先のクラスから、継承元のクラスの属性にアクセスする必要がある場合に注意点が存在する。

これは継承元のクラスのプロパティの値を`private`で設定していた場合、継承先のクラスからはアクセスできない点である。

そこで、継承先のクラスからも、継承元のクラスのプロパティにアクセスできるように、`protected`修飾子を使用することで、継承先のクラスからでもアクセスすることが可能となる。

```js
class Department{
    // 継承先のクラスからもアクセス可能となる
    protected employees: string[] = [];

    constructor(private readonly id: string, public name: string) {}

    addEmployee(employee: string) {
        // validation etc
        this.employees.push(employee);
    }
}
```

あとは継承先のクラスで、継承元の`addEmployee`メソッドを記述することで、継承先にのみ影響のある独自の処理を追加することが可能となる。

```js
class ITDepartment extends Department{

    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }
}

const it = new ITDepartment('d1', ['Max'])
```

## getter & setter

TypeScriptでは、`getter`や`setter`を使用することで、オブジェクトのプロパティにアクセスする際に、メソッドを呼び出すことが可能となる。

実際には、それぞれを`get`修飾子と`set`修飾子を使用して設定する。

```js
class AccountingDepartment extends Department{

    private lastReport: string;

    // getterを設定する
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('レポートが見つかりません');
    }

    // setterを設定する
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('正しい値を設定してください');
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'accounting');
        this.lastReport = reports[0];
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
}
```

あとは以下のように通常のプロパティと同様に、プロパティ値にアクセスしたり、値を設定したりすることが可能となる。

```js
const accounting = new AccountingDepartment('d2', []);

console.log(accounting.mostRecentReport);
accounting.mostRecentReport = '';
```

## static

クラス自体のプロパティやメソッドを、インスタンス化させることなくアクセスできるようにする`static`修飾子を使用する。

以下はJavaScriptに組み込まれている`static`なオブジェクトの例である。実際にインスタンス化させることなくプロパティやメソッドにアクセスすることができている。

```js
Math.PI     // 定数にアクセス
Math.pow()  // メソッドにアクセス
```

自身で定義するには先頭に`static`修飾子をつけるだけでいい。

```js
class Department {

    ststic fiscalYear = 2020;

    static createEmployee(name: string) {
        return { name: name }
    }
}

const employee1 = Department.createEmployee('Max');
cnosole.log(employee1, Department.fiscalYear);
```

しかし以下のように`this`演算子を使用して、同一クラス内からアクセすることはできない。
これは`this`はインスタンス化させたクラスを指しているからである。

```js
class Department {

    ststic fiscalYear = 2020;

    static createEmployee(name: string) {
        return { name: name }
    }

    addEmployee() {
        console.log(this.fiscalYear);   // Error
        console.log(Department.fiscalYear)
    }
}
```

## abstract method



```js
abstract class Department {
    abstract describe(this: Department): void;
}

class ITDepartment extends Department {
    describe() {
        console.log('サブクラス独自の実装');
    }
}
```

`abstract`クラスはインスタンス化させることはできないため注意する。

## singleton

TypeScriptでは、シングルトンというデザインパターンを実装することができる。
これは特定のクラスのインスタンスが必ず1つになることを矯正したい場合に使用する。

実装方法としては、コンストラクタ自体を`private`にすることで`new`を使ったインスタンス化ができないようにしておき、`static`なメソッドから呼び出すことで、生成されるインスタンスを制御している。

```js
class AccountingDepartment extends Department {

    private static instance: AccountingDepartment;

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = this.reports[0];
    }

    static getInstance() {
        // このメソッドはstaticメソッドなので、クラスのプロパティなどにアクセスできる
        if (AccountingDepartment.instance) {
            return this.instance;
        }

        this.instance = AccountingDepartment('d2', []);
        return this.instance;
    }
}
```

## interface

TypeScriptでは、インターフェースの機能を提供している。
インターフェースでは、オブジェクトの設計図、つまりプロパティやメソッドの型情報のみを提供している。

```js
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}
```

このインターフェースを使用すれば、オブジェクトに対して方の設定に従ったプロパティやメソッドが実装されていることを保証することができる。

```js
let user1: Person;

user1 = {
    name: 'Matz',
    age: 30,
    greet(phrase: string) {
        console.log(phrase : ' ' + this.name);
    },
};

user1.greet('Hello I am ');
```

## implementation

型情報を提供するだけであれば`type`修飾子を使用するだけでいい。
実際、以下のように`interface`修飾子を`type`修飾子に変換するだけで、以下は型確認を実行することができる。

```js
type Person = {
    name: string;
    age: number;

    greet(phrase: string): void;
}
```

インターフェースの役割は、オブジェクトを使用する側が、対象のメソッドが実装されているのか気にする必要がない点である。

以下のように`Greetable`インターフェースを定義しておけば、このインターフェースを実装しているオブジェクトは必ず`name`プロパティと`greet`メソッドの実装が存在していることが保証される。

```js
interface Greetable {
    name: string;

    greet(phrase: string): void;
}
```

あとは`implements`を使用してインターフェースの実装を行えばいい。
なお、インターフェースに定義されている以外のメソッドやプロパティを実装することは問題ない

```js
class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}
```

変数に型を設定する際は、変数にインターフェースの型情報を割り当てて、インスタンス化させる際に実装クラスのコンストラクタを呼び出している。

```js
let user1: Greetable;

user1 = new Person('Max');
```

## Why interface needs?

インターフェースの利点は、クラスに対してインターフェースで定義されている機能が実装されていることを保証している点である。

例えば以下のように挨拶を行う機能を提供するインターフェースを作成しておけば、このインターフェースの実装クラスには、同様に挨拶を行う機能が実装されていることが保証されている。

```js
interface Greetable {
    name: string;

    greet(phrase: string): void;
}
```

このクラスを使用するユーザーは、挨拶可能な機能のインターフェースを指定さえしておけば、実装クラスが`Person`以外のクラスになったとしても、必ず挨拶を行う機能は保証されているため、安心してクラスの挨拶メソッドなどを呼び出すことができる。

```js
let user1: Greetable;
user1 = new Person('Max');
user1.greet('Hello I am ');
```


## readonly interface

インターフェースには、実装クラス側のコンストラクタで1回のみ、値を割り当てるように変数のアクセス権限を操作することができる。

以下のように、インターフェースのプロパティに対して`readonly`修飾子をつけておけば、1度のみのアクセスのみに制限できる。

```js
interface Greetable {
    readonly name: string;
}

class Person implements Greetable {
    name: string;
}
```

実際に以下のようにインスタンス化させたオブジェクトに対して、設定済みの変数に再度値を割り当てることはできない。

```js
let user = new Person('max');
user.name = 'Matz'; // Error
```

## extension of interface

インターフェースは、他のインターフェースを継承することが可能である。
例えば以下のように、名前のプロパティを有していることを保証するインターフェースを継承して、挨拶を行う機能を提供するインターフェースに拡張することができる。

```js
interface Named {
    readonly name: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}
```

## interface as function type

`type`を使用すれば、関数に関する型を定義することができた。

```js
type AddFn = (a: number, b: number) => number;

let addFn: AddFn;

addFn = (n1: number, n2: number) {
    return n1 + n2;
}
```

インターフェースを使用して、上記と全く同様なカスタム型を定義することができる。
これは、インターフェースにメソッド名が存在しない匿名メソッドを定義しておくことで、TypeScriptは関数のカスタム型として認識する。

```js
interface AddFn {
    (a: number, b: number): number;
}
```

## arbitary property

`?`修飾子をつけることで、プロパティや引数が必ずしも必要としない、Optionalなパラメータになるように設定することができる。

以下のインターフェースでは、Namedインターフェースの実装クラスでは`outputName`プロパティに関しては定義しなくても問題ありません。

```js
interface Named {
    readonly name: string;
    outputName?: string;
}
```

他にも関数の引数にも使用することができる。

```js
class Person implements Greetable {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase?: string) {
        if (phrase) {
            console.log('Hi');
        } else {
            console.log(phrase + ' ' + this.name);
        }
    }
}

```

## Compile

実際にはインターフェースの機能はJavaScriptには存在しないため、コンパイルを行えばインターフェースに関する機能は完全に廃棄される。

これはあくまでもTypeScriptがコンパイルを行うまでの、開発の生産性を向上させるためのものだからである。

## references

- [クラス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes)
- [インターフェース](https://typescript-jp.gitbook.io/deep-dive/type-system/interfaces)