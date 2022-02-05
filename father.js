const child_process = require("child_process");

function ejecutar(archivo) {
  return new Promise((resolve) => {
    child_process.exec(
      `node ${archivo} dolares jaja euro 5000000`,
      (err, result) => {
        resolve(result);
      }
    );
  });
}

(async function main() {
  const res = await ejecutar("index.js");
  console.log(res);
})();
