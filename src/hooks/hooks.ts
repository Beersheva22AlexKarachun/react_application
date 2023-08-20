import { useDispatch } from "react-redux";
import CodePayload from "../model/CodePayload";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/codeSlice";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";

import { adService } from "../config/service-config";
import { Advertisement } from "../config/advertisement-config";
import Parameter from "../model/Parameter";

export function useDispatchCode() {
  const dispatch = useDispatch();
  return (error: string, successMessage: string) => {
    let code: CodeType = CodeType.OK;
    let message: string = '';

    if (error.includes('Authentication')) {

      code = CodeType.AUTH_ERROR;
      message = "Authentication error, mooving to Sign In";
    } else {
      code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
        CodeType.UNKNOWN;
      message = error;
    }
    dispatch(codeActions.set({ code, message: message || successMessage }))
  }
}
// export function useSelectorAdvertisements(params: Parameter) {
//   const dispatch = useDispatchCode();
//   const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

//   useEffect(() => {
//     console.log(params)
//     const subscription: Subscription = adService.getAllAdvertisements(params)
//       .subscribe({
//         next(adsArray: Advertisement[] | string) {
//           let errorMessage: string = '';
//           if (typeof adsArray === 'string') {
//             errorMessage = adsArray;
//           } else {
//             setAdvertisements(adsArray);
//           }
//           dispatch(errorMessage, '');
//         }
//       });
//     return () => subscription.unsubscribe();
//   }, [params]);
//   return advertisements;
// }
