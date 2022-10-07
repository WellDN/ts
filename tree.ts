namespace Dict{     //https://en.wikipedia.org/wiki/Tree_(data_structure)
type Dict<A> = null | {      //binary tree O(Log)n if you have 4B users you just have to make 32 operations     hash table is another faster way but binary tree is good for almost every single thing
    index: number;
    content: A;
    left: Dict<A>;
    right: Dict<A>; //directionary example
};

const empty = null;
const isEmpty = <A>(tree: Dict<A>): tree is null => tree == null;     //in 16.000 requests, you can find the right one in 16 tries

const append = <A>(index: number, content: A, tree: Dict<A>): Dict<A> => {
    if(isEmpty(tree)) {
        return { index: index, content: content, left: empty, right: empty }
    } else {
        if (tree.index == index) {
            return tree;
        } else if (tree.index > index) {
            const index = tree.index;
            const content = tree.content;
            const left = append(index, content, tree.left);
            const right = tree.right;
            return { index, content, left, right };
        } else {
            const index = tree.index;
            const content = tree.content;
            const left = tree.left;
            const right = append(index, content, tree.right);
            return { index, content, left, right};
        }
    }
};


const exists = <A>(index: number, tree: Dict<A>): boolean => {
    if (isEmpty(tree)) {
        return false;
    } else {
        if (tree.index == index) {
            return true;
        } else if (tree.index > index) {
            return exists(index, tree.left);
        } else {
            return exists(index, tree.right);
        }
    }
}


const map = <A, B>(f: (el: A) =>  B, tree: Dict<A>): Dict<B> => {
    if (isEmpty(tree)) {
        return empty;
    } else {
        const index = tree.index;
            const content = f(tree.content);
            const left = map(f, tree.left);
            const right = map(f, tree.right);
            return { index, content, left, right };
    }
};
}