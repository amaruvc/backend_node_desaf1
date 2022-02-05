const axios = require("axios");
const fs = require("fs");

async function getDatos() {
  let res = await axios.get("https://mindicador.cl/api");
  res = res.data;

  const argumentos = process.argv.slice(2);

  if (argumentos.length < 4) {
    return "Debes ingresar nombre del archivo, extensión, divisa y cantidad en orden";
  } else {
    const archivo = argumentos[0];
    const extension = argumentos[1];
    const divisa = argumentos[2].toLowerCase();
    const pesos = Number(argumentos[3]);
    const unidMedida = res[divisa]?.unidad_medida;

    if (Number.isNaN(pesos)) {
      return "Debes ingresar una cantidad en números.";
    } else if (!unidMedida) {
      return "La divisa ingresada no existe";
    } else {
      if (unidMedida == "Pesos") {
        resultado = pesos / res[divisa].valor;
        const hoy = new Date();
        const archivoExtension = `tests/${archivo}.${extension}`;
        fs.writeFile(
          archivoExtension,
          `
A la fecha: ${hoy} Fue realizada cotización con los siguientes datos:
Cantidad de pesos a convertir: ${pesos} pesos
Convertido a "${divisa}" da un total de:
$${resultado}
          `,
          "utf8",
          (err) => {
            if (err) {
              console.log("No fue posible crear el archivo");
            } else {
              console.log("archivo creado con exito");
              fs.readFile(archivoExtension, "utf8", (err, data) => {
                if (err) {
                  console.log("Error al leer el archivo");
                } else {
                  console.log(data);
                }
              });
            }
          }
        );
      } else {
        return "Solo se pueden hacer converiones con unidades que trabajan en pesos";
      }
    }
  }
}

(async function main() {
  await getDatos();
})();
