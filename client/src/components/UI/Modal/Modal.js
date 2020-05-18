import React from 'react';
import { Modal, Backdrop } from '@material-ui/core';
import {
    bool, element, func
} from 'prop-types';
import {Clear} from '@material-ui/icons';

import "./Modal.scss"

const modal = ({showModal, onClose, body}) => (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={onClose}
        className="modal"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            style: {
                backgroundColor: '#001F43',
                opacity: '0.25'
            },
            timeout: 500
        }}
    >
        <div className="paper">
            <div className="clear-icon" onClick={onClose}>{<Clear/>}</div>
            {body}
        </div>
    </Modal>
);

modal.propTypes = {
    showModal: bool.isRequired,
    body: element.isRequired,
    onClose: func.isRequired
};

export default modal;
