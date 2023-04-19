import { useState } from "react";
import Field from "./components/Field";
import useTreeTraversal from "./hooks/use-tree-traversal";
import data from "./data/fieldData";

export default function App() {
  const [fieldData, setfieldData] = useState(data);

  const { insertNode } = useTreeTraversal();
  const { deleteNode } = useTreeTraversal();
  const { renameNode } = useTreeTraversal();

  const handleInsertNode = (folderId, item) => {
    const finalTree = insertNode(data, folderId, item);

    setfieldData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(data, folderId);

    setfieldData(finalTree);
  };
  const handleRenameNode = (nodeId, newName) => {
    const finalTree = renameNode(data, nodeId, newName);

    setfieldData(finalTree);
  };
  const handleNewFolder = (e) => {
    e.stopPropagation();
    // setExpand(true);
    handleInsertNode(fieldData.id, e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#f9f9f9] p-5 rounded-xl w-2/5">
        <div className="flex justify-between mx-5">
          <h2 className="text-gray-600">File name and type </h2>
          <button
            className="bg-white px-3 rounded-md"
            onClick={(e) => handleNewFolder(e, true)}
          >
            +
          </button>
        </div>
        <Field
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleRenameNode={handleRenameNode}
          fieldData={fieldData}
        />
      </div>
    </div>
    // <div className="flex items-center justify-center h-screen">
    //   <div className="bg-gray-500 w-1/2">DYGQY</div>
    // </div>
  );
}
