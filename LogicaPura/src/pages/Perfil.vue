<template>
  <div class="min-h-screen bg-slate-50 text-gray-800 font-sans">
    <header class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/landing')">
          <i class="pi pi-bolt text-emerald-600 text-2xl font-bold"></i>
          <span class="text-2xl font-black tracking-tighter text-slate-900">LógicaPura</span>
        </div>
        <p-button icon="pi pi-sign-out" label="Sair" class="p-button-text text-gray-500" @click="signOff"/>
      </div>
    </header>

    <main class="max-w-4xl mx-auto py-12 px-6">
      <div class="mb-8">
        <h1 class="text-3xl font-black text-slate-900">Meu Perfil</h1>
        <p class="text-gray-500">Gerencie suas informações e configurações de conta.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
            <div class="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-user text-4xl"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-800">{{ $store.state.user.name || 'Usuário' }}</h2>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Instrutor Gold</span>
          </div>
        </div>

        <div class="md:col-span-2">
          <div class="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div class="grid gap-6">

              <div class="flex flex-col gap-2">
                <label class="font-bold text-slate-700 ml-1">Nome de Exibição</label>
                <p-input-text v-model="formData.name" placeholder="Ex: Edu Rocha" class="w-full p-3 border-gray-200 rounded-xl focus:border-emerald-500" />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-bold text-slate-700 ml-1">E-mail</label>
                <div class="relative">
                  <p-input-text :value="$store.state.user.email" disabled class="w-full p-3 bg-gray-50 border-gray-100 rounded-xl text-gray-400 opacity-70 cursor-not-allowed" />
                  <i class="pi pi-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
                </div>
                <small class="text-amber-600 font-medium">O e-mail não pode ser alterado por segurança.</small>
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-bold text-slate-700 ml-1">Bio Profissional</label>
                <p-textarea v-model="formData.bio" rows="4" class="w-full p-3 border-gray-200 rounded-xl" placeholder="Conte sobre sua experiência..." />
                <small class="text-gray-400">Essa descrição aparece na sua página pública de cursos.</small>
              </div>

              <hr class="border-gray-100 my-4" />

              <div class="flex justify-end gap-3">
                <p-button label="Descartar" class="p-button-text text-gray-500 font-bold" @click="resetFields" />
                <p-button
                    label="Salvar Alterações"
                    icon="pi pi-check"
                    class="bg-emerald-600 border-emerald-600 px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700"
                    @click="saveChanges"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

export default {
  name: 'Perfil',
  components: {
    'p-button': Button,
    'p-input-text': InputText,
    'p-textarea': Textarea
  },
  data() {
    return {
      formData: {
        name: this.$store.state.user.name || '',
        bio: this.$store.state.user.bio || ''
      }
    };
  },
  methods: {
    saveChanges() {
      // Chama a mutation passando o objeto com os novos dados
      this.$store.commit('UPDATE_USER_DATA', {
        name: this.formData.name,
        bio: this.formData.bio
      });

      alert('Perfil atualizado com sucesso!');
    },
    signOff(){
      this.$store.commit('SIGNOFF', false)
      this.$router.push('/login');
    },
    resetFields() {
      // Volta os campos para o que está na store atualmente
      this.formData.name = this.$store.state.user.name;
      this.formData.bio = this.$store.state.user.bio;
    }
  }
};
</script>