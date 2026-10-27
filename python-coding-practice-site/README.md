# Python 第3回｜コーディング自習課題

## 概要

第3回（条件分岐・比較演算子・random）の翌週に実施する、講師不在50分の自習課題です。
第2回・第3回の授業サイトに合わせた赤い「P」のヘッダーと配色で、iPad・PC・スマートフォンに対応しています。

- 基本問題5問（if → if/else → if/elif/else → random → 総合問題）
- チャレンジ問題3問（宝箱5種類・大当たりゲーム・デバッグ）
- 出力例、段階式のヒント、必要時のみ展開するスタート用コード
- 生徒が自分でチェックする進捗表示（端末のブラウザにのみ保存）
- HTML/CSS/JavaScriptのみ。外部ライブラリ・ビルド不要
- ブラウザ上でPythonコードは実行しません。TechNexusで書いて実行します。

## GitHub Pagesへの配置

既存の `python-lesson3-site` リポジトリのルートに、**フォルダごと**コピーしてください。

```text
python-lesson3-site/
├── index.html                    （既存の授業資料サイト・変更しない）
├── assets/                       （既存の授業資料・変更しない）
└── python-coding-practice-site/  （今回追加するフォルダ）
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── favicon.svg
    └── README.md
```

公開URL（予想）:
https://nonakagw.github.io/python-lesson3-site/python-coding-practice-site/

**注意：** ZIP内のファイルをリポジトリ直下に置かないでください。既存の `index.html` と名前が重複します。

## ローカル確認

フォルダ内の `index.html` をブラウザで開くだけで表示できます。
ただし「授業資料」へのリンクは、公開先で親フォルダのトップページを開く相対リンク（`../`）なので、単独でローカルファイルを開いた場合は親ディレクトリの表示になります。

## チェック機能の注意

「動かせた！」は自己申告のチェックであり、コードの自動採点・データ送信ではありません。
ブラウザの設定によっては進捗が保存されない場合があります。

## 編集方法

- 問題文、出力例、ヒント： `index.html`
- 見た目： `styles.css`
- チェック・コピー機能： `app.js`
