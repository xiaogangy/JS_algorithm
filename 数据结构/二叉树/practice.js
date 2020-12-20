function preTraverse(root) {
    if (!root) {
        return;
    }
    let current = root;
    const stack = [];
    while (stack.length || current) {
        while (current !== null) {
            console.log(current.val);
            stack.push(current);
            current = current.left;
        }
        if (stack.length) {
            const parent = stack.pop();
            current = parent.right;
        }
    }
}

function inTraverse(root) {
    if (!root) {
        return;
    }
    let current = root;
    const stack = [];
    while (stack.length || current) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        if (stack.length) {
            const parent = stack.pop();
            console.log(current.val);
            current = parent.right;
        }
    }
}

function postTraverse(root) {
    if (!root) {
        return;
    }
    let current = root;
    let lastVisited = null;
    const stack = [];
    while (stack.length || current) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        if (stack.length) {
            const parent = stack[stack.length - 1];
            if (parent.right && parent.right !== lastVisited) {
                current = parent.right;
            } else {
                lastVisited = stack.pop();
                console.log(parent.val);
            }
        }
    }
}

function levelTraverse(root) {
    if (!root) {
        return;
    }
    const queue = [];
    queue.push(root);
    while (queue.length) {
        const head = queue.shift();
        console.log(head.val);
        if (head.left) {
            queue.push(head.left);
        }
        if (head.right) {
            queue.push(head.right);
        }
    }
}
