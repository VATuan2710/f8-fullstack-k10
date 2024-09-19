function slugify(products) {
  const result = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    let slug = product.name.toLowerCase();
    slug = slug.split("'").join("");
    slug = slug.split(".").join("");
    slug = slug.split(" ").join("-");

    slug = `${slug}-${product.id.toLowerCase()}`;
    result.push({ ...product, slug });
  }
  return result;
}

const products = [
  { id: "1OT22W006", name: "Girls Windbreaker Jacket" },
  { id: "1OT22W009", name: "Boys T-shirt" },
  { id: "1OT22W032", name: "Boys Shirt" },
  { id: "1OT22W011", name: "Men's Super Warm Jacket" },
  { id: "1OT22W000", name: "Women's Party Dress" },
];

const slugifiedProducts = slugify(products);

console.log(slugifiedProducts);
