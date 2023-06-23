import { KeyboardEvent } from 'react';
import styles from './index.module.css';


interface Props {
    url: string,
    isBlank: boolean,
    onChange: (state: { url: string, target: '_blank' | '_self' }) => void,
    onSubmit: () => void,
}


const LinkEditor = ({ url, isBlank, onChange, onSubmit }: Props) => {
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            onSubmit();
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.saveBox}>
                <input value={url} onChange={(event) => onChange({ url: event.target.value, target: isBlank ? '_blank' : '_self'})} onKeyDown={onKeyDown} />
                <button onClick={onSubmit}>
                    Сохранить
                </button>
            </div>
            <label className={styles.openLink}>
                <input
                    type="checkbox"
                    checked={isBlank}
                    onChange={(event) => onChange({ url, target: event.target.checked ? '_blank' : '_self'})}
                />
                Открывать в новой вкладке
            </label>
        </div>
    );
}

export default LinkEditor;
