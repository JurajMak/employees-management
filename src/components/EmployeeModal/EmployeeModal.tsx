import React from 'react';
import { Modal, ModalClose, ModalContent, ModalFooter, ModalTitle } from '../Modal';
import { Button } from '../Button';
import { Employee } from '@/service/models/employees';

type OwnProps = {
  isOpened: boolean;
  handleClose: () => void;
  employee: Employee | null;
};

const EmployeeModal: React.FC<OwnProps> = ({ isOpened, handleClose, employee }) => {
  return (
    <Modal open={isOpened} onOpenChange={handleClose}>
      <ModalContent className="overflow-y-auto max-w-screen max-h-[calc(100dvh)] xl:max-h-[calc(90dvh)] xl:my-4  xl:py-12  xl:max-w-[700px] ">
        <ModalTitle className="text-xl flex flex-col xl:flex-row gap-12  mb-12">
          <img
            src={employee?.imageUrl}
            alt={employee?.firstName}
            className="object-cover w-60 h-60 m-auto rounded-full"
          />
          <div className="flex flex-col gap-2 m-auto">
            <div className="flex">
              <div>{employee?.firstName}</div>
              <div>{employee?.lastName}</div>
              <div>{employee?.address}</div>
            </div>

            <div className="font-normal">Position: {employee?.position}</div>
            <div className="font-normal text-lg">Contact: {employee?.contactNumber}</div>
            <div className="font-normal text-lg">Email: {employee?.email}</div>
          </div>
        </ModalTitle>
        <div className="font-normal">{employee?.about}</div>

        <ModalFooter>
          <ModalClose asChild>
            <Button type="button" variant="default" className="mt-12" onClick={handleClose}>
              Back
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeModal;
