import { Mangajikan } from "./providers/mangajikan.ts";

const mangajikan = new Mangajikan();

const manga_list = await mangajikan.getHot();

const tensura = await mangajikan.getMangaInfo(manga_list.filter(manga => manga.title === "転生したらスライムだった件")[0]);

// show manga info
console.log(`${mangajikan.provider.base_url}${tensura.chapters_url[0].url}`);

// show manga chapter 1 images
console.log(await mangajikan.getImage(tensura.chapters_url[0].url));