// import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
const StyledPinModal = styled(StyledModal)`
  min-width: 406px;
  .title,
  .desc {
    text-align: left;
  }
  .preview {
    border: 1px solid #f2f4f7;
    max-height: 256px;
    overflow: auto;
    background: none;
    overflow-x: hidden;
  }
`;
// import { useDispatch } from "react-redux";
// import BASE_URL from "../../app/config";
import { usePinMessageMutation } from "../../../app/services/message";
import StyledModal from "../styled/Modal";
import Button from "../styled/Button";
import Modal from "../Modal";
import PreviewMessage from "./PreviewMessage";

export default function PinMessageModal({ closeModal, mid = 0, gid = 0 }) {
  // const dispatch = useDispatch();
  const [pinMessage, { isLoading, isSuccess }] = usePinMessageMutation();
  const handlePin = () => {
    pinMessage({ mid, gid });
  };
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  if (!mid) return null;
  return (
    <Modal>
      <StyledPinModal
        // className="animate__animated animate__fadeInDown animate__faster"
        buttons={
          <>
            <Button onClick={closeModal} className="cancel">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handlePin} className="main">
              {isLoading ? "Pining" : `Pin It`}
            </Button>
          </>
        }
        title="Pin It"
        description="You sure you want to pin this message to #gerenal?"
      >
        <PreviewMessage mid={mid} />
      </StyledPinModal>
    </Modal>
  );
}
