// We wrap the logic in a function that accepts the HTML template and the JSON product
module.exports = function (template, product) {
  // We take the template and chain all the replacements
  let output = template
    .replace("{{%IMAGE%}}", product.productImage)
    .replace("{{%NAME%}}", product.name)
    .replace("{{%MODELNAME%}}", product.modeName)
    .replace("{{%MODELNO%}}", product.modelNumber)
    .replace("{{%SIZE%}}", product.size)
    .replace("{{%CAMERA%}}", product.camera)
    .replace("{{%PRICE%}}", product.price)
    .replace("{{%COLOR%}}", product.color)
    .replace("{{%ID%}}", product.id);

  // Finally, we hand back the completed, stamped HTML chunk
  return output;
};
