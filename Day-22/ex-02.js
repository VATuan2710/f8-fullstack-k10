function groupByHomeTown(employees) {
  const result = {};
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const homeTown = employee.homeTown;
    if (!result[homeTown]) {
      result[homeTown] = [];
    }
    result[homeTown].push(employee);
  }
  return result;
}

const employees = [
  { id: 1, name: "Hoang", homeTown: "Hanoi" },
  { id: 2, name: "An", homeTown: "Thaibinh" },
  { id: 3, name: "Huy", homeTown: "Langson" },
  { id: 4, name: "Dinh", homeTown: "Saigon" },
  { id: 5, name: "Dong", homeTown: "Saigon" },
  { id: 6, name: "Nhinh", homeTown: "Langson" },
];

const groupedEmployees = groupByHomeTown(employees);

console.log(groupedEmployees);
