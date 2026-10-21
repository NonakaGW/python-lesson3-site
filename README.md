# python-lesson3-site

中学生向けPythonプログラミング第3回「条件によって動きを変えよう！」のスライド閲覧サイトです。

- **内容**：授業スライド37枚を1枚ずつ閲覧（目次、一覧、拡大、左右スワイプに対応）
- **確認テスト**：なし（資料閲覧専用）
- **環境**：静的HTML / CSS / JavaScript（npm・サーバー処理・外部ライブラリ不要）
- **対応**：iPad / スマートフォン / PC

## 公開方法（GitHub Pages）

1. GitHubで **`python-lesson3-site`** という新しいPublicリポジトリを作成します。
2. ZIPを展開し、**`python-lesson3-site/` の中身**（`index.html`、`styles.css`、`script.js`、`assets/`、`.nojekyll` など）をリポジトリの**直下**にアップロードしてください。
3. GitHubの **Settings → Pages** で、**Deploy from a branch → main → /(root)** を選択して保存します。
4. 公開が反映されると、次のURLで表示できます：

   https://nonakagw.github.io/python-lesson3-site/

既存の `python-lesson2-site` は変更不要です。

## ファイル構成

```text
python-lesson3-site/
├── index.html             スライド閲覧ページ
├── styles.css             デザイン
├── script.js              ページ送り・拡大・一覧
├── .nojekyll              GitHub Pages用
└── assets/
    ├── lesson3.pdf        元の授業スライド（37枚）
    ├── slide-data.js      スライド名・章情報
    ├── favicon.svg
    ├── slides/            閲覧用WebP（37枚）
    └── thumbs/            一覧用サムネイル（37枚）
```

## 動作確認

`index.html` をブラウザで開くだけでも基本機能は動きます。ローカルでWebサーバーを使う場合は、フォルダ内で `python -m http.server 8000` を実行し `http://localhost:8000/` で確認できます。

すべてのファイルを相対パスで参照しているため、GitHub Pagesのサブパスでそのまま動作します。
