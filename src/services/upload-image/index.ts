import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { MAX_FILE_SIZE } from "@/utils/enum";
import ToastUtils from "@/utils/toastUtils";
import { AxiosError } from "axios";
import { Platform } from "react-native";

type UploadServiceType = {
  useUploadImage: (
    onError?: (error: AxiosError<any> | Error | string, type: number) => void
  ) => {
    uploadImage: (file: any) => void;
  };
};
const typeErorr = {
  SHOW_ALERT: 0,
  OTHER: 1,
};

export const UploadService: UploadServiceType = {
  useUploadImage(
    onError?: (error: AxiosError<any> | Error | string, type: number) => void
  ): {
    uploadImage: (file: any) => Promise<any>; // Change the return type to Promise<any>
  } {
    const uploadImage = async (file: any) => {
      if (file.size > MAX_FILE_SIZE) {
        onError?.("Ảnh chỉ được phép nhỏ hơn 10MB", typeErorr.SHOW_ALERT);
        return Promise.reject("Ảnh chỉ được phép nhỏ hơn 10MB"); // Reject the promise with an error message
      }
      const body: any = new FormData();
      body.append("file", {
        name: "image",
        type: file.mime,
        uri:
          Platform.OS === "ios" ? file?.path?.replace("file://", "") : file?.path,
      });
      try {
        const response = await homeApi.uploadImage(body);
        if (response.status === RESPONSE_CODE.SUCCESS) {
          return Promise.resolve(response.data); // Resolve the promise with the response data
        } else {
          const messageError = getErrorMessage(response);
          ToastUtils.show(messageError?.message);
          return Promise.reject(messageError?.message); // Reject the promise with an error message
        }
      } catch (error) {
        ToastUtils.show("An error occurred while uploading the image");
        return Promise.reject("An error occurred while uploading the image"); // Reject the promise with a generic error message
      }
    };
    return { uploadImage };
  },
};
