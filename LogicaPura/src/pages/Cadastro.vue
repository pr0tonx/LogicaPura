<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-xl bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-emerald-100/50 border border-emerald-50">

      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-3xl mb-4">
          <i class="pi pi-user-plus text-emerald-600 text-3xl"></i>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tighter">Criar sua conta</h1>
        <p class="text-gray-500 mt-2 font-medium text-lg">Junte-se à revolução do ensino online.</p>
      </div>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-6">

        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-slate-700 ml-1">Nome Completo</label>
          <p-inputtext
              v-model="form.name"
              placeholder="Como quer ser chamado?"
              class="w-full p-4 rounded-2xl border-gray-200 focus:border-emerald-500"
              required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-slate-700 ml-1">E-mail Profissional</label>
          <p-inputtext
              v-model="form.email"
              type="email"
              placeholder="exemplo@dominio.com"
              class="w-full p-4 rounded-2xl border-gray-200 focus:border-emerald-500"
              required
          />
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-slate-700 ml-1">Senha</label>
            <p-password
                v-model="form.password"
                placeholder="Sua senha"
                toggleMask
                class="w-full"
                inputClass="w-full p-4 rounded-2xl border-gray-200"
                :feedback="true"
                promptLabel="Escolha uma senha"
                weakLabel="Fraca"
                mediumLabel="Média"
                strongLabel="Forte"
                required
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-slate-700 ml-1 text-emerald-600">Confirmar Senha</label>
            <p-password
                v-model="form.confirmPassword"
                placeholder="Repita a senha"
                toggleMask
                :feedback="false"
                class="w-full"
                inputClass="w-full p-4 rounded-2xl border-gray-200"
                required
            />
          </div>
        </div>

        <div class="flex items-start gap-3 px-1 mt-2">
          <input type="checkbox" id="terms" required class="mt-1 accent-emerald-600 w-5 h-5 cursor-pointer" />
          <label for="terms" class="text-sm text-gray-500 leading-snug mt-[6px]">
            Li e concordo com os <span class="text-emerald-600 font-bold cursor-pointer hover:underline">Termos de Uso</span> e a <span class="text-emerald-600 font-bold cursor-pointer hover:underline">Política de Privacidade</span>.
          </label>
        </div>

        <p-button
            type="submit"
            label="Criar minha plataforma"
            icon="pi pi-check"
            class="w-full py-5 bg-emerald-600 border-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-100 font-black text-xl rounded-[1.5rem] transition-all"
        />

        <div class="text-center mt-4">
          <p class="text-base text-gray-600 font-medium">
            Já tem uma conta?
            <router-link to="/login" class="text-emerald-600 font-black hover:underline underline-offset-4">
              Fazer Login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
  name: 'CadastroPage',
  components: {
    'p-inputtext': InputText,
    'p-password': Password, // Note que p-password é o componente de força de senha do PrimeVue
    'p-button': Button
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }

      const userExists = this.$store.state.registeredUsers.find(u => u.email === this.form.email);
      if (userExists) {
        alert("Este e-mail já está em uso.");
        return;
      }

      this.$store.commit('CREATE_USER', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        bio: '' // Inicializa a bio vazia para não quebrar o Perfil
      });

      alert("Conta criada com sucesso!");
      
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* Garante que os inputs do PrimeVue respeitem o container */
:deep(.p-password-input) {
  width: 100% !important;
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-inputtext) {
  transition: all 0.2s ease-in-out;
}

:deep(.p-inputtext:focus) {
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  border-color: #10b981 !important;
}
</style>