import { navigateAndSimpleReset } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { homeApi } from "@/network/api/homeApi";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { UploadService } from "@/services/upload-image";
import ToastUtils from "@/utils/toastUtils";
import { isUndefined } from "lodash";
import React from "react";

export const usePostResultsLearning = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { uploadImage } = UploadService.useUploadImage((error, type) => {
    if (type === 0) {
      ToastUtils.show(error as string);
      return;
    }
    ToastUtils.show("Có lỗi xảy ra, vui lòng thử lại sau");
  });
  const uploadResultsLearning = async (
    file: any,
    params: ResultsLearningParams
  ) => {
    setLoading(true);
    try {
      const newParams = {
        ...params,
      };
      if (!isUndefined(file)) {
        const results: any = await uploadImage(file);
        const fileName = results?.data?.fileName;
        newParams.assignments = fileName
      }
      const response = await homeApi.postResultLearning(newParams);
      if (response?.status === RESPONSE_CODE.SUCCESS) {
        navigateAndSimpleReset(APP_SCREEN.MAIN_TAB);
        setLoading(false);
      } else {
        const messageError = getErrorMessage(response);
        ToastUtils.show(messageError?.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return {
    loading,
    uploadResultsLearning,
  };
};
