<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f6faf7] to-[#e9f5ee] font-sans">

    <!-- New Hero Section -->
    <section class="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 gap-12 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg overflow-hidden">
      <div class="flex-1 min-w-[300px] z-10">
        <h1 class="text-5xl md:text-6xl font-extrabold text-[#222] mb-6 leading-tight tracking-tight">
          Transform Your <span class="italic text-green-700">Body & Mind</span> with <span class="text-orange-500">Proven Results</span>
        </h1>
        <p class="text-lg md:text-xl text-green-800 mb-8 max-w-xl">
          Join <span class="font-bold text-green-700">5,000+</span> members who have achieved their goals and improved their lives with Zentro's certified consultants.<br>
          <span class="font-bold text-orange-500">10+ years</span> of results. <span class="font-bold text-green-700">98% satisfaction</span>.
        </p>
        <div class="flex gap-4 mb-8 flex-wrap">
          <router-link to="/register" class="btn-green text-lg">Start Your Consultation</router-link>
          <router-link to="/consultants" class="btn-orange text-lg">Book Free Consultation</router-link>
        </div>
        <div class="flex gap-8 mt-6">
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold text-green-700 counter" data-target="5000">0</span>
            <span class="text-green-800 text-sm">Members</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold text-green-700 counter" data-target="10">0</span>
            <span class="text-green-800 text-sm">Years in Business</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold text-green-700 counter" data-target="98">0</span>
            <span class="text-green-800 text-sm">% Success Rate</span>
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-center items-center z-10">
        <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80" alt="Zentro Consultation" class="rounded-3xl shadow-2xl border-4 border-green-100 max-w-xs w-full aspect-square object-cover" loading="lazy" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-green-200/30 to-orange-100/20 animate-gradient-move pointer-events-none"></div>
    </section>

    <!-- Stats Bar -->
    <section class="bg-white/80 py-8 rounded-2xl max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12 shadow-md px-4 md:px-12">
      <div class="text-center flex-1">
        <div class="text-3xl font-bold text-[#357a38]">3.2K</div>
        <div class="text-[#4B8843] font-medium">World champions</div>
      </div>
      <div class="text-center flex-1">
        <div class="text-3xl font-bold text-[#357a38]">1.8%</div>
        <div class="text-[#4B8843] font-medium">Runner-up champions</div>
      </div>
      <div class="text-center flex-1">
        <div class="text-3xl font-bold text-[#357a38]">4.5M</div>
        <div class="text-[#4B8843] font-medium">Sea games participation</div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h2 class="text-3xl font-bold text-[#222] mb-8 tracking-tight">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition border border-[#e9f5ee]">
          <i class="fas fa-briefcase text-5xl mb-4 text-blue-600"></i>
          <h3 class="text-xl font-semibold text-[#357a38] mb-2">Businesses</h3>
          <p class="text-[#4B8843] mb-4">Comprehensive business consulting services including strategy, operations, marketing, and growth planning for companies of all sizes.</p>
          <router-link to="/services" class="text-[#4B8843] font-semibold hover:underline">View more →</router-link>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition border border-[#e9f5ee]">
          <i class="fas fa-heartbeat text-5xl mb-4 text-red-600"></i>
          <h3 class="text-xl font-semibold text-[#357a38] mb-2">Healthcare</h3>
          <p class="text-[#4B8843] mb-4">Professional healthcare consulting services covering medical practice management, patient care optimization, and healthcare technology implementation.</p>
          <router-link to="/services" class="text-[#4B8843] font-semibold hover:underline">View more →</router-link>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition border border-[#e9f5ee]">
          <i class="fas fa-laptop-code text-5xl mb-4 text-purple-600"></i>
          <h3 class="text-xl font-semibold text-[#357a38] mb-2">Technology</h3>
          <p class="text-[#4B8843] mb-4">Expert technology consulting for digital transformation, software development, IT infrastructure, and emerging tech solutions.</p>
          <router-link to="/services" class="text-[#4B8843] font-semibold hover:underline">View more →</router-link>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition border border-[#e9f5ee]">
          <i class="fas fa-user-graduate text-5xl mb-4 text-green-600"></i>
          <h3 class="text-xl font-semibold text-[#357a38] mb-2">Personal Growth</h3>
          <p class="text-[#4B8843] mb-4">Personal development and life coaching services to help individuals achieve their goals, improve skills, and enhance overall well-being.</p>
          <router-link to="/services" class="text-[#4B8843] font-semibold hover:underline">View more →</router-link>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h2 class="text-3xl font-bold text-[#222] mb-8 tracking-tight">Meet Our Team</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#e9f5ee]">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-24 h-24 rounded-full mb-4 object-cover shadow-md border-4 border-[#e9f5ee]" alt="Consultant 1" />
          <h3 class="text-xl font-semibold text-[#357a38] mb-1">Layla Al Farsi</h3>
          <div class="text-[#4B8843] mb-2">Business Consultant</div>
          <p class="text-[#4B8843]">Specializes in business strategy and growth, helping clients achieve their professional goals.</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#e9f5ee]">
          <img src="https://randomuser.me/api/portraits/women/65.jpg" class="w-24 h-24 rounded-full mb-4 object-cover shadow-md border-4 border-[#e9f5ee]" alt="Consultant 2" />
          <h3 class="text-xl font-semibold text-[#357a38] mb-1">Sara Mansoori</h3>
          <div class="text-[#4B8843] mb-2">Healthcare Consultant</div>
          <p class="text-[#4B8843]">Expert in healthcare management and patient care optimization, passionate about empowering clients.</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#e9f5ee]">
          <img src="https://randomuser.me/api/portraits/women/32.jpg" class="w-24 h-24 rounded-full mb-4 object-cover shadow-md border-4 border-[#e9f5ee]" alt="Consultant 3" />
          <h3 class="text-xl font-semibold text-[#357a38] mb-1">Noor Al Suwaidi</h3>
          <div class="text-[#4B8843] mb-2">Personal Growth Consultant</div>
          <p class="text-[#4B8843]">Focuses on holistic growth, mindfulness, and stress management for a balanced lifestyle.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isLoggedIn = computed(() => !!auth.user || !!auth.token)

onMounted(() => {
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.getAttribute('data-target')
    let count = 0
    const step = Math.ceil(target / 60)
    const update = () => {
      count += step
      if (count > target) count = target
      el.textContent = count
      if (count < target) requestAnimationFrame(update)
    }
    update()
  })
})
</script>

<style lang="postcss" scoped>
body {
  font-family: 'Inter', 'Nunito', 'Segoe UI', Arial, sans-serif;
}
.btn-green {
  @apply px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition;
}
.btn-orange {
  @apply px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition;
}
</style> 