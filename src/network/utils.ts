import isArray from "lodash/isArray";

import { isNullOrEmpty } from "@/utils/method";

/**
 * convert object to query string
 * @param requestUrl: string url
 * @param params: object params
 */
export function getQueryString(
  requestUrl: string,
  params?: ObjectType
): string {
  if (typeof params === "object" && params) {
    const ret: string[] = [];
    for (const d of Object.keys(params)) {
      if (isArray(params[d])) {
        const arrayParams: string = `${d}=${params[d].join(",")}`;
        ret.push(arrayParams);
      } else {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(params[d]));
      }
    }

    if (ret.length > 0) {
      const retString = ret.join("&");
      if (requestUrl.includes("?")) {
        requestUrl = requestUrl + "&" + retString;
      } else {
        requestUrl = requestUrl + "?" + retString;
      }
    }
  }
  return requestUrl;
}

/**
 * convert object to request URL
 * @param requestUrl: string url
 * @param params: object params
 * @param queryString: object query string
 */
export function getRequestUrl(
  requestUrl: string,
  params?: GetRequestParams,
  queryString?: ObjectType
): string {
  if (typeof params === "object" && params) {
    if (params?.parentId) {
      requestUrl += "/" + params.parentId;
    }
    if (params?.partial) {
      requestUrl += "/" + params.partial;
    }
    if (params?.subId) {
      requestUrl += "/" + params.subId;
    }
    if (params?.action) {
      requestUrl += "/" + params.action;
    }
  }
  if (queryString && !isNullOrEmpty(queryString)) {
    return getQueryString(requestUrl, queryString);
  }
  return requestUrl;
}

export function getErrorMessage(error: any) {
  return error?.response?.data || "Có lỗi xảy ra";
}

export function deleteParamsNotUsing(params: any) {
  for (const key in params) {
    if (isNullOrEmpty(params[key]) && params[key] !== 0) {
      delete params[key];
    }
  }
}

export const formattedPhoneNumber = (phoneNumber: string) => {
  const phone = phoneNumber?.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
  return phone;
};
