import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


const Popup = ({ isOpen, onClose, children }) => {
	return isOpen ? (
		<div className="popup">
			<div className="popup-content trailer">
				{/* <button onClick={onClose} className="btn close-button"> */}
				<FontAwesomeIcon
					className="close-button"
					onClick={onClose}
					icon={faX}
				/>
				{/* </button> */}
				{children}
			</div>
		</div>
	) : null;
};

export default Popup;
