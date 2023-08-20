import InputResult from "../../model/InputResult";

import { useDispatchCode } from "../../hooks/hooks";
import { Advertisement } from "../../config/advertisement-config"

import CommonAdvertisementForm from "../forms/CommonAdvertisementForm";
import { adService } from "../../config/service-config";
import { alertActions } from "../../redux/slices/alertSlice";
import StatusType from "../../model/StatusType";
import { useDispatch } from "react-redux";

const AddAdvertisement: React.FC = () => {
  let successMessage: string = '';
  let errorMessage = '';

  async function submitFn(ad: Advertisement): Promise<InputResult> {
    console.log(ad)
    const res: InputResult = { status: StatusType.SUCCESS, message: '' };
    try {
      ad = await adService.addAdvertisement(ad);
      res.message = `Advertisement "${ad.name}" has been added`
    } catch (error: any) {
      res.message = error;
    }
    return res;
  }
  return <CommonAdvertisementForm submitFn={submitFn} />
}
export default AddAdvertisement;