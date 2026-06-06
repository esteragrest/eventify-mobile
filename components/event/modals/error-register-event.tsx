import { Modal } from "../../modal";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ErrorModal = ({ isOpen, onClose }: ErrorModalProps) => (
  <Modal
    isOpen={isOpen}
    //TODO: чекнуть есть ли картинка
    image={require("@/assets/img/error.png")}
    bannerColor="#C0A2E2"
    title="Ошибка регистрации"
    text="Попробуйте позже. Возможно, вы уже зарегистрированы."
    onClose={onClose}
  />
);
