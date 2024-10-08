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

function renderMenu(menuTree) {
  let menuHtml = "";
  menuTree.forEach((item) => {
    menuHtml += `<li><a href="#" style="font-size: 24px">${item.name}</a>`;
    if (item.children.length > 0) {
      menuHtml += "<ul>";
      item.children.forEach((child) => {
        menuHtml += `<li><a href="#" style="font-size: 20px">${child.name}</a>`;
        if (child.children.length > 0) {
          menuHtml += "<ul>";
          menuHtml += renderMenu(child.children);
          menuHtml += "</ul>";
        }
        menuHtml += `</li>`;
      });
      menuHtml += "</ul>";
    }
    menuHtml += "</li>";
  });
  return menuHtml;
}

const menuTree = createMenu(menu);
const mainMenu = document.getElementById("main-menu");
mainMenu.innerHTML = renderMenu(menuTree);
