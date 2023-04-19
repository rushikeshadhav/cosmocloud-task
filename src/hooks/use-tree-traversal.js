const useTreeTraversal = () => {
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
      return null;
    }
    let latestItems = [];
    for (let i = 0; i < tree.items.length; i++) {
      const child = tree.items[i];
      const result = deleteNode(child, folderId);
      if (result !== null) {
        latestItems.push(result);
      }
    }
    return { ...tree, items: latestItems };
  };

  return { insertNode, deleteNode };
};

export default useTreeTraversal;
