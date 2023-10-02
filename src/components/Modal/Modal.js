import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
	return isOpen ? (
		<div className="popup">
			<div className="popup-content trailer">
				<button onClick={onClose} className="btn btn-danger close-button">
					Close
				</button>
				{children}
			</div>
		</div>
	) : null;
};

export default Popup;
