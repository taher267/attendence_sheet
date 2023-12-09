const quryReplacer = (data) => {
  if (!data) return;
  let qry = data;
  const qryStr = JSON.stringify(data);
  if (qryStr.includes(`"id"`)) {
    qry = JSON.parse(qryStr.replace(new RegExp(`"id"`, "g"), `"_id"`));
  }
  return qry;
};
module.exports = quryReplacer;
