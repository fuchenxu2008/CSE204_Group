module.exports = postfixArr => {
    const postfixMap = {};
    postfixArr.forEach((char, index) => {
      postfixMap[`x${index}`] = char;
    });
    console.log('postfixArr: ', postfixArr);
    console.log('postfixMap: ', postfixMap);

    // const data = { value: '', children : { left: {}, right: {} } };

    const type = ele => (isNaN(parseInt(ele, 10)) ? 'operator' : 'number');

    class TreeNode {
      constructor(value, parent = null, left = null, right = null) {
        this.parentNode = parent;
        this.value = value;
        this.leftChild = left;
        this.rightChild = right;
      }

      setParent(parent) {
        this.parentNode = parent;
      }
      setLeft(left) {
        this.leftChild = left;
      }
      setRight(right) {
        this.rightChild = right;
      }

      getValue() {
        return this.value;
      }
      getParent() {
        return this.parentNode;
      }
      getLeft() {
        return this.leftChild;
      }
      getRight() {
        return this.rightChild;
      }

      isFull() {
        return this.rightChild && this.leftChild;
      }

      toJSON() {
        let leftChild = '';
        let rightChild = '';
        let children = null;
        if (this.getLeft()) leftChild = this.getLeft().toJSON();
        if (this.getRight()) rightChild = this.getRight().toJSON();
        if (this.getLeft() && this.getRight()) {
          children = [leftChild, rightChild];
        }
        return { name: this.getValue(), children };
      }
    }

    let currentNode = null;
    let rootNode = null;

    postfixArr.reverse().forEach(char => {
      const node = new TreeNode(char);
      // If root is not defined, make this node root
      if (!rootNode) rootNode = node;

      while (currentNode && currentNode.isFull()) {
        currentNode = currentNode.getParent();
      }

      if (type(char) === 'operator') {
        if (currentNode) {
          node.setParent(currentNode);
          if (!currentNode.getRight()) {
            currentNode.setRight(node);
          } else {
            currentNode.setLeft(node);
          }
        }
        currentNode = node;
      } else {
        // Set number child
        if (!currentNode.getRight()) {
          currentNode.setRight(node);
        } else {
          currentNode.setLeft(node);
        }
        // check if currentNode is full
        if (currentNode.isFull()) {
          currentNode = currentNode.getParent();
        }
      }
    });

    return {
      postfixArr,
      postfixMap,
      treeData: rootNode.toJSON(),
    }
}
