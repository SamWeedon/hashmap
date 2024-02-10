const HashMap = () => {
  let hashMapArray = [];
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  };

  const set = (key, value) => {
    const hashedKey = hash(key);
    hashMapArray[hashedKey] = [key, value];
  };

  const get = (key) => {
    return hashMapArray[hash(key)][1];
  };

  const has = (key) => {
    if (hashMapArray[hash(key)] !== undefined) return true;
    else return false;
  };

  return { hash, set, get, has, hashMapArray };
};

const exampleHashMap = HashMap();
console.log(exampleHashMap.hash("fred"));
exampleHashMap.set("name", "fred");
console.log(exampleHashMap.get("name"));
console.log(exampleHashMap.has("name"));
console.log(exampleHashMap.has("height"));
