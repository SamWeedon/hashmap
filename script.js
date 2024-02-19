//import { LinkedList, Node } from "./linkedList.mjs";

const linkedList = require("./linkedList.cjs");

const HashMap = () => {
  let hashMapArray = [];
  const hash = (key) => {
    /*
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
    */

    // for testing collisions ONLY
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode + key.charCodeAt(i);
    }
    return hashCode;
  };

  const set = (key, value) => {
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
  };

  const get = (key) => {
    // returns the value that is assigned to the given key
    const bucket = hashMapArray[hash(key)];
    const keyIndex = bucket.findKey(key);
    const keyValuePair = bucket.at(keyIndex);
    return keyValuePair.value[1];
  };

  const has = (key) => {
    // returns true if the given key is in the hash map
    if (hashMapArray[hash(key)].containsKey(key)) {
      return true;
    } else return false;
  };

  return { hash, set, get, has, hashMapArray };
};

// testing
const exampleHashMap = HashMap();
console.log(exampleHashMap.hash("dad"));
console.log(exampleHashMap.hash("add"));
exampleHashMap.set("dad", "fred");
console.log(exampleHashMap.get("dad"));
exampleHashMap.set("dad", "frank");
console.log(exampleHashMap.get("dad"));
exampleHashMap.set("add", "5+5");
console.log(exampleHashMap.hashMapArray[297].head.value);
console.log(exampleHashMap.hashMapArray[297].head.next.value);
console.log(exampleHashMap.has("dad"));
console.log(exampleHashMap.has("add"));
console.log(exampleHashMap.has("dda"));

/*
const Node1 = linkedList.Node(5);
const exampleList = linkedList.LinkedList(Node1);
exampleList.append("bobby");
console.log(exampleList.head.next);
*/
