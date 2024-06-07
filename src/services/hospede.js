import { api } from "./api";

export const hospede = {
  cadastrar(body) {
    return api.post("/hospedes", body);
  },
  listar() {
    return api.get("/hospedes");
  },
  atualizar(hospedeId, body) {
    return api.patch(`/hospedes/${hospedeId}`, body);
  },
  buscar(hospedeId) {
    return api.get(`/hospedes/${hospedeId}`);
  },
};
