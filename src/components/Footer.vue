<template>
  <footer class="w-full bg-white border-t border-gray-200 mt-16 py-8">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-extrabold text-green-700 tracking-tight">Zentro</span>
        <span class="text-gray-400">| Wellness & Fitness</span>
      </div>
      <nav class="flex gap-6 text-green-700 font-medium">
        <router-link to="/services" class="hover:underline">Services</router-link>
        <router-link to="/consultants" class="hover:underline">Consultants</router-link>
        <router-link to="/bookings" class="hover:underline">Bookings</router-link>
        <router-link to="/profile" class="hover:underline">Profile</router-link>
        <router-link to="/dashboard" class="hover:underline">Dashboard</router-link>
      </nav>
      <div class="text-gray-500 text-sm">© {{ new Date().getFullYear() }} Zentro. All rights reserved.</div>
    </div>
  </footer>
</template>

<script setup>
</script> 