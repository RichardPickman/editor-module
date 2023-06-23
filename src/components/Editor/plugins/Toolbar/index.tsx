import { Align } from './elements/Align';
import { UndoRedo } from './elements/UndoRedo';
import { FontSizeDropDown } from './elements/FontDropDown';
import { BlockFormatDropDown } from './elements/BlockFormat';
import { Bold, Italic, Link, Underline } from './elements/Formatting';
import { Cutter } from './elements/Cutter';
import { Embed } from './elements/Embed';
import { Image } from './elements/Image';
import styles from './index.module.css';


export const ToolbarPlugin = () => {
    return (
        <div className={styles.root}>
            <UndoRedo />
            <BlockFormatDropDown />
            <FontSizeDropDown />
            <Bold />
            <Italic />
            <Underline />
            <Link />
            <Align />
            {/* eslint-disable-next-line */}
            <Image />
            <Cutter />
            <Embed />
        </div>
    );
};
