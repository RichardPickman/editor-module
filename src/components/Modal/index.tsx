import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.css';


interface Props {
    children: ReactNode,
    isOpen: boolean,
    type?: 'default' | 'float',
    size?: 'auto' | 'screen',
    onClose?: () => void;
    className?: string,
    position?: { top: number, left: number },
}

export const Modal = ({ children, size = 'auto', type = 'default', isOpen, onClose = () => { }, position }: Props) => {
    useEffect(() => {
        if (type !== 'float') {
            document.body.style.overflow = isOpen ? 'hidden' : 'visible';
        }
    }, [isOpen, type]);

    useEffect(() => {
        const handleKeyboardClick = (event: KeyboardEvent) => (event.code === 'Escape') && onClose();

        document.addEventListener('keydown', handleKeyboardClick);

        return () => {
            document.removeEventListener('keydown', handleKeyboardClick);
        }
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={styles.root}>
            <div className={`fixed h-full w-full ${styles[type]}`} onClick={onClose} />
            <div className={`fixed ${styles[size]} ${styles[type]}`} style={position}>
                {children}
            </div>
        </div >,
        document.body,
    );
};
