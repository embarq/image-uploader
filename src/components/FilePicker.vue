<script setup>
  import { computed } from '@vue/reactivity';
import { ref } from 'vue'
  const emit = defineEmits([ 'file' ])
  const fileInputRef = ref()
  const droppableHostActive = ref(false)
  const droppableHostClass = computed(() => {
    return droppableHostActive.value ? 'bg-gray-blueish bg-opacity-20' : ''
  })

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    emit('file', file)
  }

  const triggerFileInput = () => {
    if (fileInputRef && fileInputRef.value) {
      fileInputRef.value.click()
    }
  }

  const handleDrop = (event) => {
    const [ file ] = [ ...event.dataTransfer.files ]
    emit('file', file)
  }
</script>
<template>
  <div>
    <h1 class="text-lg font-medium tracking-tight">Upload your image</h1>
    <p class="mt-4 text-[0.625rem]">File should be jpeg, png or gif</p>
    <article
      class="grid w-full h-56 mt-8 border border-dashed border- place-items-center rounded-xl bg-gray-light border-gray-blueish"
      :class="droppableHostClass"
      @dragover="droppableHostActive = true"
      @dragleave="droppableHostActive = false"
      @drop.prevent="handleDrop">
      <div>
        <img src="@/assets/upload-area-img.svg" alt="" class="flex mx-auto" width="115" height="90" />
        <p class="text-xs tracking-tight mt-9 text-gray-medium">Drag & Drop your image here</p>
      </div>
    </article>
    <p class="mt-4 text-xs text-gray-medium">Or</p>
    <button
      type="button"
      class="px-4 py-2 mt-5 text-white rounded-lg bg-blue-grayish"
      @click.stop="triggerFileInput">
      Choose a file
    </button>
    <input ref="fileInputRef" type="file" @change="handleFileInputChange" class="hidden" />
  </div>
</template>
