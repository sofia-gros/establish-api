import { Mangajikan } from "./providers/mangajikan.ts";

const mangajikan = new Mangajikan();

// const manga_list = await mangajikan.getHot();

// const tensura = await mangajikan.getMangaInfo(manga_list.filter(manga => manga.title === "転生したらスライムだった件")[0]);

// // show manga info
// console.log(tensura);

// // show manga chapter 1 images
// console.log(await mangajikan.getImage(tensura.chapters_url[0].url));

const manga_list = await mangajikan.search("転生したらスライム");
console.log(manga_list)
