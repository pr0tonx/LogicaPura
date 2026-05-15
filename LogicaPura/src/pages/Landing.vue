<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/landing')">
          <i class="pi pi-bolt text-emerald-600 text-2xl font-bold"></i>
          <span class="text-2xl font-black tracking-tighter text-slate-900">LógicaPura</span>
        </div>

        <nav class="hidden md:flex gap-8 font-semibold text-gray-600">
          <a href="#features" class="hover:text-emerald-600 transition">Recursos</a>
          <a href="#precos" class="hover:text-emerald-600 transition">Preços</a>
          <a href="#faq" class="hover:text-emerald-600 transition">FAQ</a>
        </nav>

        <div class="flex items-center gap-3" v-if="!$store.state.logged">
          <p-button label="Entrar" variant="text" class="text-gray-600 font-bold" @click="$router.push('/login')" />
          <p-button label="Começar agora" icon="pi pi-rocket" class="bg-emerald-600 border-emerald-600 hover:bg-emerald-700" @click="$router.push('/cadastro')" />
        </div>

        <div v-else>
          <p-button :label="`Ola, ${$store.state.user.name}`"  @click="$router.push('/perfil')"/>
        </div>
      </div>
    </header>
    <section class="relative py-20 lg:py-32 px-6 overflow-hidden">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div class="z-10">
          <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm mb-6 uppercase tracking-wider">
             A NOVA ERA DO ENSINO ONLINE
          </span>
          <h1 class="text-5xl lg:text-7xl font-black leading-tight text-slate-900 mb-8">
            Transforme suas aulas em um <span class="text-emerald-600">império digital.</span>
          </h1>
          <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
            Hospede seus vídeos, gerencie alunos e receba pagamentos em um só lugar.
            A plataforma feita para quem quer escala e liberdade profissional.
          </p>
          <div class="flex flex-col sm:flex-row gap-4" >
            <p-button label="Quero ser um instrutor" class="p-button-lg px-8 bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-100 hover:scale-105 transition-transform" @click="$router.push('/cadastro')" />
            <p-button label="Ver demonstração" class="p-button-lg px-8 p-button-outlined border-emerald-600 text-emerald-600 hover:bg-emerald-50" icon="pi pi-play" />
          </div>
        </div>

        <div class="relative">
          <div class="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
          <img
              src="https://www.princetonreview.com/cms-content/act-math-problems-2024.png"
              alt="Dashboard da Plataforma"
              class="relative z-10 rounded-3xl shadow-2xl border border-gray-100"
          />
        </div>
      </div>
    </section>

    <section id="features" class="py-24 bg-slate-50 px-6 border-y border-gray-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <h2 class="text-4xl font-black text-slate-900 mb-4">Tudo o que você precisa para crescer</h2>
          <p class="text-lg text-gray-500">Ferramentas de nível profissional para que você foque apenas no que importa: ensinar.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <p-card v-for="feature in features" :key="feature.title" class="border-none shadow-sm hover:shadow-xl transition-shadow duration-300">
            <template #title>
              <div class="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <i :class="[feature.icon, 'text-2xl text-emerald-600']"></i>
              </div>
              <span class="text-xl font-bold text-slate-800">{{ feature.title }}</span>
            </template>
            <template #content>
              <p class="text-gray-600 leading-relaxed">{{ feature.desc }}</p>
            </template>
          </p-card>
        </div>
      </div>
    </section>

    <section id="precos" class="py-24 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black text-slate-900 mb-4 text-center">Planos simples</h2>
          <p class="text-gray-500 text-lg">Sem taxas escondidas. Sem surpresas.</p>
        </div>

        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div v-for="plan in plans" :key="plan.name"
               :class="['p-10 rounded-[2.5rem] border-2 flex flex-col transition-all duration-300',
               plan.highlight ? 'border-emerald-600 shadow-2xl scale-105 bg-white relative z-10' : 'border-gray-100 bg-slate-50']">

            <div v-if="plan.highlight" class="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              MAIS VENDIDO
            </div>

            <h3 class="text-2xl font-bold mb-2 text-slate-800">{{ plan.name }}</h3>
            <div class="flex items-baseline gap-1 mb-4">
              <span class="text-5xl font-black text-slate-900">R$ {{ plan.price }}</span>
              <span class="text-gray-400 font-medium">/mês</span>
            </div>
            <p class="text-gray-600 mb-8 text-sm">{{ plan.description }}</p>

            <ul class="space-y-4 mb-10 flex-grow">
              <li v-for="f in plan.features" :key="f" class="flex items-center gap-3">
                <i class="pi pi-check-circle text-emerald-500 text-xl font-bold"></i>
                <span class="text-gray-700 font-medium">{{ f }}</span>
              </li>
            </ul>

            <p-button 
              :label="plan.buttonLabel"
              :class="['w-full py-4 rounded-2xl font-black text-lg transition-all',
              plan.highlight ? 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100' : 'p-button-outlined border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50']"
              @click="$router.push('/cadastro')" 
            />
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="py-24 px-6 bg-slate-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black text-slate-900 mb-4">Dúvidas Frequentes</h2>
          <p class="text-gray-500">Tudo o que você precisa saber sobre a LógicaPura.</p>
        </div>

        <p-accordion :value="0" class="shadow-xl border  border-gray-100 rounded-3xl overflow-hidden bg-white">
          <p-accordion-panel v-for="(faq, index) in faqs" :key="index" :value="index" class="border-b border-gray-50 last:border-0">
            <p-accordion-header class="font-bold text-slate-800 text-lg py-7 px-8 hover:bg-emerald-50/30 transition-colors">
              {{ faq.question }}
            </p-accordion-header>
            <p-accordion-content class="px-8 pb-8">
              <p class="text-gray-600 leading-relaxed py-2 text-lg border-t border-slate-50 pt-4">{{ faq.answer }}</p>
            </p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      </div> 
    </section>

    <section class="py-24 px-6 bg-emerald-800 relative overflow-hidden">
      <div class="max-w-4xl mx-auto text-center text-white relative z-10">
        <h2 class="text-4xl font-black mb-6">Pronto para começar sua jornada?</h2>
        <p class="text-xl opacity-90 mb-10">Junte-se a mais de 2.000 instrutores que já faturam online todos os dias.</p>
        <p-button label="Criar minha conta agora"
                  class="p-button-lg px-12 bg-white text-emerald-700 border-none font-black hover:bg-emerald-50 transition-all hover:scale-105 py-5 text-xl rounded-2xl shadow-2xl"
                  @click="$router.push('/cadastro')" />
      </div>
    </section>

    <footer class="py-12 px-6 border-t border-gray-100 bg-white">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-2">
          <i class="pi pi-bolt text-emerald-600 font-bold"></i>
          <span class="font-black text-slate-900 uppercase tracking-tighter">LógicaPura 2026</span>
        </div>
        <div class="flex gap-8 text-sm text-gray-500 font-semibold">
          <a href="#" class="hover:text-emerald-600">Termos</a>
          <a href="#" class="hover:text-emerald-600">Privacidade</a>
          <a href="#" class="hover:text-emerald-600">Contato</a>
        </div>
        <div class="flex gap-4">
          <i class="pi pi-instagram cursor-pointer hover:text-emerald-600 transition text-lg"></i>
          <i class="pi pi-twitter cursor-pointer hover:text-emerald-600 transition text-lg"></i>
          <i class="pi pi-linkedin cursor-pointer hover:text-emerald-600 transition text-lg"></i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

export default {
  name: 'LandingPage',
  components: {
    'p-button': Button,
    'p-card': Card,
    'p-accordion': Accordion,
    'p-accordion-panel': AccordionPanel,
    'p-accordion-header': AccordionHeader,
    'p-accordion-content': AccordionContent
  },
  data() {
    return {
      features: [
        {
          title: 'Hospedagem Premium',
          icon: 'pi pi-video',
          desc: 'Seus vídeos protegidos com tecnologia de ponta e carregamento instantâneo para seus alunos.'
        },
        {
          title: 'Vendas Automáticas',
          icon: 'pi pi-shopping-cart',
          desc: 'Checkout otimizado para conversão. Receba pagamentos via Pix e cartão sem dor de cabeça.'
        },
        {
          title: 'Comunidade Integrada',
          icon: 'pi pi-comments',
          desc: 'Área de membros exclusiva com fórum de discussão para aumentar o engajamento dos seus alunos.'
        }
      ],
      plans: [
        {
          name: 'Starter',
          price: '0',
          description: 'Para quem está dando os primeiros passos no mundo digital.',
          features: ['Até 50 alunos ativos', '1 curso completo', 'Suporte via comunidade', 'Taxa de 10% por venda'],
          buttonLabel: 'Começar Grátis',
          highlight: false
        },
        {
          name: 'Expert',
          price: '147',
          description: 'O plano ideal para quem já vive ou quer viver de cursos online.',
          features: ['Alunos ilimitados', 'Cursos ilimitados', 'Certificados automáticos', 'Taxa de apenas 3% por venda'],
          buttonLabel: 'Seja Expert',
          highlight: true
        }
      ],
      faqs: [
        {
          question: 'Quanto tempo demora para eu receber o dinheiro?',
          answer: 'Vendas via Pix caem na sua conta em até 24h. Vendas no cartão de crédito em até 14 dias após a confirmação.'
        },
        {
          question: 'A LógicaPura cobra taxa sobre cursos gratuitos?',
          answer: 'Não! Se o seu curso for gratuito, você não paga nenhuma taxa de transação para a plataforma.'
        },
        {
          question: 'Posso usar meu próprio domínio?',
          answer: 'Com certeza! No plano Expert você pode configurar seu domínio personalizado de forma simples.'
        }
      ]
    }
  }
}
</script>

<style scoped>
:deep(.p-accordionheader) {
  background: white !important;
  transition: all 0.2s;
}

html {
  scroll-behavior: smooth;
}
</style>