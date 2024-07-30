import { Modal } from '@mui/material';
import React from 'react';
import CreateCustomProduct from '../orders/CreateCustomProduct/CreateCustomProduct';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const ToolSwiftModal = ({ modal, setModal }) => {
  const getModalByName = (modalName) => {
    switch (modalName) {
      case 'CreateCustomProduct':
        return <CreateCustomProduct setModal={setModal} />;
    }
  };

  return (
    <Modal
      open={modal || false}
      onClose={() => setModal(null)}
      aria-labelledby={modal}
    >
      <div className="modalBox" style={style}>
        {getModalByName(modal)}
      </div>
    </Modal>
  );
};

export default ToolSwiftModal;
