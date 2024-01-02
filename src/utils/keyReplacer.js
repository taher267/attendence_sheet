const keyReplacer = (data) => {
  if (!data) return;
  let qry = data;
  const qryStr = JSON.stringify(data);
  if (qryStr.includes(`"_id"`)) {
    qry = JSON.parse(qryStr.replace(new RegExp(`"_id"`, "g"), `"id"`));
  }
  return qry;
};

module.exports = keyReplacer;
