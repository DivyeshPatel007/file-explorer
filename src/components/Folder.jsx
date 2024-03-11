import React, { useState } from "react";

function Folder({ explorer, handleInsertNode }) {
  const [expand, setIsExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder: true });
    setIsExpand(true);
  };
  const handleNewFile = (e) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder: false });
    setIsExpand(true);
  };
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div onClick={() => setIsExpand(!expand)} className="folder">
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={handleNewFolder}>Folder +</button>
            <button onClick={handleNewFile}>File +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                className="inputContainer__input"
                onKeyDown={onAddFolder}
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              />
            </div>
          )}

          {explorer.items.map((exp) => (
            <Folder key={exp.id} explorer={exp} handleInsertNode={handleInsertNode} />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}

export default Folder;
