import { MangaInterface, MangaListInterface, Provider, ProviderInterface } from "./Provider.ts";

const provider: ProviderInterface = {
  name: "mangajikan",
  base_url: "https://mangajikan.com",
  hot_url: "/custom/top",
  search_url: "/search",
  scrapes: {
    hot: {
      url: "/custom/top",
      list: "ul.ranking-list > li.ranking-item",
      title: ".ranking-item-info > h4.text-overflow",
      image: ".ranking-item-left .ranking-item-cover .img-wrapper",
      image_attr: "data-original",
      next_url: "a.text-overflow",
    },
    info: {
      chapter_list: ".episode-box .ewave-playlist-item",
      tags: "span.col-xs-12:nth-child(2) > a",
      year: ".col-xs-6.col-md-4.text-overflow",
      description: "div.vod-list:nth-child(2) > div:nth-child(2) > p:nth-child(1)",
    },
    getimg: ".more-box > .img img"
  }
}

export class Mangajikan extends Provider {
  constructor() {
    super("mangajikan", provider);
  }

  /**
   * 
   * @returns Promise<MangaInterface[]>
   * @description ホットな漫画を取得
   */
  async getHot(): Promise<MangaInterface[]> {
    const _scrape = await this._scrape(this.provider.hot_url);
    const _scrape_html_list = await _scrape.html(this.provider.scrapes.hot.list);
    if(!_scrape_html_list.length) throw new Error("Scrape html not found");
    this.manga_list.hot = [];
    for(const _scrape_html of _scrape_html_list) {
      const dom = await this._paser(_scrape_html);
      const title = dom.querySelector(this.provider.scrapes.hot.title)?.textContent || "";
      const image = dom.querySelector(this.provider.scrapes.hot.image)?.getAttribute(this.provider.scrapes.hot.image_attr) || "";
      const url = dom.querySelector(this.provider.scrapes.hot.next_url)?.getAttribute("href") || "";
      this.manga_list.hot.push({title, image, url, tags: [], year: 0, description: null, chapters_count: null, chapters_url: []});
    }
    return this.manga_list.hot;
  }

  /**
   * 
   * @param manga 
   * @returns Promise<MangaInterface>
   * @description 漫画の詳細情報を取得
   */
  async getMangaInfo(manga: MangaInterface): Promise<MangaInterface> {
    const _scrape = await this._scrape(manga.url);
    const _scrape_html = await _scrape.html("body")[0];
    const dom = await this._paser(_scrape_html);
    // タグリスト
    const dom_tags = dom.querySelectorAll(this.provider.scrapes.info.tags);
    for (const dom_tag of dom_tags) {
      manga.tags.push(dom_tag.textContent);
    }
    // 年代
    manga.year = dom.querySelector(this.provider.scrapes.info.year)?.textContent ? parseInt(dom.querySelector(this.provider.scrapes.info.year)?.textContent?.replace(/[^0-9]/g, "")) : null;
    // 説明
    manga.description = dom.querySelector(this.provider.scrapes.info.description)?.textContent || null;
    const chapter_list = dom.querySelectorAll(this.provider.scrapes.info.chapter_list);
    if (chapter_list.length) {
      manga.chapters_count = chapter_list.length;
      manga.chapters_url = [];
      for (const chapters of chapter_list) {
        const chapter = chapters.querySelector("a");
        manga.chapters_url.push({
          url: chapter.getAttribute("href") || "",
          number: parseInt(chapter.textContent?.replace(/[^0-9]/g, "")) || 0
        });
      }
    }
    return manga;
  }

  /**
   * 
   * @param keyword: string
   * @return Promise<MangaInterface[]>
   * @description 漫画の検索
   */
  async search(keyword: string): Promise<MangaInterface[]> {
    console.log(this.provider.search_url + this._query({ key: keyword }));
    const _scrape = await this._scrape(this.provider.search_url + this._query({ key: keyword }));
    const _scrape_html = await _scrape.html(".vod-list > ul.row")[0];
    const dom = await this._paser(_scrape_html);
    
    this.manga_list.search = [];

    const manga_list = dom.querySelectorAll("li");

    for(const manga of manga_list) {
      const title = manga.querySelector(".name a")?.textContent || "";
      const image = manga.querySelector(".pic .img-wrapper")?.getAttribute("data-original") || "";
      const url = manga.querySelector(".pic a")?.getAttribute("href") || "";
      this.manga_list.search.push({title, image, url, tags: [], year: 0, description: null, chapters_count: null, chapters_url: []});
    }
    return this.manga_list.search;
  }

  /**
   * 
   * @param chapter_url 
   * @returns Promise<string[]>
   * @description 漫画の画像を取得
   */
  async getImage(chapter_url: string): Promise<string[]> {
    const _scrape = await this._scrape(chapter_url);
    const _scrape_html = await _scrape.html("body")[0];
    const dom = await this._paser(_scrape_html);
    const dom_images = dom.querySelectorAll(this.provider.scrapes.getimg);
    const images: string[] = [];
    for (const dom_image of dom_images) {
      images.push(dom_image.getAttribute("src") || "");
    }
    return images;
  }

}
