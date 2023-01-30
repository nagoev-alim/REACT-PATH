const Modal = ({ modalOpen, handleClick, children }) => (
  <div className={`backdrop ${modalOpen ? 'open' : 'hidden'}`} onClick={handleClick}>
    <div className='modal' onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default Modal;
