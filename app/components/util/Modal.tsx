import { useNavigate } from "@remix-run/react";
import { PropsWithChildren, FC, useRef, useEffect } from "react";

const Modal: FC<PropsWithChildren> = ({ children }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const modal = modalRef.current;
        const controller = new AbortController();

        modal?.showModal();

        window.addEventListener(
            "click",
            (e) => {
                if (e.target === modal) {
                    navigate("..");
                    controller.abort();
                }
            },
            { signal: controller.signal }
        );

        window.addEventListener(
            "keydown",
            (e) => {
                if (e.key === "Escape") {
                    navigate("..");
                    controller.abort;
                }
            },
            { signal: controller.signal }
        );

        return () => {
            modal?.close();
            controller.abort();
        };
    }, [navigate]);

    return (
        <dialog className="modal" ref={modalRef}>
            {children}
        </dialog>
    );
};

export default Modal;
