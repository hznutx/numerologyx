'use client';
import {Modal, ModalContent} from "@heroui/react";
import {Children, ReactElement} from 'react';

interface IModal {
  children: ReactElement<any, any>;
  isOpen: boolean;
  onOpenChange: () => void;
}

const ModalPopup: React.FC<IModal> = ({isOpen, onOpenChange}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>{(onClose) => <>{Children}</>}</ModalContent>
      </Modal>
    </>
  );
};

export default ModalPopup;
