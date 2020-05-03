# 1

1. Reactとは？
2. Reactによって何が解決できる？

以下ではDOMとDataに焦点を当て、Reactが何をどのように解決しているのか見ていく。

## DOM

DOMを使ってVaniila JavaScriptで処理を記述する際の一番の課題は、DOMに特定の領域に従ってコードを記述する必要があるため、コードが乱雑に配置されてしまう可能性が高くなってしまう。

- [code](https://codepen.io/learnwebcode/pen/qBEKBwx?editors=1010)

## Data

Dataを使った手法では、レンダリングを行うようにしてすべてのUIをJavaScript上で行うことも可能であるが、UI部分が非常に複雑な構造になってしまい、またデータの一部を改変した場合、すべてのデータに関して再度レンダリングを行う必要があり非効率である。

- [code](https://codepen.io/learnwebcode/pen/XWJYWwg?editors=1010)

## React

Reactは2番目のDataを使った手法であり、Reactを使用することでDOMを介在させることなく、またデータが改変された部分にのみレンダリングを行うことが可能となる。

codepen上でreactを使うには、JSページの設定で外部パッケージをCDNで読み込むように指定する。必要なのは`react`と`react-DOM`になる。

- [code](https://codepen.io/learnwebcode/pen/BaybWKL?editors=1010)

```javascript
// a: 何をrenderしたいか
// b: どこにrenderしたいか
ReactDOM.render(a, b)

// <div id="app"></div>が対象の場合
ReactDOM.render(a, document.querySelector("#app"))

// 要素を作成する
// a: which element (which tag)
// b: 
// c: Content
React.createElement("h1", null, "Our Amazing App Header")

// すべてを考慮すると以下になる。
ReactDOM.render(React.createElement("h1", null, "Our Amazing App Header"), document.querySelector("#app"))
```

これで作成ができるが上記のやり方は一見して何をしているのかわかりづらい

```javascript
function OutApp() {
    return React.createElement("h1", null, "Our Amazing App Header")
}

// OurAppを別個に定義してレンダリングを行うようにする。
ReactDOM.render(React.createElement(outApp), document.querySelector("#app"))
```

あとはレンダリングを行う対象を変更していけばいい。

```javascript
function OutApp() {
    return React.createElement("div", null, [
        React.createElement("h1", null, "Our Amazing App Header")
    ])
}

// OurAppを別個に定義してレンダリングを行うようにする。
ReactDOM.render(React.createElement(outApp), document.querySelector("#app"))
```

Reactではデータを波括弧で囲うことで変数として扱い文字列の中に導入することが可能となる。
またその際にはダブルクォートではなくバッククォートで囲う。

```javascript
function OurApp() {
  return React.createElement("div", null, [
    React.createElement("h1", null, "Our Amazing App Header"),
    React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
    React.createElement("small", null, "Copyright Footer Text")
  ])
}

// OurAppを別個に定義してレンダリングを行うようにする。
ReactDOM.render(React.createElement(outApp), document.querySelector("#app"))
```

しかしこの状態ではデータが更新されたとしてもブラウザに反映されることがない。
Reactにはこの問題に対処できる機能もあるが、以下ではJavaScriptのアプローチを採用している。

```javascript
function OurApp() {
  return React.createElement("div", null, [
    React.createElement("h1", null, "Our Amazing App Header"),
    React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
    React.createElement("small", null, "Copyright Footer Text")
  ])
}

// OurAppを別個に定義してレンダリングを行うようにする。
// setInterval(a, b)
// a: 実行する関数
// b: 実行間隔をミリ秒で設定
setInterval(function() {
  ReactDOM.render(React.createElement(OurApp), document.querySelector("#app"))
}, 1000)
```

Reactでは特徴的な機能として上記のコードを実行した際に、データが変更されるたびにすべての要素が更新されることなく、対象の要素のみが更新される。

またReactではUI部分とレンダリング部分を分離できている。

実際には上記のようなコードは使用されておらずJSXを使用している。しかしJSXでは背景では上記のようなコードを実行している。

## JSX

JSXを使用すれば、HTMLと同じような感覚でUIを構築することができる。
JSXをcodepenで使用するにはJavascript PreprocessorにBabelを指定する。

- [code](https://codepen.io/learnwebcode/pen/LYEaLEe?editors=1010)

```javascript
// function OurApp() {
//   return React.createElement("div", null, [
//     React.createElement("h1", null, "Our Amazing App Header"),
//     React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
//     React.createElement("small", null, "Copyright Footer Text")
//   ])
// }

function OurApp() {
    return (
        // 1つのトップレベルエレメントのみが許可される
        <div>
            <h1>Out Amazing App Header</h1>
            <p>The current time is blank.</p>
            <small>Copyright Footer Text</small>
        </div>
    )
}
```

またJSXでCSSを適用するために、クラス名属性をつける場合にはキャメルケースを採用している。

```javascript
function OurApp() {
    return (
        // 1つのトップレベルエレメントのみが許可される
        <>
            // キャメルケースでの指定
            <h1 className="special">Out Amazing App Header</h1>
            // {}で変数を指定できる。
            <p>The current time is {new Date().toLocaleString()}.</p>
            <small>Copyright Footer Text</small>
        </>
    )
}
```

JSXのレンダリングを行う際には、先程から少し変更する。

```javascript
setInterval(function() {
    // OurAppでコンポーネントの指定が可能
    ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではUI部分をどのように細かく分割すればいいのか。

## Organization

ReactではUIを分割するためにコンポーネントを導入している。
これは例えば上記のコードに対してh1タグやpタグごとにUIを分割できる。

- [code](https://codepen.io/learnwebcode/pen/ZEYZyQb?editors=1010)

```javascript
function OurApp() {
    return (
        // 1つのトップレベルエレメントのみが許可される
        <>
            <OurHeader />
            // {}で変数を指定できる。
            <p>The current time is {new Date().toLocaleString()}.</p>
            <small>Copyright Footer Text</small>
        </>
    )
}

function OurHeader() {
    // 1要素しか無い場合は()は要らない
    return <h1 className="special">Our Amazing App Header</h1>
}
```

あとはこれを他のコンポーネントにも同様に適用すれば、UIとコンポーネントを細かく分割することが可能になる。

```javascript
function OurApp() {
  return (
    <>
      <OurHeader />
      <TimeArea />
      <Footer />
    </>
  )
}

function Footer() {
  return <small>Copyright Footer Text</small>
}

function TimeArea() {
  return <p>The current time is {new Date().toLocaleString()}.</p>
}

function OurHeader() {
  return <h1 className="special">Our Amazing App Header</h1>
}

setInterval(function() {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではこのコンポーネントにデータを適用するにはどうすればいいのか。

## Props

ReactでHTMLのように`<a href=>`のようにコンポーネントの属性を指定するにはどうすればいいでしょうか。

- [code](https://codepen.io/learnwebcode/pen/ExazaOd?editors=1010)

```javascript
function OurApp() {
  return (
    <>
        <ul>
            <Pet />
            <Pet />
            <Pet />
        </ul>
    </>
  )
}

// まずは変更の無いコンポーネントを作成する
function Pet() {
    return <li>This is a pet.</li>
}

setInterval(function() {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではHTMLのようにコンポーネントに対して属性を付与して挙動の確認を行う.


```javascript
function OurApp() {
  return (
    <>
        <ul>
            <Pet name="Meowsalot" species="cat" age="5" />
            <Pet name="Meowsalot" species="cat" age="5" />
            <Pet name="Meowsalot" species="cat" age="5" />
        </ul>
    </>
  )
}

// コンポーネントが引数を受取るように変更する。
function Pet() {
    return <li>{props.name} is a {props.species} and is {props.age} years old.</li>
}

setInterval(function() {
  ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
```

ではこのPetコンポーネントを数百もの個数を配置する必要が出てきた場合にはどうすればいいのか。

## Collection of Data

複数のデータを配列として格納することで、ループを使用することでReactのコンポーネントに属性を渡すことができる。

- [code1](https://codepen.io/learnwebcode/pen/gObJwwV?editors=1010)
- [code](https://codepen.io/learnwebcode/pen/oNgRjpo?editors=0010)

```javascript
const pets = [
    { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
    { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
    { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
    { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
    { name: "Paws", species: "dog", age: "6", id: 789789789 }
]
```

この配列をコンポーネントに渡すには、まずは配列の要素を順番に取得してコンポーネントの属性に流す形にする。

```js
function OurApp() {
  return (
    <>
        <ul>
            // javascriptのmapを使用すれば配列の各要素を抽出できる。
            // 最後のkeyはタグをいち
            // {pets.map(function(pet) {
            //     return <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />
            // })}
            {pets.map(pet => <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
        </ul>
    </>
  )
}
```

では次にはコンポーネントの状態を管理する方法を考える

## State

現状画面の更新にはReactDOMのrenderを使用して、手動で更新を管理していた。この場合、1秒間に時間の更新を行っているため問題は無いが、ユーザーのクリックでデータが変更された場合など、即時に変更を反映することができない。

そこで手動で更新するのでは状態管理機能を使用する。

- [code](https://codepen.io/learnwebcode/pen/oNgRQGw?editors=1010)

```js
// Reactで状態管理を行うための機能を指定する
// このuseStateで時間の状態管理を行い、変更を検知して更新を行う
const useState = React.useState

function TimeArea() {
    // const time = useState(new Date().toLocalString())
    // 上記はだめ。

    const [theTime, setTheTime] = useState(new Date().toLocalString())

    // データの更新を行うために1秒毎に関数を呼び出し、関数内で状態をSetする関数を呼び出す
    setTimeout(function() {
        setTheTime(new Data().toLocalString())
    }, 1000)

    return <p>The current time is {theTime}.</p>
}
```

なお`setTimeout`を使用することは最適な手法ではないが、後で最適な手法を学習する。

ではボタンのクリックなどを検知するためにはどうすればいいのか。

## Events

ではボタンを押すことでLikeやDislikeを増減させる機能を作成する。

- [code](https://codepen.io/learnwebcode/pen/BaygGmV?editors=1010)

```js
function LikeArea() {
    return (
        <>
            // ボタンの属性にボタンが押下された際に関数を実行する機能お作成した。
            <button onClick={increaseLikeHandler}>Increase likes</button>
            <button onClick={decreaseLikeHandler}>Decrease likes</button>
            <h2>This page has been liked {likeCount} times.</h2>
        </>
    )
}
```

では実際に関数を適用してみる。

```js
function LikeArea() {

    function increaseLikeHandler() {
        alert("Thanks for clicking me")
    }

    return (
        <>
            // ボタンの属性にボタンが押下された際に関数を実行する機能お作成した。
            <button onClick={increaseLikeHandler}>Increase likes</button>
            <button onClick={decreaseLikeHandler}>Decrease likes</button>
            <h2>This page has been liked {likeCount} times.</h2>
        </>
    )
}
```

実際にカウント数を管理するためには、`useState`を使用して初期値と状態管理関数を初期化する。

```js
function LikeArea() {

    // useStateで初期値を0に設定する。
    const [likeCount, setLikeCount] = useState(0)

    function increaseLikeHandler() {
        // 注意点は前回値から1を増大させる必要がある点
        // set関数を使用することで、前回値のlikeCountを受け取り1を足す
        setLikeCount(function(prev) {
            return prev + 1
        })
    }

    function decreaseLikeHandler() {
        // ES6で導入された機能を適用する
        setLikeCount(prev => {
            if (prev > 0) {
                return prev - 1
            }
            // カウントが0以下の場合には値を更新しないように
            return 0
        })
    }

    return (
        <>
            // ボタンの属性にボタンが押下された際に関数を実行する機能お作成した。
            <button onClick={increaseLikeHandler}>Increase likes</button>
            <button onClick={decreaseLikeHandler}>Decrease likes</button>
            <h2>This page has been liked {likeCount} times.</h2>
        </>
    )
}

```

では属性ではなく、ユーザーが直接コンポーネントに値を送るにはどうすればいいのか。

## Forms

ではForm機能を使用してユーザー入力を受け付けるように変更する。

- [code](https://codepen.io/learnwebcode/pen/dyPxzqj?editors=1010)
- [code](https://codepen.io/learnwebcode/pen/oNgrmQg?editors=0010)

```js
function AddPetForm() {

    // Webブラウザのデフォルト挙動としてform送信時にページ更新をしてしまう
    function handleSubmit(e) {
        // 送信時に自動的にページを更新しないように指定する
        e.preventDefault(e)
        alert("")
    }

  return (
    // 以下でsubmitの送信時に実行する関数を定義する
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input placeholder="Name" />
        <input placeholder="species" />
        <input placeholder="age in years" />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}
```

では次にFormで入力されたデータを保存するために`useState`を使用しましょう。
ただし更新対象は、あくまでpetオブジェクトであるため、petオブジェクトをまずは管理できるようにする。挙動としてFormの送信をした際に入力されたpetオブジェクトの値を取得して、set関数を対象のコンポーネントに渡すことで、渡した先のコンポーネントで値を更新する機能を持たせる。

```js
function OurApp() {
  const [pets, setPets] = useState([
  { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
  { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
  { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
  { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
  { name: "Paws", species: "dog", age: "6", id: 789789789 }
])
  
  return (
    <>
      <OurHeader />
      <LikeArea />
      <TimeArea />
      // 以下でset関数をそのまま属性として渡す   
      <AddPetForm setPets={setPets} />
      <ul>
        {pets.map(pet => <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
      </ul>
      <Footer />
    </>
  )
}

function AddPetForm(props) {
  
  function handleSubmit(e) {
    e.preventDefault()
    // 以下で前回値を受け取り、初期化された値を連結させる
    props.setPets(prev => prev.concat({name, species, age, id: Date.now()}))
    setName("")
    setSpecies("")
    setAge("")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input placeholder="Name" />
        <input placeholder="species" />
        <input placeholder="age in years" />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}
```

Reactではすべての値は`useState`で管理するため、Formの値をDOMから直接読み込むようなことはしない。その代わりに今までと同様に、設定値を保存するための変数とset関数を初期化する

```js
function AddPetForm(props) {
    // 状態管理ができるようにしておく
  const [name, setName] = useState()
  const [species, setSpecies] = useState()
  const [age, setAge] = useState()
  
  function handleSubmit(e) {
    e.preventDefault()
    // javascriptではキーと変数名が同じ場合はキーを省くことが可能
    props.setPets(prev => prev.concat({name, species, age, id: Date.now()}))
    setName("")
    setSpecies("")
    setAge("")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        // 変更を検知するためのonChange属性を指定して、検知したイベントからターゲットの値を抽出して、set関数に渡すようにする。
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        // またFormを送信した後に入力された値を初期化するために、表示する値をReactで状態管理している変数にしておき、OnSubmit関数を実行時に初期値に戻すようにしておけば、送信時に空白文字列に遷移する
        <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="species" />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="age in years" />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}
```

## useEffect

まずは追加したPetオブジェクトを画面から削除する機能を追加する。
そのために各要素を一意に示すIDと、petオブジェクトを更新するためのSet関数を渡す必要がある。

- [code](https://codepen.io/learnwebcode/pen/Exaqbvx?editors=1010)

```js

<ul>
    // setPetsとidを新たに引数で渡す属性に追加する
    {pets.map(pet => <Pet setPets={setPets} id={pet.id} name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
</ul>

// propsに新たにIDとSet関数が渡される。
function Pet(props) {
  function handleDelete() {
    //   filterでは条件に該当するものだけを抽出するため、対象のIDが含まれないように設定する。
    props.setPets(prev => prev.filter(pet => pet.id != props.id))
  }
  
  return (
    <li>{props.name} is a {props.species} and is {props.age} years old.
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}
```

これで画面からオブジェクトの削除などを実行することが可能となる。

現状はデータの定義はコード上にそのまま記載している。しかし実際にはデータをソースコード上に記載することなく管理し、またブラウザがリロードされてもデータが消えないようにする必要がある。

まずは以下のようにデータの初期化をから配列に指定する。

```js
const [pets, setPets] = useState([])
```

reactを使用することでローカルストレージにどのようにデータを保存するのか規定することが可能となる。具体的には`useEffect`を使用する。

```js
const useEffect = React.useEffect

// useEffect(a, b)
// a: 実行したい関数
// b: 監視対象の変数。変更が検知されたらコードを実行する
// only run once the first time this component is rendered
useEffect(() => {
    if (localStorage.getItem("examplePetData")) {
        setPets(JSON.parse(localStorage.getItem("examplePetData")))
    }
}, [])

// run every time our pet state changes
useEffect(() => {
    localStorage.setItem("examplePetData", JSON.stringify(pets))
}, [pets])
```

これでブラウザを落として、再度立ち上げてもまだデータが保持されていることがわかる。
また同様の手法で時間の更新に関しても1秒間の時間間隔での更新ではなく、状態の変化を検知してからの変更とする。

```js
function TimeArea() {
  const [theTime, setTheTime] = useState(new Date().toLocaleString())
  
  useEffect(() => {
    const interval = setInterval(() => setTheTime(new Date().toLocaleString()), 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return <p>The current time is {theTime}.</p>
}
```