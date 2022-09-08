<script setup>
</script>

<template>
<main class="w-full h-full pt-16 px-4 bg-[#FAFAFB] lg:grid lg:place-items-center">
  <section class="w-full px-8 text-center bg-white shadow-md py-9 rounded-xl sm:max-w-sm">
    <h1 class="text-lg font-medium tracking-tight">Upload your image</h1>
    <p class="mt-4 text-[0.625rem]">File should be jpeg, png or gif</p>
    <article class="grid w-full h-56 mt-8 place-items-center rounded-xl bg-[#F6F8FB] border border-[#97BEF4] border-dashed">
      <div>
        <img src="./assets/upload-area-img.svg" alt="" class="flex mx-auto" />
        <p class="mt-9 text-xs text-[#BDBDBD] tracking-tight">Drag & Drop your image here</p>
      </div>
    </article>
    <p class="mt-4 text-[#BDBDBD] text-xs">Or</p>
    <button type="button" class="mt-5">Choose a file</button>
  </section>
</main>
</template>
