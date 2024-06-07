<script>
import { reserva } from "@/services/reserva";
import moment from "moment";

export default {
  data() {
    return {
      reservas: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await reserva.listar();
        this.reservas = response.data;
      } catch (error) {
        alert("Erro ao listar hóspedes!");
      }
    },
    formattedCheckinDates() {
      return this.reservas.map((reserva) =>
        moment(reserva.data_checkin).format("DD/MM/YYYY")
      );
    },
    formattedCheckoutDates() {
      return this.reservas.map((reserva) =>
        moment(reserva.data_checkout).format("DD/MM/YYYY")
      );
    },
  },
};
</script>

<template>
  <section class="container section">
    <h2>Lista de reservas</h2>
    <table class="container-tabela">
      <thead>
        <tr>
          <th>Número da reserva</th>
          <th>Data check-in</th>
          <th>Data check-out</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reserva, index) in reservas" :key="reserva.reserva_id">
          <td>{{ reserva.numero_reserva }}</td>
          <td>{{ this.formattedCheckinDates()[index] }}</td>
          <td>{{ this.formattedCheckoutDates()[index] }}</td>
          <td>{{ reserva.status }}</td>
          <td>
            <RouterLink
              class="btn-update"
              :to="`/atualizar-reserva/${reserva.reserva_id}`"
              >Atualizar</RouterLink
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.container-lista {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.container-tabela {
  width: 100%;
  border-collapse: collapse;
}

.container-tabela th,
.container-tabela td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.container-tabela th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.container-tabela tr:hover {
  background-color: #f1f1f1;
}

.btn-update {
  background: #000000;
  color: #ffffff;
  padding: 8px;
}
</style>
