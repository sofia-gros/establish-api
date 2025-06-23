# Establish API

## 概要
漫画サイトから漫画をスクレイプします。

## 構成
denoを使用しています

## 目的
勉強のためです。

## ドキュメント

```ts
import { Mangajikan } from "./providers/mangajikan.ts";

const mangajikan = new Mangajikan();

// 今話題の作品リスト
const manga_list = await mangajikan.getHot();

// 検索 (keyword)
const manga_list = await mangajikan.search("転生したら");

// 漫画情報 (manga_list[x])
const tensura = await mangajikan.getMangaInfo(manga_list.filter(manga => manga.title === "転生したらスライムだった件")[0]);

// チャプターの画像取得 (chapter number)
console.log(await mangajikan.getImage(tensura.chapters_url[0].url));
```

構成的に、`MangaListInterface`や`MangaInterface`に情報が蓄積される形なので、
一度取得した情報はキャッシュされています。

キャッシュを更新する場合は Provider classを再度newしてください。

**今後、仕様変更や構成変更の可能性が高いです。**

```bash
deno run --allow-env --allow-net demo.ts
deno run --allow-env --allow-net --allow-ffi --allow-read --allow-write --allow-run terminal.ts
```

## お知らせ
Mangajikanは閉鎖された為、クローンサイトのリンクを登録してみます。動くかどうかは保証しません
