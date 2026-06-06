import { Modal } from "../../modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => (
  <Modal
    isOpen={isOpen}
    image={require("@/assets/img/success.png")}
    bannerColor="#E8FF59"
    title="Вы успешно прошли регистрацию на мероприятие!"
    text="Вы можете вернуться к информации о мероприятии или найти что-то ещё."
    onClose={onClose}
  />
);
