import { useState } from "react";

function Field({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  fieldData,
}) {
  const [expand, setExpand] = useState(false);
  const [changeText, setChangeText] = useState(false);
  const [style, setStyle] = useState({ display: "none" });

  const handleNewFolder = (e) => {
    e.stopPropagation();
    setExpand(true);
    handleInsertNode(fieldData.id, e.target.value);
  };
  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    handleDeleteNode(fieldData.id);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    if (e.target.value === "OBJECT") {
      handleInsertNode(fieldData.id, e.target.value, true);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setChangeText(true);
  };

  const handleChangeText = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      setChangeText(!changeText);
      handleRenameNode(fieldData.id, e.target.value);
    }
  };

  return (
    <div>
      <div
        onClick={() => setExpand(!expand)}
        className="flex gap-5 items-center justify-between mt-1 hover:bg-[#ecebec] px-5 py-2 pointer"
        onMouseEnter={() => setStyle({ display: "flex" })}
        onMouseLeave={() => setStyle({ display: "none" })}
      >
        <div className="flex gap-5">
          {changeText === true ? (
            <div className="inputContainer">
              <input
                className="outline-none px-2 py-2 rounded-md"
                autoFocus
                onKeyDown={handleChangeText}
                type="text"
              />
            </div>
          ) : (
            <span onDoubleClick={handleDoubleClick}>{fieldData.name}</span>
          )}
          <select
            onChange={handleSelect}
            className="bg-gray-200 rounded-lg px-2 py-1 flex"
          >
            <option>STRING</option>
            <option>NUMBER</option>
            <option>BOOLEAN</option>
            <option>OBJECT</option>
          </select>
        </div>
        <div className="flex gap-5" style={style}>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <div className="flex gap-5">
            <button
              className="bg-white px-3 rounded-md "
              onClick={(e) => handleNewFolder(e, true)}
            >
              +
            </button>
            <button
              className="hover:bg-gray-500 hover:text-white px-3 rounded-md"
              onClick={handleDeleteFolder}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: 25 }}>
        {fieldData.items.map((item) => {
          return (
            <Field
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleRenameNode={handleRenameNode}
              key={item.id}
              fieldData={item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Field;
