const postfixArr = require('./infixToPostfix');
console.log('postfixArr: ', postfixArr);

// const data = { value: '', children : { left: {}, right: {} } };

const type = ele => isNaN(parseInt(ele)) ? 'operator' : 'number';

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
        if (currentNode) {//1
            node.setParent(currentNode);
            if (!currentNode.getRight()) {// 1.1
                currentNode.setRight(node);
                console.log(char, 'goes to 1.1');
            } else {
                console.log(type(currentNode.getRight().getValue()));
                if (type(currentNode.getRight().getValue()) === 'operator' && !currentNode.getRight().isFull() && !type(currentNode.getRight().getValue()) === 'number') {//1.2
                    currentNode.setRight(node);
                    console.log(char, 'goes to 1.2');
                } else {//1.3
                    currentNode.setLeft(node);
                    console.log(char, 'goes to 1.3');
                }
            }
        }
        currentNode = node;
    } else {
        // Set number child
        if (!currentNode.getRight()) {//2
            currentNode.setRight(node);
            console.log(char, 'goes to 2');
        }
        else {//3
            currentNode.setLeft(node);
            console.log(char, 'goes to 3');
        }
        // check if currentNode is full
        if (currentNode.isFull()) {//4
            console.log(char, 'goes to 4');
            currentNode = currentNode.getParent();
        }
    }
});

console.log(rootNode.getLeft().getRight());
