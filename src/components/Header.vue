<script></script>

<template>
  <header>
    <div class="container header">
      <span class="logo">ReservaFácil</span>
      <nav>
        <ul>
          <li>
            <RouterLink class="link" to="/">Hóspedes</RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/cadastrar-hospede"
              >Cadastrar hóspede</RouterLink
            >
          </li>
          <li>
            <RouterLink class="link" to="/cadastrar-reserva"
              >Criar reserva</RouterLink
            >
          </li>
          <li>
            <RouterLink class="link" to="/listar-reservas"
              >Listar reservas</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 24px;
}

nav ul {
  display: flex;
  gap: 16px;
}
</style>
