# Establish API

## 概要
漫画サイトから漫画をスクレイプします。

## 画像

[サンプル](https://cdn.discordapp.com/attachments/1329080245399195744/1331453244093890632/024E077F-904E-4CB4-97D3-FD756705015E.png?ex=6791abf6&is=67905a76&hm=affa3ad6242b997ec755fae56d81cf7482593f38c463daf5c3721ec170bbb04e& "サンプル")
[サンプル](https://cdn.discordapp.com/attachments/1329080245399195744/1331453244542550067/5FB59C63-514B-4324-82A4-1B7493682725.png?ex=6791abf6&is=67905a76&hm=072558febae678ba8a4b215a9f25bbdd74bb36a323ea9ef035118e086f26046e& "サンプル")
[サンプル](https://cdn.discordapp.com/attachments/1329080245399195744/1331477394418307093/B8EF4C32-894C-45A5-A233-095B2D1350F9.png?ex=6791c274&is=679070f4&hm=5646996f1b6e8f4e4013a807d79494d753ece164d4227dd44f4bf119d56bbd82& "サンプル")
[サンプル](https://cdn.discordapp.com/attachments/1329080245399195744/1331477394799853708/10CAA6B5-84BE-4A36-ACF5-6618F86243AC.png?ex=6791c274&is=679070f4&hm=27f4d43e78e44cc346e2df674130d196c945a1326fed335dc7b302232fa30611& "サンプル")
[サンプル](https://cdn.discordapp.com/attachments/1329080245399195744/1331477395315888149/82DE395B-0E8C-42D9-8349-89CA0F24B5EA.png?ex=6791c274&is=679070f4&hm=e749a14830d167fe314c1310ec197f7eb9d995493e2a6231d9bef97ef1f7054f& "サンプル")

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