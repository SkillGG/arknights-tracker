const fs = require("fs");

/**
 * @typedef {{name:string, stars:number, tags:string[], image:string}} Operator
 */

/**
 * @typedef {Operator[]} Operators
 */

/**
 * @type {Operators}
 */
const operatorJSON = JSON.parse(fs.readFileSync("./operators.json").toString());

const newOperatorJSON = operatorJSON.map((char, i) => {
  /*  if (!fs.existsSync("./../public/operators/")) {
      fs.mkdirSync("./../public/operators/");
    }
    const buff = Buffer.from(
      char.image.substring(char.image.indexOf(",")),
      "base64"
    );
    const path = `./../public/operators/${char.name.replace(/\s/g, "_")}.png`;
    fs.writeFileSync(path, buff);
    return { ...char, image: path };
    return {...char, tags: [...new Set(char.tags)]};
    const name = char.name;
    if (name.includes("Justice Knight")) {
      return {
        ...char,
        name: "Justice Knight",
        image: "./operator/Justice_Knight.png",
      };
    } else return char;
    */
  return char;
});

newOperatorJSON.sort((p, n) => {
  const a = p.name.charAt(0);
  const b = n.name.charAt(0);
  const lowA = a.toLowerCase();
  const lowB = b.toLowerCase();
  if (lowA < lowB) return -1;
  if (lowA > lowB) return 1;
  return 0;
});

// console.log(newOperatorJSON.map((r) => r.tags));

fs.writeFileSync("./operators.json", JSON.stringify(newOperatorJSON));
