const menu = [
  { id: 1, name: "Home", parentId: 0 },
  { id: 2, name: "About", parentId: 0 },
  { id: 3, name: "News", parentId: 0 },
  { id: 4, name: "Products", parentId: 0 },
  { id: 5, name: "Contact", parentId: 0 },
  { id: 6, name: "T-Shirt", parentId: 4 },
  { id: 7, name: "Jean", parentId: 4 },
  { id: 8, name: "Skirt", parentId: 4 },
];

function createMenu(menuData) {
  const menuMap = {};
  menuData.forEach((item) => {
    menuMap[item.id] = { ...item, children: [] };
  });

  const menuTree = [];
  menuData.forEach((item) => {
    if (item.parentId === 0) {
      menuTree.push(menuMap[item.id]);
    } else {
      menuMap[item.parentId].children.push(menuMap[item.id]);
    }
  });

  return menuTree;
}

function renderMenu(menuTree, parentElement) {
  menuTree.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = item.name;

    if (item.parentId === 0) {
      a.style.fontSize = "24px";
    } else {
      a.style.fontSize = "20px";
    }
    li.appendChild(a);

    if (item.children.length > 0) {
      const ul = document.createElement("ul");
      renderMenu(item.children, ul);
      li.appendChild(ul);
    }
    parentElement.appendChild(li);
  });
}

const menuTree = createMenu(menu);
const mainMenu = document.getElementById("main-menu");
renderMenu(menuTree, mainMenu);
