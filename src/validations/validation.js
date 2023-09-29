class Validation {
  validateRequired = (value, ref, mess) => {
    if (value) {
      ref.innerHTML = "";

      return true;
    }
    ref.innerHTML = mess;

    return false;
  };

  validateFullName = (value, ref, mess) => {
    let letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      ref.innerHTML = "";

      return true;
    }
    ref.innerHTML = mess;

    return false;
  };

  validateConfirmPassword = (state_1, state_2, ref, mess) => {
    if (state_1 !== state_2) {
      ref.innerHTML = mess;

      return false;
    }
    ref.innerHTML = "";

    return true;
  };

  validateWithRegex = (value, ref, mess, regex) => {
    if (regex.test(value)) {
      ref.innerHTML = "";

      return true;
    }
    ref.innerHTML = mess;

    return false;
  };

  validateWithRegexAdmin = (value, regex) => {
    if (regex.test(value)) {
      return true;
    }
    return false;
  };

  validateRequiredAdmin = (value) => {
    if (value.trim() === "") {
      return true;
    }
    return false;
  };
}

export const validation = new Validation();
