import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DropDown, DropDownItem } from 'components/Editor/elements/DropDown';


export const Align = () => {
    const [editor] = useLexicalComposerContext();

    return (
        <DropDown
            disabled={!editor.isEditable()}
            buttonAriaLabel="Formatting options for text alignment"
        >
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}>
                Left Align
            </DropDownItem>
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}>
                Center Align
            </DropDownItem>
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}>
                Right Align
            </DropDownItem>
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}>
                Justify Align
            </DropDownItem>
        </DropDown>
    )
}
