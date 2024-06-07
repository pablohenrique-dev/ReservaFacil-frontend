<script>
import { hospede } from "@/services/hospede";
import { reserva } from "@/services/reserva";

export default {
  data() {
    return {
      form: {
        data_checkin: "",
        data_checkout: "",
        hospedesSelecionados: [],
      },
      hospedes: [],
      hospedeSelecionado: null,
    };
  },
  methods: {
    adicionarHospede(hospede) {
      this.form.hospedesSelecionados.push(hospede);
      this.hospedes = this.hospedes.filter(
        (hospedeSelecionado) => hospedeSelecionado.id !== hospede.id
      );
    },
    removerHospede(hospedeAserRemovido) {
      this.form.hospedesSelecionados = this.form.hospedesSelecionados.filter(
        (hospede) => hospede.id !== hospedeAserRemovido.id
      );
      this.hospedes.push(hospedeAserRemovido);
    },
    validarInputs() {
      if (this.form.data_checkin.length === 0) {
        alert("O campo data de checkin é obrigatório");
        return false;
      }
      if (this.form.data_checkout.length === 0) {
        alert("O campo data de checkout é obrigatório");
        return false;
      }
      if (this.form.hospedesSelecionados.length === 0) {
        alert("Pelo menos um hóspede precisa ser selecionado");
        return false;
      }

      return true;
    },
    async handleSubmit() {
      if (!this.validarInputs()) return;
      try {
        await reserva.cadastrar({
          data_checkin: this.form.data_checkin,
          data_checkout: this.form.data_checkout,
          hospedes: this.form.hospedesSelecionados.map((hospede) => hospede.id),
        });
        alert("Reserva cadastrada com sucesso!");
      } catch (error) {
        alert("Erro ao cadastrar reserva!");
      }
    },
    async buscarHospedes() {
      try {
        const response = await hospede.listar();
        this.hospedes = response.data;
      } catch (error) {
        alert("Erro ao buscar hóspedes!");
      }
    },
  },
  mounted() {
    this.buscarHospedes();
  },
};
</script>

<template>
  <section class="container section">
    <h2>Cadastrar reserva</h2>

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
        <label for="hospedeSelect">Hóspedes</label>
        <select class="" id="hospedeSelect" v-model="hospedeSelecionado">
          <option
            v-for="hospede in hospedes"
            :key="hospede.id"
            :value="hospede"
          >
            {{ hospede.nome }}
          </option>
          <option disabled v-if="this.hospedes.length === 0">
            Não há mais hóspedes para selecionar
          </option>
        </select>
        <button
          class="btn-secundario"
          type="button"
          @click="adicionarHospede(hospedeSelecionado)"
        >
          Adicionar
        </button>
      </div>
      <ul class="lista-hospedes-selecionados">
        <li
          class="item-hospede-selecionado"
          v-for="hospede in form.hospedesSelecionados"
        >
          {{ hospede.nome }}
          <button @click="removerHospede(hospede)" type="button">X</button>
        </li>
      </ul>

      <button type="submit">Criar</button>
    </form>
  </section>
</template>

<style scoped>
.item-hospede-selecionado {
  margin: 16px 0;
}
.item-hospede-selecionado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: fade-left 0.3s;
}

.item-hospede-selecionado + .item-hospede-selecionado {
  margin-top: 12px;
}

.item-hospede-selecionado button {
  width: 24px;
  aspect-ratio: 1/1;
  background: #ff0000;
  color: #ffffff;
}

@keyframes fade-left {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
