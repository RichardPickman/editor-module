import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND
} from 'lexical';

import { Item } from './Item';
import { useRegisterCommandCritical } from '../../../../../components/Editor/hooks/useRegisterCommand';


export const UndoRedo = () => {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setUndo] = useState(false);
    const [canRedo, setRedo] = useState(false);

    useRegisterCommandCritical<boolean>(
        CAN_UNDO_COMMAND,
        (payload: boolean) => {
            setUndo(payload);
            return false;
        },
    );
    useRegisterCommandCritical<boolean>(
        CAN_REDO_COMMAND,
        (payload: boolean) => {
            setRedo(payload);
            return false;
        },
    );

    return (
        <>
            <Item
                disabled={!canUndo || !editor.isEditable()}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                title="Undo"
            >
                Undo
            </Item>
            <Item
                disabled={!canRedo || !editor.isEditable()}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                title="Redo"
            >
                Redo
            </Item>
        </>
    )
}
