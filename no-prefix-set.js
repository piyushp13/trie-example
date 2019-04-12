/**
 * @class to represent and hold data in trie structure
 */
class Trie {
    constructor() {
        this.children = [];
        this.count = 0;
    }
}

/**
 * @function to add a node to the trie
 * @param {object} root Root node of trie
 * @param {string} token Token to add
 */
function addNode(root, token) {
    let node = root;
    for (let i = 0; i < token.length; i++) {
        if (!node.children[token[i].charCodeAt(0) - 97]) {
            node.children[token[i].charCodeAt(0) - 97] = new Trie();
        }
        node = node.children[token[i].charCodeAt(0) - 97];
        node.count += 1;
    }
}

/**
 * @function to find the occurence of the searched token in the trie
 * @param {object} root Root node of trie
 * @param {string} key Token to search for
 */
function findOccurences(root, key) {
    let node = root;
    let i = 0;
    let curChar = key[i];
    while (node && curChar) {
        node = node.children[curChar.charCodeAt(0)-97];
        curChar = key[++i];
    }
    if(node && node.count){
        return node.count
    }
    else {
        return 0 ; 
    }
}

/**
 * @function to take input from stdin and console the output
 * @param {*} input 
 */
function processData(input) {
    set = input.split('\n').slice(1);
    let setTrie = new Trie();
    let setType = "GOOD SET";
    let badString = "";
    for (let i = 0; i < set.length; i++) {
        let occurences = 0;
        addNode(setTrie, set[i]);
        for (let j = 0; j < i + 1; j++) {
            occurences = findOccurences(setTrie, set[j]);
            // console.log("Occurences of ", set[j], "in Trie = ", occurences);
            if (occurences > 1) {
                setType = "BAD SET";
                badString = set[i];
                break;
            }
        }
        if (occurences > 1) {
            break;
        }
    }
    let out = setType + "\n" + badString;
    console.log(out);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});