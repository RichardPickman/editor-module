import { useState } from "react";
import Editor from "./components/Editor";
import { theme } from "./theme";

import styles from './index.module.css';

const App = () => {
  const [state, setState] = useState({});
  const onUpload = async () => 'asd';

  return (
    <div className={styles.root}>
      <Editor theme={theme} onUpload={onUpload} onChange={editorState => setState({ ...state, body: editorState.toJSON() })} />
    </div>
  );
}

export default App;
