import { DOMParser, Element } from "@b-fuze/deno-dom";

import { scrape } from "@panha/scrape";

export interface ProviderInterface {
  name: string;
  base_url: string;
  hot_url: string;
  search_url: string;
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
  search: MangaInterface[]
}

export interface QueryInterface {
  [key: string]: string
}


export class Provider {
  provider: ProviderInterface;
  manga_list: MangaListInterface = { hot: [], search: [] };
  
  constructor(name: string, provider: ProviderInterface) {
    this.provider = provider;
    if( !this.provider ) throw new Error("Provider not found");
  }

  getMangaList(): MangaListInterface {
    return this.manga_list;
  }

  async _scrape(url: string): Promise<any> {
    return await scrape(`${this.provider.base_url}${url}`);
  }
  async _paser(html: string) : Promise<any> {
    return new DOMParser().parseFromString(html, "text/html");
  }

  _query(param: QueryInterface): string {
    let param_text = "?";
    for(const key in param) {
      const value: string = param[key] || "";
      param_text += `${key}=${value}`;
    }
    return param_text;
  }
}