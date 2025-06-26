import axios from "axios";

const baseUrl = "/persons";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return await request.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return await request.data;
};

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject);
  return await request.data;
};

const htppDelete = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return await request.data;
};

export default { getAll, update, create, htppDelete };
