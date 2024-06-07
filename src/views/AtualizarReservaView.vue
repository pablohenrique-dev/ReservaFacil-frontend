<script>
import { reserva } from "@/services/reserva";
import moment from "moment";

export default {
  data() {
    return {
      form: {
        data_checkin: "",
        data_checkout: "",
        status: "",
      },
      idReserva: null,
      numeroReserva: null,
    };
  },
  methods: {
    validarInputs() {
      if (this.form.data_checkin.length === 0) {
        alert("O campo data de checkin é obrigatório");
        return false;
      }
      if (this.form.data_checkout.length === 0) {
        alert("O campo data de checkout é obrigatório");
        return false;
      }
      if (this.form.status.length === 0) {
        alert("O campo status é obrigatório");
        return false;
      }

      return true;
    },
    async handleSubmit() {
      if (!this.validarInputs()) return;
      try {
        await reserva.atualizar(this.idReserva, {
          data_checkin: this.form.data_checkin,
          data_checkout: this.form.data_checkout,
          status: this.form.status,
        });
        alert("Reserva atualizada com sucesso!");
      } catch (error) {
        alert("Erro ao atualizar reserva!");
      }
    },
    async buscarReserva() {
      try {
        const response = await reserva.buscar(this.idReserva);
        this.form.data_checkin = moment(response.data.data_checkin).format(
          "YYYY-MM-DD"
        );
        this.form.data_checkout = moment(response.data.data_checkout).format(
          "YYYY-MM-DD"
        );
        this.form.status = response.data.status;
        this.numeroReserva = response.data.numero_reserva;
      } catch (error) {
        alert("Não foi possível buscar a reserva");
      }
    },
  },
  mounted() {
    this.idReserva = this.$route.params.id;
    this.buscarReserva();
  },
};
</script>

<template>
  <section class="container section">
    <h2>Atualizar reserva {{ this.numeroReserva }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <label for="checkin">Data de check-in</label>
        <input
          type="date"
          id="checkin"
          name="checkin"
          v-model="form.data_checkin"
          required
        />
      </div>
      <div class="input-container">
        <label for="checkout">Data de check-ou</label>
        <input
          type="date"
          id="checkout"
          name="checkout"
          v-model="form.data_checkout"
          required
        />
      </div>
      <div class="input-container">
        <label for="status-select">Status da reserva:</label>
        <select id="status-select" v-model="form.status">
          <option value="pendente">Pendente</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </div>

      <button type="submit">Atualizar</button>
    </form>
  </section>
</template>

<style scoped></style>
