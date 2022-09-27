<script setup>
  import { ref, computed } from 'vue'
  import { uploadFile, getImageDisplayUrl, validateCaptcha, ping } from '@/lib/api'
  import { blobToBase64, captchaReady } from '@/lib/utils'
  import { useClipboard } from '@vueuse/core'
  import FilePicker from './components/FilePicker.vue'

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const imageLink = ref(null)
  const imageUrl = ref(null)
  const imageAsBgUrl = computed(() => {
    return imageUrl.value
      ? ({ 'background-image': `url(${ imageUrl.value })` })
      : {}
  })
  const uploadLoading = ref(false)
  const uploadSuccess = ref(false)
  const pingLoading = ref(false)
  const serverOffline = ref(false)
  const { copy, isSupported } = useClipboard({ })

  const reset = () => {
    imageUrl.value = null
    imageLink.value = null
    uploadLoading.value = false
    uploadSuccess.value = false
  }

  const handleFileUpload = async (file) => {
    try {
      const captcha = await captchaReady()
      const captchaResponse = await captcha.execute(
        RECAPTCHA_SITE_KEY,
        { action: 'upload' }
      )
      const { payload } = await validateCaptcha(captchaResponse)
      const res = await uploadFile(file, payload.temp_token)
      const url = getImageDisplayUrl(res.payload)
      return url
    } catch (error) {
      throw error
    }
  }

  const handleFile = async (file) => {
    const supportedFileTypes = [
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png'
    ]

    if (!supportedFileTypes.includes(file.type)) {
      alert('Unsupported file type. Only images allowed for upload.')
      return
    }

    uploadLoading.value = true
    uploadSuccess.value = false

    try {
      const url = await handleFileUpload(file)

      imageLink.value = url
      imageUrl.value = await fetch(url, { mode: 'no-cors' })
        .then(res => res.blob())
        .then(blob => blobToBase64(blob))

      uploadLoading.value = false
      uploadSuccess.value = true
    } catch (error) {
      uploadLoading.value = false
      console.error(error)
      alert('An error occured while uploading your image. Please try again or try another image.')
    }
  }

  const handleCopy = async () => {
    if (!isSupported) {
      alert('Clipboard is not supported in your browser.')
      return
    }

    await copy(imageLink.value)

    // TODO: show toast
  }

  pingLoading.value = true
  ping()
    .then(() => pingLoading.value = false)
    .catch(() => serverOffline.value = true)
</script>

<template>
<main class="w-full h-full pt-16 px-4 bg-[#FAFAFB] lg:grid lg:place-items-center">
  <section
    class="w-full px-8 text-center bg-white shadow-md py-9 rounded-xl sm:max-w-sm"
    :class="(uploadLoading || uploadSuccess) && 'hidden'">
    <FilePicker @file="handleFile"></FilePicker>
  </section>
  <section
    class="w-full px-8 text-center bg-white shadow-md py-9 rounded-xl sm:max-w-sm"
    :class="!uploadLoading && 'hidden'">
    <h2 class="text-lg">Uploading...</h2>
    <div class="relative overflow-x-hidden h-1.5 w-full mt-8 rounded-lg bg-[#F2F2F2]">
      <div class="w-24 h-full rounded-lg bg-blue-grayish animate-progress"></div>
    </div>
  </section>
  <section
    class="w-full px-8 text-center bg-white shadow-md py-9 rounded-xl sm:max-w-sm"
    :class="!uploadSuccess && 'hidden'">
    <div class="mx-auto w-max bg-[#219653] text-white rounded-full scale-150">
      <img src="@/assets/checkmark-white.svg" width="24" height="24" alt="" />
    </div>
    <h2 class="mt-3 text-lg font-medium">Uploaded Successfully!</h2>
    <div class="w-full min-h-[14rem] mt-6 bg-center bg-cover rounded-xl" :style="imageAsBgUrl">
    </div>
    <div class="mt-6">
      <label class="flex p-0.5 w-full rounded-xl bg-[#F6F8FB] border border-[#E0E0E0]">
        <input
          type="text"
          :value="imageLink"
          readonly
          class="grow bg-transparent text-[#4F4F4F] text-[0.5rem] font-medium tracking-tight mx-1.5" />
        <button
          type="button"
          class="px-4 py-2 text-xs font-medium tracking-tight text-white rounded-lg bg-blue-grayish"
          @click="handleCopy">
          Copy link
        </button>
      </label>
    </div>
    <div class="mt-6">
      <button type="button" class="text-xs text-[#4F4F4F] font-medium" @click="reset">Start over</button>
    </div>
  </section>

  <p
    v-if="pingLoading"
    class="mt-6 text-center text-xs text-[#4F4F4F]"
    :class="{ 'animate-pulse': !serverOffline, 'text-red-500': serverOffline }">
    {{ serverOffline ? 'Server is offline' : 'Server is loading' }}
  </p>
</main>
</template>

<style>
  .animate-progress {
    animation-name: progressAnimation;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  @keyframes progressAnimation {
    0% {
      transform: translateX(-70%);
    }
    50% {
      transform: translateX(270%);
    }
    100% {
      transform: translateX(-70%);
    }
  }
</style>
