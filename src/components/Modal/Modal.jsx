import { useEffect, useCallback } from "react";
import { Overlay, ModalSt, Image } from "./Modal"


export default function Modal({ img, onClose }) {
  const closeByEsc = useCallback(
    (e) => {
      if (e.code === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", closeByEsc);
    return () => window.removeEventListener("keydown", closeByEsc);
  }, [closeByEsc]);

  const handleClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <Overlay onClick={handleClick}>
      <ModalSt>
        <Image src={img} alt="" />
      </ModalSt>
    </Overlay>
  );
}