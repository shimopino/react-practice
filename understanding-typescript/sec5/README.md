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
