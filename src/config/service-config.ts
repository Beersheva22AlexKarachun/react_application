import AdvertisementService from "../service/crud/AdvertisementService";
import AdvertisementServiceImpl from "../service/crud/AdvertisementServiceImpl";
import { baseUrl } from "./advertisement-config";

export const adService: AdvertisementService = new AdvertisementServiceImpl(baseUrl);