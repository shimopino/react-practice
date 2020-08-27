# Decorator

## class decorator

TypeScriptでデコレータの機能を使用するために、TypeScriptの設定に以下を追加する。

```json
"target": "es6",
"experimentalDecorators": true,
```

デコレータは、クラスに対して適用することが可能である。
そこで以下のクラスを作成しておく。

```js
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}

const person = new Person();

console.log(person);
```

まずはデコレータを関数として定義する場合を見ていく。

デコレータを関数として定義するには、以下のように`Logger`関数を作成し、その引数に対象となるクラスのコンストラクタを渡す。

そして対象のクラスの定義前の部分に`@Logger`という形式で付与する。

```js
function Logger(constructor: Function) {
    console.log("printing log ...");
    console.log(constructoor);
}

@Logger
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}

const person = new Person();

console.log(person);
```

これでクラスのコンストラクタが実行される前に、何かしらの処理を実行することが可能となる。

なおこのデコレータの実行タイミングは、JavaScriptがクラスの定義を見つけたときであり、インスタンス化のタイミングではないことに注意する。

## decorator factory

クラスに対してデコレータを付与する際に、コンストラクタを引数として受け取るのとは別に、デコレータを付与したときに引数を渡したい場合が存在する。

```js
@Logger("printing log Person ...");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}
```

こうした場合にはデコレータファクトリを使用する。

ファクトリは、関数の中で関数を実行する形式で作成する。
まず最初の関数には、デコレータを付与した際に与える引数を受け取り、内部の関数では、クラスのコンストラクタを受け取る。


```js
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructoor);
    }
}

@Logger("printing log Person ...");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}
```

これでクラスのコンストラクトとは別に引数を受け取ることが可能となり、より柔軟にデコレータを活用することができる。

## useful decorator

デコレータファクトリを使用すれば、柔軟に内部で処理を実行することが可能である。

以下では、デコレータを付与した段階で、DOMの要素を取得してその中身を操作できる関数を作成していく。

```js
// HTMLでdivタグでid="app"を作成していることが前提である。
function WithTemplate(template:string, hookId: string) {
    return function(_: Function) {
        // DOMの要素を取得できたら
        const = hookEl = document.getElementById(hookId);
        if (hookEl) {
            // デコレータの引数をそのまま出力する
            hookEl.innerHTML = template;
        }
    }
}

@WithTemplate("<h1>Person Object</h1>", "app'");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}
```

また内部関数で受け取っているコンストラクタを活用することも可能である。
以下では、コンストラクタを使用してオブジェクトをインスタンス化させ、そのプロパティにアクセスしているデコレータを設定している。

```js
function WithTemplate(template:string, hookId: string) {
    return function(_: any) {
        const = hookEl = document.getElementById(hookId);
        // コンストラクタでインスタンス化
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            // インスタンスのプロパティにアクセス
            hookEl.querySelector("h1")!.textContent = p.name;
        }
    };
}

@WithTemplate("<h1>Person Object</h1>", "app'");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}
```

## multiple decorator

デコレータを付与した際に、内部の関数が実行されるタイミングは下から上の順番で実行される。

以下ではまず`WithTemplate`の内部関数が実行されたあとで、`Logger`の内部関数が実行されている。

```js
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructoor);
    }
}

function WithTemplate(template:string, hookId: string) {
    return function(_: any) {
        console.log("printing template ...");
        const = hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = p.name;
        }
    };
}

// 内部関数は下から順番に実行
@Logger("printing log Person ...");
@WithTemplate("<h1>Person Object</h1>", "app'");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}
```

しかし、ファクトリ自体は上から順番に実行される。
このタイミングの違いには注意する必要がある。

以下では、まず`Logger`のファクトリが実行され、次に`WithTemplate`のファクトリが実行される。


```js
function Logger(logString: string) {
    console.log("Logger Factory");
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructoor);
    }
}

function WithTemplate(template:string, hookId: string) {
    console.log("Template Factory");
    return function(_: any) {
        console.log("printing template ...");
        const = hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = p.name;
        }
    };
}

@Logger("printing log Person ...");
@WithTemplate("<h1>Person Object</h1>", "app'");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}
```

## property decorator

デコレータはクラスに付与する以外にも、クラスのプロパティに設定することが可能である。

プロパティに付与した場合には、引数としてオブジェクトのプロトタイプと、そのプロパティの名称が渡される。

プロパティに対するデコレータであっても、実行されるタイミングは前回と同様にJavaScriptが定義を見つけた段階である。

なお、どちらに関しても明確に型が事前にわからないため、以下のように定義している。

```js
function Log(target: any, propertyName: string | Symbol) {
    console.log("property decorator");
    console.log(target, propertyName);
}

class Product {
    @Log
    title: string;
    private _price: number;

    setPrice(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error("invalid price");
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = price;
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}
```

これでプロパティの値を受け取ることが可能になったため、例えば値の検証のためにデコレータを使用することが可能となる。

## accessor & parameter

デコレータはクラス内の、プロパティに対するアクセサや、メソッドやメソッドの引数に対して適用することができる。

まずはプロパティのアクセサにデコレータを付与する際は、以下のように3つの引数を受け取る。

- インスタンスメソッドではプロトタイプや、staticなアクセサではコンストラクタ
- アクセサの名称
- TypeScriptの組み込みの`PeopertyDescriptor`

```js
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

class Product {
    @Log2
    set price(val: number) {
        if (val > 0);
        this._price = val;
    } else {
        throw new Error('invalid price ...');
    }
}
```

次にメソッドに対するデコレータを付与する際は、以下のように3つの引数を受け取る。

- インスタンスメソッドではプロトタイプや、staticなメソッドではコンストラクタ関数
- メソッドの名称
- TypeScriptの組み込みの`PeopertyDescriptor`

```js
function Log3(target: any, name: string | Symbol, descriptor: PropertyDesriptor) {
    console.log('Method');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

class Product {
    @Log3
    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}
```

次にメソッドの引数に対するデコレータを付与する際は、以下のように3つの引数を受け取る。

- インスタンスメソッドではプロトタイプや、staticなメソッドではコンストラクタ関数
- メソッドの名称
-  引数の位置を0から指定

```js
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('parameter');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

class Product {
    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}
```

## create class

TypeScriptでは、デコレータ内で返り値を設定することで、デコレータ内でクラスを生成して、呼び出し元の変数に格納することができる。

デコレータをそのまま付与する場合との違いは、デコレータが実行されるタイミングである。

- デコレータをそのまま付与
    - JavaScriptにクラスの定義が読み込まれた段階
- デコレータ内でクラス生成
    - インスタンス化した段階

```js
function WithTemplate(template:string, hookId: string) {
    // 関数内でクラスを生成する関数を定義
    // 関数内で作成するクラスを受け取る関数のジェネリクスを定義する
    return function<T extends {new(...args: any[[]]: {name: string})}>(originalConstructor: T) {
        // 関数の引数で受け取ったクラスを継承する
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("printing template ...");
                const = hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1")!.textContent = this.name;
                }
            }
        }
    };
}
```

あとはこのデコレータを通常のデコレータと同様に使用することで、デコレータの処理が実行されるタイミングが、インスタンス化されるタイミングとなる。

```js
@WithTemplate("<h1>Person Object</h1>", "app'");
class Person {
    name = 'Max';

    constructor() {
        console.log("creating Person ...");
    }
}

const person = new Person();
```
