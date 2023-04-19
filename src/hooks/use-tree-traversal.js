const useTreeTraversal = () => {
  // Add a file or folder in tree
  // Can be optimised using Dynamic Programming
  const insertNode = function (tree, folderId, item) {
    if (tree.id === folderId) {
      tree.items.push({
        id: new Date().getTime(),
        name: "addName",
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, folderId) => {
    if (tree.id === folderId) {
      // If this is the node we want to delete, remove it from the tree
      return null;
    }

    // Recursively search for the node to delete in the child nodes
    let latestItems = [];
    for (let i = 0; i < tree.items.length; i++) {
      const child = tree.items[i];
      const result = deleteNode(child, folderId);
      if (result !== null) {
        latestItems.push(result);
      }
    }

    // Return the updated tree with the node removed
    return { ...tree, items: latestItems };
  };

  const renameNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      // If this is the node we want to rename, update its name property
      return { ...tree, name: newName };
    }

    // Recursively search for the node to rename in the child nodes
    let latestItems = [];
    for (let i = 0; i < tree.items.length; i++) {
      const child = tree.items[i];
      const result = renameNode(child, nodeId, newName);
      latestItems.push(result);
    }

    // Return the updated tree with the node renamed
    return { ...tree, items: latestItems };
  }; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useTreeTraversal;
