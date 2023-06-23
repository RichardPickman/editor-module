import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface ItemProps {
    isActive?: boolean,
    onClick: () => void,
    children: ReactNode,
}

export const DropDownItem = ({ isActive = false, onClick, children }: ItemProps) => {
    return (
        <div onClick={onClick}>
            {[children, isActive]}
        </div>
    )
}

interface Props {
    children: ReactNode;
    disabled?: boolean;
    buttonLabel?: string;
    buttonAriaLabel?: string;
    stopCloseOnClickSelf?: boolean;
    ButtonIconComponent?: ReactNode | null;
}

export const DropDown = ({ children, buttonLabel, buttonAriaLabel, disabled = false, ButtonIconComponent }: Props): JSX.Element => {
    const [showDropDown, setShowDropDown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (!event.target) {
                return;
            }

            if (!ref.current?.contains(event.target as HTMLDivElement)) {
                setShowDropDown(false)
            }

            if (ref.current === event.target) {
                setShowDropDown(false)
            }
        };

        document.addEventListener('mousedown', handleMouseDown)

        return () => document.removeEventListener('mousedown', handleMouseDown)
    });

    return (
        <div className={styles.root} ref={ref}>
            <button
                disabled={disabled}
                aria-label={buttonAriaLabel || buttonLabel}
                className={styles.dropDown}
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {ButtonIconComponent}
                {buttonLabel && <span>{buttonLabel}</span>}
                {showDropDown ? '-' : '+'}
            </button>

            {showDropDown && (
                <div className={styles.dropDownMenu} onClick={() => setShowDropDown(false)}>
                    {children}
                </div>
            )}
        </div>
    )
}
