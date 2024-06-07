<script>
import { hospede } from "@/services/hospede";

export default {
  data() {
    return {
      hospedes: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await hospede.listar();
        this.hospedes = response.data;
      } catch (error) {
        alert("Erro ao listar hóspedes!");
      }
    },
  },
};
</script>

<template>
  <section class="container section">
    <h2>Lista de hóspedes</h2>
    <table class="container-tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hospede in hospedes" :key="hospede.id">
          <td>{{ hospede.nome }}</td>
          <td>{{ hospede.email }}</td>
          <td>{{ hospede.telefone }}</td>
          <td>{{ hospede.endereco }}</td>
          <td>
            <RouterLink
              class="btn-update"
              :to="`/atualizar-hospede/${hospede.id}`"
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
