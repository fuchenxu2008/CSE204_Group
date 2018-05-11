module.exports = expression => {
    // const expression = '( 1 + 2 / 3 * ( 4 + 5 ) - 6 )';

    // Final result
    const output = [];
    // Operator stack
    const opStack = [];

    const precedence = {
        '^': 3,
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
    }

    const peek = stack => stack[stack.length - 1];

    const input = expression.split(' ');

    input.forEach(char => {
        if (char === '(') {
            opStack.push(char);
        }
        else if (char === ')') {
            while (opStack.length && peek(opStack) !== '(') {
                output.push(opStack.pop());
            }
            opStack.pop();
        }
        else if (!isNaN(parseInt(char, 10))) {
            output.push(char);
        }
        else {
            let done = false;
            while (opStack.length && !done) {
                const lastOp = peek(opStack);
                if (!lastOp) {
                    throw new Error('Invalid expression!');
                }
                if (lastOp !== '(') {
                    if (precedence[char] <= precedence[lastOp]) {
                        output.push(opStack.pop());   
                    } else {
                        opStack.push(char);
                        done = true;
                    }
                } else {
                    opStack.push(char);
                    done = true;
                }
            }
            
        }
    });

    return output;
};
