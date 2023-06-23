import { useRef } from 'react';
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW, ElementFormatType, NodeKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';

import { RESIZE_EMBED_COMMAND } from '../command';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { EmbedProps } from '../node';
import { useRegisterCommand } from 'components/Editor/hooks/useRegisterCommand';
import { useResize } from 'components/Editor/hooks/useResize';

import styles from './index.module.css';

type Props = Omit<EmbedProps, 'src'> & { resizable: boolean, nodeKey: NodeKey, format: ElementFormatType }

export const EmbedComponent = (props: Props): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    const ref = useRef<HTMLImageElement | null>(null);

    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(props.nodeKey);
    const [isResizing, Markers, { width, height }] = useResize({
        keepAspectRatio: props.contentType !== 'image',
        isSelected,
        width: props.width,
        height: props.height,
        callback: (width: number, height: number) => editor.dispatchCommand(RESIZE_EMBED_COMMAND, { width, height, key: props.nodeKey }),
    });


    const handleMouseClick = (event: MouseEvent) => {
        if (isResizing) {
            return true;
        }

        if (event.target === ref.current) {
            clearSelection();
            setSelected(true);

            return true;
        }

        return false;
    }

    useRegisterCommand(CLICK_COMMAND, handleMouseClick, COMMAND_PRIORITY_LOW);

    return (
        <BlockWithAlignableContents
            format={props.format}
            nodeKey={props.nodeKey}
            className={{
                base: '',
                focus: 'outline-sky-600',
            }}
        >
            <div className={styles.root} style={{ width, height }}>
                <img src={props.thumbnail} ref={ref} alt={props.alt} />
                {Markers}
            </div>
        </BlockWithAlignableContents>
    );
}
