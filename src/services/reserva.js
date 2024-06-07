import { api } from "./api";

export const reserva = {
  cadastrar(body) {
    return api.post("/reservas", body);
  },
  listar() {
    return api.get("/reservas");
  },
  atualizar(reservaId, body) {
    return api.patch(`/reservas/${reservaId}`, body);
  },
  buscar(reservaId) {
    return api.get(`/reservas/${reservaId}`);
  },
};
