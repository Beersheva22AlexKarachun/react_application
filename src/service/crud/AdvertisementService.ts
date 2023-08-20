import { Observable } from "rxjs";
import { Advertisement } from "../../config/advertisement-config";
import Parameter from "../../model/Parameter";

export default interface AdvertisementService {
  addAdvertisement(ad: Advertisement): Promise<Advertisement>;
  getAllAdvertisements(params:Parameter): Promise<Advertisement[]>;
  deleteAdvertisement(id: any): Promise<void>;
  updateAdvertisement(ad: Advertisement): Promise<Advertisement>;
  getCategories(): Promise<string[]>;
}