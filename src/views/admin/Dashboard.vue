<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p class="text-sm text-gray-600">Manage users, consultants, bookings, and categories</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard" class="btn-outline">
              User Dashboard
            </router-link>
            <router-link to="/profile" class="btn-primary">
              Profile
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link to="/admin/users" class="card hover:shadow-lg transition">
          <div class="card-body text-center">
            <div class="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a6 6 0 0112 0z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
            <p class="text-sm text-gray-600">View, edit, and remove users</p>
          </div>
        </router-link>
        <router-link to="/admin/consultants" class="card hover:shadow-lg transition">
          <div class="card-body text-center">
            <div class="w-12 h-12 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Consultants</h3>
            <p class="text-sm text-gray-600">Manage consultant profiles</p>
          </div>
        </router-link>
        <router-link to="/admin/bookings" class="card hover:shadow-lg transition">
          <div class="card-body text-center">
            <div class="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Bookings</h3>
            <p class="text-sm text-gray-600">View and manage all bookings</p>
          </div>
        </router-link>
        <router-link to="/admin/categories" class="card hover:shadow-lg transition">
          <div class="card-body text-center">
            <div class="w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
            <p class="text-sm text-gray-600">Edit and organize service categories</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for static dashboard
</script> 