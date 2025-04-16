import { Modal as ModalMui } from "@mui/material";
import styles from "./Modal.module.scss";
import clsx from "clsx";



type ModalProps = {
  className?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ open, setOpen, children, onClose, className }: ModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setOpen(false);
    }
  };
  return (
    <>
    <ModalMui
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={clsx(className, styles.modal)}>
        <div className={styles.modal__background} />
        {children}
      </div>
    </ModalMui>
    </>
  );
};

export default Modal;
