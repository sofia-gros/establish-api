import { Confirm, Input, Select } from "https://deno.land/x/cliffy@v0.25.7/prompt/mod.ts";
import { MangaInterface, ProviderInterface } from "./providers/Mangajikan.ts";

import { Mangajikan } from "./providers/Mangajikan.ts";
import { WebUI } from "https://deno.land/x/webui/mod.ts";

async function Terminal() {

  let provider: ProviderInterface;
  let manga_list: MangaInterface[];
  let manga_info: MangaInterface;
  
  // プロバイダーの選択
  const action_provider = await Select.prompt({
    message: "プロバイダーの選択",
    options: [
      { name: "Mangajikan", value: "mangajikan" },
      { name: "終了", value: "exit" },
    ],
  });

  // プロバイダーの選択の確認
  switch (action_provider) {
    case "mangajikan":
      provider = new Mangajikan();
      break;
    case "exit":
      return;
  }

  // メニュー選択
  const action = await Select.prompt({
    message: "どこから探しますか？",
    options: [
      { name: "今話題の漫画", value: "hot" },
      { name: "検索", value: "search" },
      { name: "終了", value: "exit" },
    ],
  });

  // メニュー選択の確認
  switch (action) {
    case "hot":
      manga_list = await provider.getHot();
      break;
    case "search":
      const keyword = await Input.prompt("検索ワードを入力してください");
      manga_list = await provider.search(keyword);
      break;
    case "exit":
      return;
  }

  // 漫画の選択
  const action_manga = await Select.prompt({
    message: "漫画を選択してください",
    options: [...manga_list.map(manga => manga.title),
       { name: "終了", value: "exit" }],
  });

  // 漫画の選択の確認
  switch (action_manga) {
    case "exit":
      return;
    default:
      manga_info = await provider.getMangaInfo(manga_list.find(manga => manga.title === action_manga));
      console.log("タイトル: ", manga_info.title);
      console.log("年代: ", manga_info.year);
      console.log("説明: ", manga_info.description);
      console.log("タグ: ", manga_info.tags.join(", "));
      console.log("チャプター数: ", manga_info.chapters_count);
  }

  const chapters: { name: string, value: number }[] = [];
  for (const chapter of manga_info.chapters_url) {
    chapters.push({
      name: chapter.number.toString() + "話",
      value: chapter.number.toString(),
    });
  }

  // チャプターの選択
  const action_manga_chapter = await Select.prompt({
    message: "チャプターを選択してください",
    options: [...chapters,
      { name: "終了", value: "exit" },
    ],
  });

  // チャプターの選択の確認
  switch (action_manga_chapter) {
    case "exit":
      return;
    default:
      await GUI(provider, manga_info, action_manga_chapter);
      break;
  }

  // const _ = await Select.prompt({
  //   message: "操作を選択してください",
  //   options: [
  //     { name: "次のチャプター", value: "next_chapter" },
  //     { name: "終了", value: "exit" },
  //   ],
  // });

  // switch (_) {
  //   case "next_chapter":
  //     await GUI(provider, manga_info, action_manga_chapter + 1);
  //     break;
  //   case "exit":
  //     return;
  // }
  
}

Terminal();

const win = new WebUI();
async function GUI(provider, manga_info, chapter_number: number) {
  try {
    const images = await provider.getImage(manga_info.chapters_url[chapter_number - 1].url);
    const imageTags = images.map(image => `<img src="${image}" />`);

    const html = `
      <html>
        <head>
          <title>${manga_info.title}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body>
          ${imageTags.join("\n")}
        </body>
      </html>
    `;
    win.show(html);
    console.log("GUIを表示中...");
    await WebUI.wait();
    console.log("GUIが閉じられました");
  } catch (error) {
    console.error("GUIエラー:", error);
  }
}



// // // 名前の入力
// // const name = await Input.prompt("あなたの名前は？");

// // // メニュー選択
// // const action = await Select.prompt({
// //   message: "何をしますか？",
// //   options: [
// //     { name: "画像を表示", value: "show_image" },
// //     { name: "データを編集", value: "edit_data" },
// //     { name: "終了", value: "exit" },
// //   ],
// // });

// // // 確認メッセージ
// // if (await Confirm.prompt("続けますか？")) {
// //   console.log(`${name} さんが選んだアクション: ${action}`);
// // } else {
// //   console.log("キャンセルされました。");
// // }