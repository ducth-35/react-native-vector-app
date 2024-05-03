export const validatePhoneNumber = (phone: string) => {
  if (!phone) {
    return "Vui lòng nhập số điện thoại!";
  } else {
    const check = phone.match(
      /^(((\+|)84)|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    );
    if (!check) {
      return "Số điện thoại không hợp lệ!";
    }
  }
  return "";
};
