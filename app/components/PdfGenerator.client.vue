<!-- Create a new component: components/PdfGenerator.client.vue -->
<template>
  <v-btn
    @click="generatePDF"
    color="primary"
    size="large"
    block
    prepend-icon="mdi-file-pdf-box"
    :loading="loading"
  >
    Generate PDF
  </v-btn>
</template>

<script setup>
const props = defineProps({
  invoiceData: Object,
  students: Array,
  signaturePreview: String
})

const loading = ref(false)

const generatePDF = async () => {
  loading.value = true
  
  try {
    // Dynamic import ensures client-side only execution
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    
    const element = document.getElementById('invoice-preview')
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    
    pdf.addImage(
      imgData, 
      'PNG', 
      imgX, 
      0, 
      imgWidth * ratio, 
      imgHeight * ratio
    )
    
    pdf.save(`invoice-${props.invoiceData.invoiceNumber || '001'}.pdf`)
    
  } catch (error) {
    console.error('PDF generation failed:', error)
    // You could use Vuetify's snackbar here instead of alert
    alert('PDF generation failed. Please try again.')
  }
  
  loading.value = false
}
</script>