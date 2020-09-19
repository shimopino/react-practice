/*
nodemonというパッケージを使用すると、起動させたJavaScriptの監視を行い
変更を検知すると自動的に反映することができる。
*/
setInterval(() => {
    console.log(".5 second has passed")
}, 500);