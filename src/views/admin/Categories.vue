<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manage Categories</h1>
            <p class="text-sm text-gray-600">Edit and organize service categories</p>
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
          <form @submit.prevent="createCategory" class="mb-6 flex gap-4">
            <input v-model="newCategory" type="text" placeholder="New category name" class="form-input w-full" />
            <button type="submit" class="btn-primary">Add</button>
          </form>
          <div v-if="loading" class="text-center py-8">Loading categories...</div>
          <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="category in categories" :key="category.id">
                  <td class="px-4 py-2">
                    <input v-model="category.name" @blur="updateCategory(category)" class="form-input w-full" />
                  </td>
                  <td class="px-4 py-2">
                    <button @click="deleteCategory(category)" class="btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="categories.length === 0" class="text-center text-gray-500 py-8">No categories found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminAPI } from '@/services/api'

const categories = ref([])
const loading = ref(false)
const error = ref('')
const newCategory = ref('')

const fetchCategories = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await adminAPI.getCategories()
    categories.value = res.data.data.categories || res.data.data || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load categories'
  } finally {
    loading.value = false
  }
}

const createCategory = async () => {
  if (!newCategory.value.trim()) return
  try {
    const res = await adminAPI.createCategory({ name: newCategory.value })
    categories.value.push(res.data.data.category || res.data.data)
    newCategory.value = ''
  } catch (err) {
    alert('Failed to create category')
  }
}

const updateCategory = async (category) => {
  try {
    await adminAPI.updateCategory(category.id, { name: category.name })
  } catch (err) {
    alert('Failed to update category')
  }
}

const deleteCategory = async (category) => {
  if (!confirm(`Delete category ${category.name}?`)) return
  try {
    await adminAPI.deleteCategory(category.id)
    categories.value = categories.value.filter(c => c.id !== category.id)
  } catch (err) {
    alert('Failed to delete category')
  }
}

onMounted(fetchCategories)
</script> 