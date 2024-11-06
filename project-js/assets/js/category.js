import { getAll } from "./services.js";
import { getParams, render } from "./utils.js";

const categoryEle = document.getElementById("category");
const title = document.getElementById("title");

const param = getParams("category");
title.innerText = `Top ${param}:`.toUpperCase();

const { products } = await getAll(`products/category/${param}`);
console.log(products);

render(categoryEle, products);
