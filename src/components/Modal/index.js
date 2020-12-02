import React from "react";
import './styles.css';

const Modal = ({ children, show, close }) => {

    return show ? (
        <div className="backdrop">
            <div className="modal">
                {close && (
                    <button className="close" onClick={close}>Fermer</button>
                )}
                {children}
            </div>
        </div>
    ) : null;
}

export default Modal;
