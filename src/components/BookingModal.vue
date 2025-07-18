<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
      <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto z-10" @click.stop>
        <button @click="$emit('close')" aria-label="Close" class="absolute top-2 right-2">✕</button>
        <slot :service-data="serviceData" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  serviceData: Object
});

defineEmits(['close']);
</script> 