<template>
  <div class="ad-container">
    <ins
      class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="responsive"
    ></ins>
  </div>
</template>

<script setup lang="ts">
// Get the runtime config
const config = useRuntimeConfig()

// Define props
// const props = defineProps({
defineProps({
  adSlot: {
    type: String,
    required: true
  },
  adFormat: {
    type: String,
    default: 'auto'
  },
  responsive: {
    type: String,
    default: 'true'
  },
  adStyle: {
    type: String,
    default: 'display:block'
  }
})

// Get client ID from runtime config
const adClient = config.public.public_google_ads_client_id

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

onMounted(() => {
  try {
    // Push ad to the adsbygoogle array
    (window.adsbygoogle = window.adsbygoogle || []).push({} as Record<string, unknown>)
  } catch (e) {
    console.error('AdSense error:', e)
  }
})
</script>

<style scoped>
.ad-container {
  margin: 20px 0;
  text-align: center;
}
</style>