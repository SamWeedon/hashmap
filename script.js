//import { LinkedList, Node } from "./linkedList.mjs";

const linkedList = require("./linkedList.cjs");

const HashMap = () => {
  let hashMapArray = [];
  let capacity = 16;
  const loadFactor = 0.75;

  const growBuckets = function () {
    let occupiedBuckets = 0;
    for (let bucket of hashMapArray) {
      if (bucket !== undefined) {
        occupiedBuckets++;
      }
    }
    if (occupiedBuckets >= capacity * loadFactor) {
      capacity *= 2;
      let keyValueArray = this.entries();
      this.clear();
      for (let keyValuePair of keyValueArray) {
        this.set(keyValuePair[0], keyValuePair[1]);
      }
    }
  };

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % capacity;
    }
    return hashCode;

    /*
    // for testing collisions ONLY
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode + key.charCodeAt(i);
    }
    return hashCode;
    */
  };

  const set = function (key, value) {
    // in the case of a pre-existing key, the value should be overwritten,
    // but in the case of a collision, where the bucket (hash code index)
    // is the same, but the key is different, the key value pair must be
    // appended to the linked list

    const hashedKey = hash(key);
    if (hashMapArray[hashedKey] === undefined) {
      // create bucket in the form of a linked list
      const keyValueNode = linkedList.Node([key, value]);
      hashMapArray[hashedKey] = linkedList.LinkedList(keyValueNode);
    } else if (hashMapArray[hashedKey].containsKey(key)) {
      // overwrite value
      const keyIndex = hashMapArray[hashedKey].findKey(key);
      hashMapArray[hashedKey].removeAt(keyIndex);
      hashMapArray[hashedKey].insertAt([key, value], keyIndex);
    } else {
      // append the key value pair to the linked list (bucket)
      hashMapArray[hashedKey].append([key, value]);
    }
    this.growBuckets();
  };

  const get = function (key) {
    // returns the value that is assigned to the given key
    if (!this.has(key)) return null;
    const bucket = hashMapArray[hash(key)];
    const keyIndex = bucket.findKey(key);
    const keyValuePairNode = bucket.at(keyIndex);
    return keyValuePairNode.value[1];
  };

  const has = (key) => {
    // returns true if the given key is in the hash map
    if (hashMapArray[hash(key)] !== undefined) {
      if (hashMapArray[hash(key)].containsKey(key)) return true;
    }
    return false;
  };

  const remove = function (key) {
    if (!this.has(key)) return false;
    const hashedKey = hash(key);
    const keyIndex = hashMapArray[hashedKey].findKey(key);
    hashMapArray[hashedKey].removeAt(keyIndex);
    // if that was the last item in the linked list, clear the index in the hash map
    if (hashMapArray[hashedKey].head === null) {
      hashMapArray[hashedKey] = undefined;
    }
  };

  const length = function () {
    let storedKeys = 0;
    for (let i = 0; i < hashMapArray.length; i++) {
      if (hashMapArray[i] !== undefined) {
        let bucketLength = hashMapArray[i].size();
        storedKeys += bucketLength;
      }
    }
    return storedKeys;
  };

  const clear = function () {
    hashMapArray = [];
  };

  const keys = function () {
    let keysArray = [];
    for (let i = 0; i < hashMapArray.length; i++) {
      if (hashMapArray[i] !== undefined) {
        let currentNode = hashMapArray[i].head;
        while (currentNode) {
          keysArray.push(currentNode.value[0]);
          currentNode = currentNode.next;
        }
      }
    }
    return keysArray;
  };

  const values = function () {
    let valuesArray = [];
    const keysArray = this.keys();
    for (let key of keysArray) {
      let value = this.get(key);
      valuesArray.push(value);
    }
    return valuesArray;
  };

  const entries = function () {
    let entriesArray = [];
    const keysArray = this.keys();
    for (let key of keysArray) {
      let value = this.get(key);
      entriesArray.push([key, value]);
    }
    return entriesArray;
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    growBuckets,
    hashMapArray,
  };
};

// testing
const exampleHashMap = HashMap();
console.log(exampleHashMap.hash("dad"));
console.log(exampleHashMap.hash("add"));
exampleHashMap.set("dad", "fred");
console.log(exampleHashMap.get("dad"));
exampleHashMap.set("dad", "frank");
console.log(exampleHashMap.get("dad"));
console.log(exampleHashMap.get("sadfsgagg"));
exampleHashMap.set("add", "5+5");
//console.log(exampleHashMap.hashMapArray[297].head.value);
//console.log(exampleHashMap.hashMapArray[297].head.next.value);
console.log(exampleHashMap.has("dad"));
console.log(exampleHashMap.has("add"));
console.log(exampleHashMap.has("dda"));
console.log(exampleHashMap.has("aushdfuishdf"));
exampleHashMap.remove("add");
console.log(exampleHashMap.has("add"));
console.log(exampleHashMap.length());
exampleHashMap.set("add", "5+5");
console.log(exampleHashMap.keys());
console.log(exampleHashMap.values());
console.log(exampleHashMap.entries()[0], exampleHashMap.entries()[1]);
exampleHashMap.set("dasdf", "sadasfasdf");
exampleHashMap.set("zcxvzcxv", "sabfagbsf");
exampleHashMap.set("savfgasg", "asdgasfgwer");
exampleHashMap.set("argreawf", "regijaiuhg");
exampleHashMap.set("aiohfuibweif", "nioasbfuiba");
exampleHashMap.set("opjiwoehfioh", "ihwaeiufbwauf");
exampleHashMap.set("ionuiafyuaf", "woajfubwehbfywa");
exampleHashMap.set("weiuefu", "pouiyuit");
exampleHashMap.set("iuadsyfyasdf", "opjweihfbha");
exampleHashMap.set("okasifbwevbf", "pouiwayefwea");
exampleHashMap.set("lknweabfyugwaef", "poijasufyugayufwe");
exampleHashMap.set("ajifihsuiafhuher", "fopajwifhuiwqrfuiahef");
exampleHashMap.set("fwaefijiuqewahqfuiheq", "weafoojierhguierug");
exampleHashMap.set("fawefjiuwhrgfwer", "wafnuiafuihasrf");
exampleHashMap.set("asfjwiahefuihewryhf", "ijeasfuihuawfh");
exampleHashMap.set("safsiojgudhgyfesyeufh", "asf;jwiuhfuygwrygfhaijfe");
for (let key of exampleHashMap.keys()) {
  console.log(exampleHashMap.hash(key));
}
/*
const Node1 = linkedList.Node(5);
const exampleList = linkedList.LinkedList(Node1);
exampleList.append("bobby");
console.log(exampleList.head.next);
*/
