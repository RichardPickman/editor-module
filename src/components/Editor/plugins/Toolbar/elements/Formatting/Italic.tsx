import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';

import { Item } from '../Item';
import { useState } from 'react';
import { useRegisterListener } from 'components/Editor/hooks/useRegisterListener';


export const Italic = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(editor.isEditable());

    const $updateActive = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                setActive(selection.hasFormat('italic'));
            }
        })

        return false;
    };

    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateActive);

    return (
        <Item
            disabled={!isEditable}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            className={isActive ? 'border rounded bg-slate-100' : ''}
            title="Italic"
            aria-label="Format text as italic."
        >
            <i>I</i>
        </Item>
    )
}
