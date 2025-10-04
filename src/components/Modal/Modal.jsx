import { useEffect } from "react";
import { Overlay, ModalSt, Image } from "./Modal"


export default function Modal({ img, onClose }) {
  useEffect(() => {
    const closeByEsc = e => e.code === "Escape" && onClose();
    window.addEventListener("keydown", closeByEsc);
    return () => window.removeEventListener("keydown", closeByEsc);
  }, [onClose]);

  const handleClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalSt >
        <Image src={img} alt="" />
      </ModalSt>
    </Overlay>
  );
}