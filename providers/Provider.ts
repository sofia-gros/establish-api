import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";

import { scrape } from "@panha/scrape/";

export interface ProviderInterface {
  name: string;
  base_url: string;
  hot_url: string;
  scrapes: any;
}

export interface MangaInterface {
  title: string;
  image: string;
  url: string;
  tags: string[];
  year: number | null;
  description: string | null;
  chapters_count: number | null;
  chapters_url: {url: string, number: number}[];
}

export interface MangaListInterface {
  hot: MangaInterface[];
}

export class Provider {
  provider: ProviderInterface;
  manga_list: MangaListInterface = { hot: [] };
  
  constructor(name: string, provider: ProviderInterface) {
    this.provider = provider;
    if( !this.provider ) throw new Error("Provider not found");
  }

  getMangaList(): MangaListInterface {
    return this.manga_list;
  }

  async _scrape(url?: string) {
    return await scrape(`${this.provider.base_url}${url}`);
  }
  async _paser(html) {
    return new DOMParser().parseFromString(html, "text/html");
  }
}