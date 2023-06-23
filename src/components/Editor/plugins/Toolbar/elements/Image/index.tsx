import { useState } from 'react';

import { Item } from '../Item';
import { UploadFile, UploadUrl } from '../Uploaders';
import { Modal } from 'components/Modal';

import styles from './index.module.css'

export const Image = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputType, setInputType] = useState<'file' | 'url' | null>(null);

    const handleModalClose = () => {
        setModalOpen(false);
        setInputType(null);
    }

    return (
        <>
            <Item onClick={() => setModalOpen(true)}>
                Img
            </Item>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            >
                <div className={styles.root}>
                    {!inputType && (
                        <div className={styles.inputBox}>
                            <div className={styles.button} onClick={() => setInputType('url')}>URL</div>
                            <div className={styles.button} onClick={() => setInputType('file')}>File</div>
                        </div>
                    )}
                    {inputType === 'url' && <UploadUrl onSubmit={handleModalClose} />}
                    {inputType === 'file' && <UploadFile onSubmit={handleModalClose} />}
                </div>
            </Modal>
        </>
    );
}
