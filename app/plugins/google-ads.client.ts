export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  useHead({
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        async: true,
        crossorigin: 'anonymous',
        'data-ad-client': config.public.public_google_ads_client_id, // Your Google Ads client ID
        // 'data-ad-client': 'ca-pub-XXXXXXXXXXXXXXXX', // Your Google Ads client ID
      }
    ]
  })
})