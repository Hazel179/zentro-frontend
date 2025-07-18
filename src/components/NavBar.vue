<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link flex items-center gap-2">
          <img src="@/assets/image/Zentro Logo.png" alt="Zentro Logo" class="zentro-logo" />
        </router-link>
      </div>
      <div class="nav-menu">
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/consultants" class="nav-link">Consultants</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/bookings" class="nav-link">Bookings</router-link>
        <!-- Profile link removed -->
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      </div>
      <div class="nav-buttons">
        <button @click="goToProfile" class="profile-btn">Profile</button>
        <button @click="startFree" class="start-btn">Start for free</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToProfile() {
  router.push('/profile')
}
function startFree() {
  router.push('/register')
}
</script>

<style scoped>
/* EMERGENCY NAVBAR FIX */
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand {
  flex-shrink: 0;
}

.nav-brand a {
  font-size: 24px;
  font-weight: bold;
  color: #059669;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 30px;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}

.nav-menu a {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #059669;
}

.nav-buttons {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-shrink: 0;
}

.nav-buttons button {
  background: #059669;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.nav-buttons button:hover {
  background: #047857;
}

/* Remove any conflicting styles */
.navbar * {
  box-sizing: border-box;
}

.zentro-logo {
  height: 70px;
  width: 70px;
  object-fit: contain;
  display: inline-block;
  vertical-align: middle;
}
</style> 