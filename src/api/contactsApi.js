import { api } from "./client";

export const ContactsApi = {
  list: async () => (await api.get("/contacts?_sort=id&_order=asc")).data,
  create: async (payload) => (await api.post("/contacts", payload)).data,
  update: async (id, payload) => (await api.patch(`/contacts/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`/contacts/${id}`)).data
};
