
import { useState } from 'react';
import './App.css';
import explorer from './data/folder';
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree()


  const handleInsertNode=(folderId,item,isFolder)=>{
    const finalTree =insertNode(explorerData,folderId,item,isFolder);
    setExplorerData(finalTree)
  }
  console.log(explorerData);
  return (
    <div className="App">
      <Folder explorer={explorer} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
