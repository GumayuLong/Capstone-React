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

	validateEmail = (value, ref, mess) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
			ref.innerHTML = "";

			return true;
		}
		ref.innerHTML = mess;

		return false;
	};

	validatePhoneNumber = (value, ref, mess) => {
		if (/^\d+$/.test(value)) {
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
}

export const validation = new Validation();
