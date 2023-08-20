import { Observable, Subscriber } from "rxjs";
import AdvertisementService from "./AdvertisementService";
import RequestMethod from "../../model/RequestMethod";
import { Advertisement } from "../../config/advertisement-config";
import Parameter from "../../model/Parameter";

const POLLER_INTERVAL = 3000;

function getHeaders(): HeadersInit {
  const res: HeadersInit = {
    'Content-Type': 'application/json',
  }
  return res;
}

function getResponseText(response: Response): string {
  let res = '';
  if (!response.ok) {
    const { status, statusText } = response;
    res = status == 401 || status == 403 ? 'Authentication' : statusText;
  }
  return res;

}

class Cache {
  cacheString: string = '';
  set(advertisements: Advertisement[]): void {
    this.cacheString = JSON.stringify(advertisements);
  }
  reset() {
    this.cacheString = ''
  }
  isEqual(advertisements: Advertisement[]): boolean {
    return this.cacheString === JSON.stringify(advertisements)
  }
  getCache(): Advertisement[] {
    return !this.isEmpty() ? JSON.parse(this.cacheString) : []
  }
  isEmpty(): boolean {
    return this.cacheString.length === 0;
  }
}

async function fetchRequest(url: string, options: RequestInit, ad?: Advertisement): Promise<Response> {
  options.headers = getHeaders();
  if (ad) {
    options.body = JSON.stringify(ad);
  }
  let flUpdate = true;
  let responseText = '';
  try {
    if (options.method == "DELETE" || options.method == "PUT") {
      flUpdate = false;
      await fetchRequest(url, { method: "GET" });
      flUpdate = true;
    }
    const response = await fetch(url, options);
    responseText = getResponseText(response);

    if (responseText) {
      throw responseText;
    }
    return response;
  } catch (error: any) {
    if (!flUpdate) {
      throw error;
    }
    throw responseText ? responseText : "Server is unavailable. Repeat later on";
  }
}

async function fetchAllAdvertisements(url: string): Promise<Advertisement[]> {
  const response = await fetchRequest(url, {});
  const res: Advertisement[] = await response.json();
  return res.map(convertAd);
}

function convertAd(ad: Advertisement): Advertisement {
  ad.publicationDate = new Date(ad.publicationDate!)
  return ad
}

function getOptions(method: RequestMethod, body?: any): RequestInit {
  const res: RequestInit = {};
  res.headers = getHeaders();
  res.method = method;
  if (body) {
    res.body = JSON.stringify(body)
  }
  return res
}

export default class AdvertisementServiceImpl implements AdvertisementService {
  private observable: Observable<Advertisement[]> | null = null;
  private cache: Cache = new Cache();

  constructor(private url: string) { }

  async getCategories(): Promise<string[]> {
    const categoriesUrl = this.url + "/categories"
    return (await fetchRequest(categoriesUrl, {})).json()
  }

  async addAdvertisement(ad: Advertisement): Promise<Advertisement> {
    const addUrl = this.url + "/add"
    const options: RequestInit = {
      method: RequestMethod.POST,
    }
    const res = await fetchRequest(addUrl, options, ad);
    return await res.json();
  }

  async getAllAdvertisements(params: Parameter): Promise<Advertisement[]> {
    const getAllUrl = this.url + "/get_all" + getParams(params)
    console.log(getAllUrl)
    const response = await fetchRequest(getAllUrl, {});
    const res: Advertisement[] = await response.json();
    return res.map(convertAd);
  }

  private sibscriberNext(url: string, subscriber: Subscriber<Advertisement[]>): void {
    console.log(url)
    fetchAllAdvertisements(url).then(advertisements => {
      if (this.cache.isEmpty() || !this.cache.isEqual(advertisements as Advertisement[])) {
        this.cache.set(advertisements as Advertisement[]);
        subscriber.next(advertisements);
      }

    })
      .catch(error => subscriber.next(error));
  }

  deleteAdvertisement(id: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateAdvertisement(ad: Advertisement): Promise<Advertisement> {
    throw new Error("Method not implemented.");
  }

}

function getParams(params: Parameter): string {
  console.log(params)
  const res = Object.entries(params).filter(entry => !!entry[1]).map(entry => `${entry[0]}=${entry[1]}`).join("&")
  return res.length != 0 ? "?" + res : ""
}
