<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p class="text-sm text-gray-600">View and manage user accounts</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/admin" class="btn-outline">
              Admin Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="card">
        <div class="card-body">
          <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input v-model="search" type="text" placeholder="Search users..." class="form-input w-full md:w-64" />
          </div>
          <div v-if="loading" class="text-center py-8">Loading users...</div>
          <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in filteredUsers" :key="user.id">
                  <td class="px-4 py-2">{{ user.firstName }} {{ user.lastName }}</td>
                  <td class="px-4 py-2">{{ user.email }}</td>
                  <td class="px-4 py-2">
                    <select v-model="user.role" @change="updateRole(user)" class="form-input">
                      <option value="admin">admin</option>
                      <option value="consultant">consultant</option>
                      <option value="client">client</option>
                    </select>
                  </td>
                  <td class="px-4 py-2">
                    <button @click="deleteUser(user)" class="btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="filteredUsers.length === 0" class="text-center text-gray-500 py-8">No users found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminAPI } from '@/services/api'

const users = ref([])
const loading = ref(false)
const error = ref('')
const search = ref('')

const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await adminAPI.getUsers()
    users.value = res.data.data.users || res.data.data || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

const deleteUser = async (user) => {
  if (!confirm(`Delete user ${user.email}?`)) return
  try {
    await adminAPI.updateUserStatus(user.id, 'deleted')
    users.value = users.value.filter(u => u.id !== user.id)
  } catch (err) {
    alert('Failed to delete user')
  }
}

const updateRole = async (user) => {
  try {
    await adminAPI.updateUserStatus(user.id, user.role)
  } catch (err) {
    alert('Failed to update role')
  }
}

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    u.email.toLowerCase().includes(search.value.toLowerCase()) ||
    u.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
    u.lastName.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(fetchUsers)
</script> 