import axios from "axios";

const baseUrl = "/api/handler";

const getAll = async () => await axios.get(baseUrl).then(({ data }) => data);

const update = async (id, newObject) =>
  await axios.put(baseUrl, { id, newObject }).then(({ data }) => data);

const create = async (newObject) =>
  await axios.post(baseUrl, newObject).then(({ data }) => data);

const httpDelete = async (id) =>
  await axios.delete(baseUrl, { data: { id } }).then(({ data }) => data);

export default { getAll, update, create, httpDelete };
