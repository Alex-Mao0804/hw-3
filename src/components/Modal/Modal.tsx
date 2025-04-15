import { Modal as ModalMui } from "@mui/material";
import styles from "./Modal.module.scss";



type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentSlot: React.ReactNode;
};

const Modal = ({ open, setOpen, contentSlot }: ModalProps) => {
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalMui
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modal}>
        <div className={styles.modal__background} />
        {contentSlot}
      </div>
    </ModalMui>
  );
};

export default Modal;
