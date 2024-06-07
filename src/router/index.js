import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "listar-hospedes",
      component: () => import("../views/ListarHospedesView.vue"),
    },
    {
      path: "/cadastrar-hospede",
      name: "cadastrar-hospede",
      component: () => import("../views/CadastrarHospedeView.vue"),
    },
    {
      path: "/atualizar-hospede/:id",
      name: "atualizar-hospede",
      component: () => import("../views/AtualizarHospedeView.vue"),
    },
    {
      path: "/cadastrar-reserva",
      name: "cadastrar-reserva",
      component: () => import("../views/CadastrarReservaView.vue"),
    },
    {
      path: "/atualizar-reserva/:id",
      name: "atualizar-reserva",
      component: () => import("../views/AtualizarReservaView.vue"),
    },
    {
      path: "/listar-reservas",
      name: "listar-reservas",
      component: () => import("../views/ListarReservasView.vue"),
    },
  ],
});

export default router;
