const getPostfixData = require('../../generateTree/infixToPostfix');
const getTreeData = require('../../generateTree/postfixToTree');

module.exports = {
    getData: infixExpression => {
        return getTreeData(getPostfixData(infixExpression));
    },
    caculateResult: postfixArr => {
        let result = 0;
        const numStack = [];
        const isNum = num => !isNaN(parseInt(num, 10));
        const calculate = (num1, operator, num2) => {
            console.log(`Calculating ${num1} ${operator} ${num2}`);
            switch (operator) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '*':
                    return num1 * num2;
                case '/':
                    return num1 / num2;
                case '^':
                    return Math.pow(num1, num2);
                default:
                    console.log('Unknown operator: ', operator);
                    return 0;
            }
        }

        postfixArr.reverse().forEach(ele => {
            if (isNum(ele)) {
                numStack.push(parseInt(ele, 10));
                console.log('numStack: ', numStack);
            } else {
                const num2 = numStack.pop();
                const num1 = numStack.pop();
                numStack.push(calculate(num1, ele, num2));
                console.log('numStack: ', numStack);
            }
        });
        console.log(postfixArr);
        if (numStack.length === 1) {
            result = numStack.pop();
        } else {
            console.log('Error while calculating!', numStack);
            throw new Error('Error while calculating!');
        }
        return result;
    }
}