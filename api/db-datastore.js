"use strict";

// todo: the namespace should be in a config file
const { Datastore } = require("@google-cloud/datastore");

const datastore = new Datastore({ namespace: "namespace1" });
const kind = "Register";

function key(id) {
  return datastore.key([kind, id]);
}

module.exports.list = async () => {
  let [data] = await datastore
    .createQuery(kind)
    .select("name")
    .order("name")
    .run();
  data = data.map((val) => val.name);
  return data;
};

module.exports.get = async (id) => {
  const [data] = await datastore.get(key(id));
  if (data && data.val) return data.val;
  return 0;
};

module.exports.put = (id, val) => {
  return datastore.save({ key: key(id), data: { name: id, val } });
};

module.exports.post = async (id, val) => {
  const [data] = await datastore.get(key(id));
  const updatedval = (data && data.val ? data.val : 0) + val;
  return datastore.save({ key: key(id), data: { name: id, updatedval } });
};
