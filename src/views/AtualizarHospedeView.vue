<script>
import { hospede } from "@/services/hospede";

export default {
  data() {
    return {
      form: {
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
      },
    };
  },
  methods: {
    validarInputs() {
      if (this.form.nome.length === 0) {
        alert("O campo nome é obrigatório");
        return false;
      }
      if (this.form.email.length === 0) {
        alert("O campo email é obrigatório");
        return false;
      }
      if (this.form.telefone.length === 0) {
        alert("O campo telefone é obrigatório");
        return false;
      }
      if (this.form.endereco.length === 0) {
        alert("O campo endereco é obrigatório");
        return false;
      }

      return true;
    },
    async handleSubmit() {
      if (!this.validarInputs()) return;
      try {
        await hospede.atualizar(this.$route.params.id, {
          nome: this.form.nome,
          email: this.form.email,
          telefone: this.form.telefone,
          endereco: this.form.endereco,
        });
        alert("Hóspede atualizado com sucesso!");
      } catch (error) {
        alert("Erro ao atualizar hóspede!");
      }
    },
    async buscarHospede() {
      try {
        const dadosHospede = await hospede.buscar(this.$route.params.id);
        this.form.nome = dadosHospede.data.nome;
        this.form.email = dadosHospede.data.email;
        this.form.telefone = dadosHospede.data.telefone;
        this.form.endereco = dadosHospede.data.endereco;
      } catch (error) {
        alert("Erro ao buscar hóspede!");
      }
    },
  },
  mounted() {
    this.buscarHospede();
  },
};
</script>

<template>
  <section class="container section">
    <h2>Atualizar hóspede</h2>

    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <label for="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite seu nome"
          v-model="form.nome"
          required
        />
      </div>
      <div class="input-container">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
          v-model="form.email"
          required
        />
      </div>
      <div class="input-container">
        <label for="telefone">Telefone</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          placeholder="Digite o seu telefone"
          v-model="form.telefone"
          required
        />
      </div>
      <div class="input-container">
        <label for="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          placeholder="Digite o seu endereco"
          v-model="form.endereco"
          required
        />
      </div>
      <button type="submit">Atualizar</button>
    </form>
  </section>
</template>

<style scoped></style>
