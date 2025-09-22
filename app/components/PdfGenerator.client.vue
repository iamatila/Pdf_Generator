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
      backgroundColor: '#f8bbd9', // Match the gradient background
      width: element.scrollWidth,
      height: element.scrollHeight
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // A4 dimensions in mm
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate scaling to fill the entire page
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    
    // Scale to fit width, and stretch to full height if needed
    const widthRatio = pdfWidth / imgWidth
    const heightRatio = pdfHeight / imgHeight
    
    // Use the ratio that fills the page better
    const ratio = Math.max(widthRatio, heightRatio)
    
    const scaledWidth = imgWidth * ratio
    const scaledHeight = imgHeight * ratio
    
    // Center the image if it's smaller than page
    const imgX = (pdfWidth - scaledWidth) / 2
    const imgY = 0 // Start from top
    
    // Fill the entire page with the gradient background color
    pdf.setFillColor(248, 187, 217) // Pink color from gradient
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F')
    
    // Add the invoice image
    pdf.addImage(
      imgData, 
      'PNG', 
      imgX, 
      imgY, 
      scaledWidth, 
      Math.min(scaledHeight, pdfHeight) // Don't exceed page height
    )
    
    pdf.save(`invoice-${props.invoiceData.invoiceNumber || '001'}.pdf`)
    
  } catch (error) {
    console.error('PDF generation failed:', error)
    alert('PDF generation failed. Please try again.')
  }
  
  loading.value = false
}
</script>