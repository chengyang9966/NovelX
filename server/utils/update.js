/**
 * tableName: `users`
 * conditions: { id: 'joe-unique-id', ... }
 * data: { username: 'Joe', age: 28, status: 'active', ... }
 *
 *  "UPDATE users SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */
const Utils = {};
Utils.isObject = (x) => x !== null && typeof x === "object";
Utils.isObjEmpty = (obj) =>
  Utils.isObject(obj) && Object.keys(obj).length === 0;

exports.update = (tableName, conditions = {}, data = {}) => {
  const dKeys = Object.keys(data);
  const dataTuples = dKeys.map((k, index) => `${k} = $${index + 1}`);
  const updates = dataTuples.join(", ");
  const len = Object.keys(data).length;

  let text = `UPDATE ${tableName} SET ${updates} `;

  if (!Utils.isObjEmpty(conditions)) {
    const keys = Object.keys(conditions);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len} `);
    const condPlaceholders = condTuples.join(" AND ");

    text += ` WHERE ${condPlaceholders} RETURNING *`;
  }

  const values = [];
  Object.keys(data).forEach((key) => {
    values.push(data[key]);
  });
  Object.keys(conditions).forEach((key) => {
    values.push(conditions[key]);
  });

  return { text, values };
};
exports.Utils = Utils;
exports.insert = (tableName, data = {}) => {
  const dKeys = Object.keys(data).toString();
  const dValues = Object.values(data)
    .map((w) => {
      return `'${w}'`;
    })
    .join(",");
  console.log("DNewValue: ", dValues);

  const len = Object.keys(data).length;

  let text = `INSERT INTO ${tableName} (${dKeys}) VALUES(${dValues}) RETURNING *`;
  const values = [];
  Object.keys(data).forEach((key) => {
    values.push(data[key]);
  });
  return { text, values };
};
exports.insertMultiple = (tableName, data = []) => {
  let firstData = data[0];
  const dKeys = Object.keys(firstData).toString();
  const dValues = data.map((w, i) => {
    let value = Object.values(w).map((x) => {
      x = x.replace(/'/g, /''/g);
      return `'${x}'`;
    });
    return `(${value})`;
  });

  let text = `INSERT INTO ${tableName} (${dKeys}) VALUES ${dValues
    .map((w) => {
      return w;
    })
    .join(",")} RETURNING *`;
  return { text };
};
//   exports.select = (tableName, conditions = {}, data = ["*"]) => {...}
//   exports.remove = (tableName, conditions = {}, data = []) => {...}
