# テンプレ

まずは以下のファイルを作成する。

```sh
index.html
app.ts
```

HTMLファイルでは、以下のタグを使用してコンパイルされたJavaScriptファイルを読み込むように設定しておく。

```html
<script src="app.js" defer></script>
```

`defer`をつけておくことで、JavaScriptファイルなどの外部ファイルのダウンロードとHTMLのパースを同時に実行し、HTMLのパースが終了した際にJSの実行をするように動作させることができる。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F41297%2F94f6efd2-1fbd-3d2c-8f80-ad17aaac4df6.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=74ec635cb4867a89f0dc79ed980cc578)

- [<script> タグに async / defer を付けた場合のタイミング](https://qiita.com/phanect/items/82c85ea4b8f9c373d684)
- [[MDN] <script>: スクリプト要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script)

次にHTMLを起動したうえで、Typescriptへの変更が即時にWebページに反映されるように、専用のWebサーバーを立ち上げておく。

```sh
# `--save-dev` は開発時にのみ使用するパッケージであることを示す。
> npm install --save-dev lite-server
```

あとは作成された`package.json`に対して、以下のスクリプトを追加してWebサーバーを起動する。

```json
"script": {
    "start": "lite-server"
}
```

`package-lock.json`のみが存在している場合には、以下のコマンドを使用して依存パッケージをインストールする。

```sh
> npm install
```

なお`lite-server`はデフォルトで3000番のポートを使用するため、VScodeのRemote Containerを使用して開発を行っている場合には対応するポートフォワードを指定しておく。
