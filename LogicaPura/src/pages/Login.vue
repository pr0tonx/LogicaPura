<template>
  <div class="w-full h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
    <div class="w-full max-w-xl bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-emerald-100/50 border border-emerald-50 flex flex-col justify-center">

      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-3xl mb-4">
          <i class="pi pi-lock text-emerald-600 text-3xl font-bold"></i>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tighter uppercase">Login</h1>
        <p class="text-gray-500 mt-2 font-medium text-lg">Bem-vindo de volta ao LógicaPura!</p>
      </div>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">

        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-slate-700 ml-1">E-mail</label>
          <p-input-text
              v-model="email"
              type="email"
              placeholder="exemplo@email.com"
              class="w-full p-4 rounded-2xl border-gray-200"
              required
          />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center px-1">
            <label class="text-sm font-bold text-slate-700">Senha</label>
            <button type="button" @click="forgotPassword" class="text-xs text-emerald-600 hover:text-emerald-800 font-bold hover:underline">
              Esqueceu a senha?
            </button>
          </div>
          <p-input-text
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full p-4 rounded-2xl border-gray-200"
              required
              toggleMask
          />
        </div>

        <p-button
            type="submit"
            label="Entrar na conta"
            icon="pi pi-sign-in"
            class="w-full bg-emerald-600 border-none hover:bg-emerald-700 text-white font-black text-xl py-5 rounded-3xl transition-all shadow-xl shadow-emerald-100 mt-2"
        />
      </form>

      <div class="mt-10 text-center">
        <p class="text-gray-600 font-medium">
          Ainda não tem conta?
          <button @click="goToRegister" class="text-emerald-600 font-black hover:underline underline-offset-4 ml-1">
            Crie uma agora
          </button>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
// Importando os componentes necessários
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  name: 'Login',
  components: {
    'p-input-text': InputText,
    'p-button': Button
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    handleLogin() {
      const foundUser = this.$store.state.registeredUsers.find(
          u => u.email === this.email && u.password === this.password
      );

      if (foundUser) {
        this.$store.commit('SET_LOGGED_USER', foundUser);
        this.$router.push('/landing');
      } else {
        alert("E-mail ou senha incorretos. Verifique seus dados!");
      }
    },
    forgotPassword() {
      alert("Enviamos um link de recuperação para o seu e-mail (simulado).");
    },

    goToRegister() {
      this.$router.push('/cadastro');
    }
  }
};
</script>

<style scoped>
/* Estilização para combinar com os inputs do PrimeVue */
:deep(.p-inputtext) {
  border: 2px solid #f1f5f9;
  transition: all 0.2s;
}
:deep(.p-inputtext:focus) {
  border-color: #059669 !important;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1) !important;
}
</style>