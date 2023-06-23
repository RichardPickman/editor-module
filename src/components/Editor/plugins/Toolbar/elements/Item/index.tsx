import { MutableRefObject, ReactNode } from 'react';
import styles from './index.module.css';

interface Props {
    children: ReactNode,
    disabled?: boolean,
    className?: string,
    onClick: () => void,
    title?: string,
    ariaLabel?: string,
    ref?: MutableRefObject<HTMLButtonElement>
}

export const Item = ({
    children,
    title = '',
    ariaLabel = '',
    disabled = false,
    className = '',
    onClick,
    ref
}: Props) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={styles.root + ' ' + className}
        title={title}
        aria-label={ariaLabel}
        ref={ref}
    >
        {children}
    </button>
)
