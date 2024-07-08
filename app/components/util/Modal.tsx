import { useNavigate } from "@remix-run/react";
import { PropsWithChildren, FC, useRef, useEffect } from "react";

const Modal: FC<PropsWithChildren> = ({ children }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        modalRef.current?.showModal();
        const controller = new AbortController();

        window.addEventListener(
            "click",
            (e) => {
                if (e.target === modalRef.current) {
                    navigate("..");
                    controller.abort();
                }
            },
            { signal: controller.signal }
        );

        return () => {
            modalRef.current?.close();
            controller.abort();
        };
    }, [modalRef]);

    return (
        <dialog className="modal" ref={modalRef}>
            {children}
        </dialog>
    );
};

export default Modal;
