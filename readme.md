# Establish API

## 概要
漫画サイトから漫画をスクレイプします。

## 構成
denoを使用しています

## 目的
勉強のためです。

## ドキュメント
demo.ts をご覧ください。

構成的に、`MangaListInterface`や`MangaInterface`に情報が蓄積される形なので、
一度取得した情報はキャッシュされるような形にしています。

キャッシュを更新する場合は Provider classを再度newしてください。

```bash
deno run --allow-env --allow-net demo.ts
deno run --allow-env --allow-net --allow-ffi --allow-read --allow-write --allow-run terminal.ts
```