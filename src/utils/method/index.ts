import { Platform } from "react-native";

/**
 * check whether string, array, object is empty, null or undefined
 * @param data
 * @returns {boolean}
 */
export function isNullOrEmpty(data: any | any[]): boolean {
  if (!data) {
    return true;
  }
  if (data === undefined) {
    return true;
  }
  if (data instanceof Array) {
    return data.length === 0;
  }
  if (typeof data === "number") {
    return data === 0;
  }
  if (typeof data === "undefined") {
    return true;
  }
  if (typeof data === "object") {
    return Object.keys(data).length === 0;
  }
  let output = data;
  if (typeof output !== "string") {
    output = output.toString();
  }
  output = output.trim();

  return output.length <= 0;
}

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
