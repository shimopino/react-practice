# Generics

## What is Generics

JavaScriptで以下のように配列を使用した場合、これは配列の型と文字列の型の組み合わせだと考えることができる。

しかしJavaScriptには配列の各要素の型を制限するような機能を提供されていない。

```js
// []とstringの組み合わせ
const names = ['Max', 'Mannual'];
```

JavaScriptのPromiseでは、以下のように型を指定して返り値が対象の型であること保証することで、その後に処理でTypeScriptの機能を活用することができる。

```js
const names: Array = [];

const names: any[] = [];

const names: Array<string> = [] // string[]

const promise: Promise<any> = new Promise<string>(resoluve, reject) => {
    setTimeout(() => {
        // stringを返す
        resoluve('finished');
    }, 2000);
}

promise.then(data => {
    data.split(' ');
})
```

もしも以下のように型を指定してオブジェクトにアクセスすることで、メソッドチェーンを使用していた際に、取得したオブジェクトに対して適したメソッドにアクセスすることができる。

以下では、メソッドチェーンの中で文字列に従うメソッドを呼び出すことができる。

```js
const promise: Promise<string> = new Promise<string>(resoluve, reject) => {
    setTimeout(() => {
        // stringを返す
        resoluve(10);
    }, 2000);
}

promise.then(data => {
    // ここにはエラーが生じる
    data.split(' ');
})
```

## how to create Generics

関数を引数で受け取る際に、`object`型を使用することで、関数内でもTypeScriptの検証機能を使用することができる。

```js
function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
}

console.log(merge({name: 'Max'}, {age: 30}));
```

ただし以下のように関数を使用してオブエジェクトを使用した場合、返り値も`object`型として認識されてしまうため、引数で渡したオブジェクトのプロパティにアクセスしようとすると、TypeScriptは正しく検証を行うことができずに、エラーが発生してしまう。

```js
const mergeObj = merge({name: 'Max'}, {age: 30});
// error
mergeObj.age;
```

そこでTypeScriptでは、以下のように引数で渡された変数に対して、動的に型を割り当てることができる。

```js
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
```

先ほどと同様に以下のように関数の引数にオブジェクトを渡した場合には、関数内で動的に型が割り当てられるため、独自のプロパティにアクセスしてもエラーが発生しないようになる。

```js
const mergeObj = merge({name: 'Max'}, {age: 30});
// オブジェクトを推論可能になる
mergeObj.age;
```

## add Constraint

以下のコードでは、TypeScriptでエラーは発生しないが、暗黙的にエラーを発生させてしまう。

それは引数に渡されているのがプリミティブ型であり、関数内の`Object.assign`が暗黙的に失敗してしまうのが原因である。

```js
// 暗黙的な失敗
const mergeObj = merge({name: 'Max'}, 30);
mergeObj.age;
```

そこで引数を`object`型に限定することで、正しくコードを実行することができる。これは動的に割り当てる型に対して、`extends`を使用することで実現できる。

```js
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
```

## How to create Generics 2

以下のようにジェネリクスを使用した場合は、エラーが発生する可能性が存在する。
これはもしも引数で渡されている`element`オブジェクトに、`length`プロパティが存在しない場合に、条件分岐を実行する段階でエラーが発生してしまう。

```js
function countAndDescribe<T>(element: T) {
    let descriptionText = 'not value';
    if (element.length > 0) {
        descriptionText = 'value is' : element.length : '.';
    }
    return [element, description];
}
```

これを防ぐには、引数となるオブジェクトが`length`プロパティを有していることを保証しておく必要がある。

この目的を達成する1つの方法は、インターフェースを使用することである。
まず`length`プロパティをもつインターフェースを定義しておく。次に、動的に割り付ける型が、このインターフェースを拡張させたものであることを指定する。

```js
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'not value';
    if (element.length > 0) {
        descriptionText = 'value is' : element.length : '.';
    }
    return [element, description];
}

console.log(countAndDescribe('お疲れ様です'));
console.log(countAndDescribe(['sample1', 'sample2']));
console.log(countAndDescribe([]));
// 以下ではlengthプロパティを有していないため、エラーが発生してしまう
console.log(countAndDescribe(30));
```

## keyof

オブジェクトに対して特定のプロパティが属していることを保証するためには、他の方法もある。

以下の例では引数でオブジェクトとそのプロパティを受け取って、オブジェクトの対象の値にアクセスするためのコードである。しかし、引数に対象のプロパティが存在しない場合、エラーが生じる。

```js
function extractAndConvert(obj, key) {
    return 'value: ' + obj[key];
}

// エラーが生じる
extractAndConvert({}, 'name');
```

以下のように`keyof`修飾子を使用して実施することができる。

```js
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'value: ' + obj[key];
}

// この段階で警告が生じてしまう
extractAndConvert({}, 'name');
extractAndConvert({name: 'matz'}, 'name');
```

## Generic class

以下の例のように、オブジェクトに対して何も操作を実施せず、保持のみしか行わないクラスを作成する場合、ジェネリクスを活用することができる。

```js
classn DataStorage {
    private data = [];

    addItem(item) {
        this.data.push(item);
    }

    removeItem(item) {
        this.data.splice(this.data.indexof(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}
```

これはクラスの定義を行った際に`<>`で動的に割当てる型の名称を決めておき、その後で実際にこの型を変数に割当てることで実現できる。

```js
class DataStorage<T> {
    private data: T = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexof(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}
```

これで以下のように型の制限なく、様々な型を保持できるクラスをインスタンス化させて使用することができる。

```js
const textStorage = new DataStorage<string>();
textStorage.addItem('sample1');
textStorage.addItem('sample2');
textStorage.removeItem('sample1');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
```

ただしこのコードには注意する必要がある。
このコードは正しく要素を削除することができない。

```js
const objStorage = new DataStorage<object>();
objStorage.addItem({name: 'manu'});
objStorage.addItem({name: 'max'});
objStorage.removeItem({name: 'manu'});
```

以下のように関数の引数に渡されるものはオブジェクトへの参照であり、`addItem`と`removeItem`を使用した際に引数で渡しているオブジェクトは別物であるからである。

そのため、該当するオブジェクトが存在せず、`this.data.indexOf(item)`は`-1`を返してしまい、配列の最後の要素を削除するようになってしまう。

```js
removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
        return;
    }
    this.data.splice(this.data.indexOf(item), 1);
}
```

この現象を防ぐ1つの方法は、オブジェクトへの参照を1つに制限するように変数にオブジェクトを格納する方法である。

```js
const obj = {name: 'max'};

objStorage.addItem(obj);
objStorage.removeItem(item);
```

それ以外にも、プリミティブ型でしか使用することはできないが、Union型を設定して置くことで、ポインタが渡されることなく、直接オブジェクトの追加・削除を行うことができる。

```js
// primitive
class DataStorage<T extends string | number | boolean> {
    private data: T = [];

    additem<U>(item: T) {
        this.data.push(item);
    }
}
```

## Utility of Generics

以下のように引数で受け取った値を使用して、定義しているインターフェースに従うオブジェクトを返す処理を考える。

この場合には、すべての値が正しく設定されていないとエラーが発生してしまう。

```js
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string, 
    description: string, 
    data: Data
): CourseGoal {
    return {
        title: title,
        description: description,
        completeUntil: date,
    };
}
```

そこで任意のプロパティをすべてOptionalに変更することができる`Partial`を使用する。

```js
function createCourseGoal(
    title: string, 
    description: string, 
    data: Data
): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    };
}
```

また異なる機能として、読み取り専用の性質を与えることもできる。
これは以下のように初期に宣言された配列に対して、異なる要素を追加したりしないようにすることができる。

```js
const names = ['matz', 'anna'];
names.push('manu');
```

このためには、変数に割当てる型に`ReadOnly`を設定し、対象の型をジェネリクスとして渡しておくことで、配列に要素を追加したり、削除したりできないようにしている。

```js
const names: ReadOnly<string[]> = ['matz', 'anna'];
names.push('manu');
```

## Generic & Union

UnionとGenericsの違いは、メソッドの呼び出し時などで毎回検証を行うか、クラスや関数全体で型を特定の物のみに制限したかの違いである。

```js
class DataStorage {
    private data: (string | number | boolean)[] = [];
    private data: string[] | number[] | boolean[] = [];

    addItem(item: string | number | boolean) {
        this.data.push(item);
    }
}
```

## references

- [ジェネリクス型](https://typescript-jp.gitbook.io/deep-dive/type-system/generics)