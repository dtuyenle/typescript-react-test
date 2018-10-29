import * as React from 'react';

interface Modal {
  open: boolean,
  data?: string | JSX.Element,
  title?: string | JSX.Element,
  onClose?: () => void
}

const Modal: React.SFC<Modal> = (props) => {
  const {open, title, data} = props;
  return (<div className="modal-container">
    {open && <div className="modal-window">
      <div>
        <a onClick={props.onClose ? props.onClose.bind(this) : () => {}} title="Close" className="modal-close">Close</a>
        {title && <h1>{title}</h1>}
        <div>{data}</div>
      </div>
    </div>}
  </div>);
};

Modal.defaultProps = {
  open: false
};

export default Modal;