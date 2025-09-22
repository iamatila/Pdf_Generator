<!-- <script lang="ts" setup>
//
</script>

<template>
  <HelloWorld />
</template> -->

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Input Form -->
          <v-col cols="12" md="6">
            <v-card class="pa-4">
              <v-card-title class="text-h5 mb-4">
                <v-icon left>mdi-invoice-text</v-icon>
                Invoice Generator
              </v-card-title>
              
              <v-form @submit.prevent="generatePDF">
                <!-- Student Names -->
                <v-card variant="outlined" class="mb-4">
                  <v-card-title class="text-h6">Invoice For</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="invoiceData.item"
                      label="Mrs Kemi Ojo"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    />
                  </v-card-text>
                </v-card>
                
                <!-- Invoice Details -->
                <v-card variant="outlined" class="mb-4">
                  <v-card-title class="text-h6">Invoice Details</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="invoiceData.invoiceNumber"
                          label="Invoice Number"
                          variant="outlined"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="invoiceData.date"
                          label="Date"
                          type="date"
                          variant="outlined"
                          density="compact"
                        />
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="invoiceData.location"
                      label="Location"
                      variant="outlined"
                      density="compact"
                    />
                  </v-card-text>
                </v-card>

                <!-- Service Details -->
                <v-card variant="outlined" class="mb-4">
                  <v-card-title class="text-h6">Service Details</v-card-title>
                  <v-card-text>
                    <!-- Student Names -->
                    <v-card variant="outlined" class="mb-4">
                      <v-card-title class="text-h6">Student Information</v-card-title>
                      <v-card-text>
                        <div v-for="(student, index) in students" :key="index" class="d-flex align-center mb-2">
                          <v-text-field
                            v-model="students[index]"
                            :label="`Student ${index + 1} Name`"
                            variant="outlined"
                            density="compact"
                            class="flex-grow-1 mr-2"
                          />
                          <v-btn
                            v-if="students.length > 1"
                            icon="mdi-delete"
                            color="error"
                            size="small"
                            @click="removeStudent(index)"
                          />
                        </div>
                        <v-btn
                          @click="addStudent"
                          color="primary"
                          variant="outlined"
                          prepend-icon="mdi-plus"
                          size="small"
                        >
                          Add Student
                        </v-btn>
                      </v-card-text>
                    </v-card>
                    <v-text-field
                      v-model="invoiceData.subjects"
                      label="Subjects"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    />
                    <v-text-field
                      v-model="invoiceData.numberOfContact"
                      label="Number of Contact (e.g., THREE TIMES(4) WEEKLY)"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    />
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model.number="invoiceData.units"
                          label="Units"
                          type="number"
                          variant="outlined"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model.number="invoiceData.total"
                          label="Total Amount"
                          type="number"
                          variant="outlined"
                          density="compact"
                        />
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model.number="invoiceData.tax"
                      label="Tax (%)"
                      type="number"
                      variant="outlined"
                      density="compact"
                    />
                  </v-card-text>
                </v-card>

                <!-- Payment Details -->
                <v-card variant="outlined" class="mb-4">
                  <v-card-title class="text-h6">Payment Details</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="invoiceData.accountName"
                      label="Account Name"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    />
                    <v-text-field
                      v-model="invoiceData.accountNo"
                      label="Account Number"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    />
                    <v-text-field
                      v-model="invoiceData.bankName"
                      label="Bank Name"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    />
                    
                    <!-- Signature Upload -->
                    <v-file-input
                      v-model="signatureFile"
                      label="Upload Signature Image"
                      accept="image/*"
                      variant="outlined"
                      density="compact"
                      prepend-icon="mdi-camera"
                      @change="handleSignatureUpload"
                    />
                    
                    <!-- Signature Preview -->
                    <div v-if="signaturePreview" class="mt-2">
                      <v-img
                        :src="signaturePreview"
                        max-width="200"
                        max-height="100"
                        class="signature-preview"
                      />
                      <v-btn
                        @click="removeSignature"
                        color="error"
                        size="small"
                        variant="text"
                        class="mt-1"
                      >
                        Remove Signature
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Use client-only component for PDF generation -->
                <ClientOnly>
                  <PdfGenerator 
                    :invoice-data="invoiceData" 
                    :students="students" 
                    :signature-preview="signaturePreview" 
                  />
                  <template #fallback>
                    <v-btn disabled block>Loading PDF Generator...</v-btn>
                  </template>
                </ClientOnly>
              </v-form>
            </v-card>
          </v-col>

          <!-- Preview -->
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title class="text-h5 mb-4">
                <v-icon left>mdi-eye</v-icon>
                Preview
              </v-card-title>
              <v-card-text>
                <div id="invoice-preview" class="invoice-preview">
                  <!-- Invoice Content -->
                  <div class="invoice-container">
                    <!-- Header -->
                    <div class="invoice-header">
                      <div class="logo-section">
                        <!-- <div class="logo-placeholder"> -->
                          <!-- <v-icon size="40" color="#ff6b35">mdi-lightbulb</v-icon> -->
                        <!-- </div> -->
                        <img 
                         :src="tm_logo" 
                         alt="TM Logo"
                         class="logo-image"
                       />
                        <!-- <div class="company-name">TECH MOM</div>
                        <div class="tagline">ONLINE TUTOR</div> -->
                      </div>
                      <div class="company-info">
                        <div class="company-title">TECH MOM</div>
                        <div class="company-subtitle">ONLINE TUTORING</div>
                        <div class="location">{{ invoiceData.location || 'LAGOS, NIGERIA' }}</div>
                        <div class="phone">+2347037902005</div>
                        <div class="email">techmom001@gmail.com</div>
                      </div>
                    </div>

                    <!-- Invoice Title -->
                    <div class="mt-10 invoice-title">INVOICE</div>

                    <!-- Invoice Info -->
                    <div class="mt-10 invoice-info">
                      <div class="invoice-for">
                        <!-- <strong>Invoice for: {{ studentNames }}</strong> -->
                        <strong>Invoice for: {{ invoiceData.item }}</strong>
                      </div>
                      <div class="invoice-details">
                        <div><strong>Invoice#</strong> {{ invoiceData.invoiceNumber || '001' }}</div>
                        <div><strong>Date</strong> {{ formatDate(invoiceData.date) }}</div>
                      </div>
                    </div>

                    <div class="mt-10 location-line">{{ invoiceData.location || 'UK' }}</div>

                    <!-- Table -->
                    <table class="mt-10 invoice-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Subject</th>
                          <th>Contact</th>
                          <th>Unit</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <!-- <td>{{ invoiceData.item || 'TITO AND MOYO' }}</td> -->
                          <td>{{ studentNames }}</td>
                          <td>{{ invoiceData.subjects }}</td>
                          <td>{{ invoiceData.numberOfContact }}</td>
                          <td>{{ invoiceData.units }}</td>
                          <td>{{ formatCurrency(invoiceData.total) }}</td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Totals -->
                    <div class="mt-10 totals-section">
                      <div class="total-line">
                        <span>Subtotal</span>
                        <span>{{ formatCurrency(invoiceData.total) }}</span>
                      </div>
                      <div class="total-line">
                        <span>Tax ({{ invoiceData.tax || 0 }}%)</span>
                        <span>{{ formatCurrency(taxAmount) }}</span>
                      </div>
                      <div class="total-line final-total">
                        <span><strong>Total</strong></span>
                        <span><strong>{{ formatCurrency(finalTotal) }}</strong></span>
                      </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="mt-10 payment-section">
                      <div class="payment-title">PAYMENT METHOD</div>
                      <div class="payment-details">
                        <div>Account Name: {{ invoiceData.accountName || 'OJO OLUWAKEMI' }}</div>
                        <div>Account No. {{ invoiceData.accountNo || '6506787803' }}</div>
                        <div>Pay TO: {{ invoiceData.bankName || 'PROVIDUS BANK' }}</div>
                      </div>
                      <div class="mb-10 signature-section">
                        <div class="signature-container">
                          <img 
                            v-if="signaturePreview" 
                            :src="signaturePreview" 
                            alt="Authorized Signature"
                            class="signature-image"
                          />
                          <div v-else class="signature-placeholder"></div>
                        </div>
                        <div class="signature-label">Authorized Signed</div>
                      </div>
                    </div>

                    <div class="mt-10 mb-7 footer">THANKS FOR CHOOSING US.</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import tm_logo from '~/assets/tm_logo.jpeg'  // Import your logo image
import PdfGenerator from '~/components/PdfGenerator.client.vue'

// Reactive data
const students = ref([''])
const signatureFile = ref(null)
const signaturePreview = ref(null)
const invoiceData = ref({
  invoiceNumber: '001',
  date: new Date().toISOString().split('T')[0],
  location: 'LAGOS, NIGERIA',
  item: '',
  subjects: 'Maths, English and Science',
  numberOfContact: 'THREE TIMES(3) WEEKLY',
  units: 0,
  total: 0,
  tax: 0,
  accountName: 'OJO OLUWAKEMI',
  accountNo: '6506787803',
  bankName: 'PROVIDUS BANK'
})

// Computed properties
// const studentNames = computed(() => {
//   return students.value.filter(name => name.trim()).join(' and ')
// })
const studentNames = computed(() => {
  return students.value.filter(name => name.trim())
    .join(',\n');
});

const taxAmount = computed(() => {
  return (invoiceData.value.total * (invoiceData.value.tax / 100)) || 0
})

const finalTotal = computed(() => {
  return (invoiceData.value.total || 0) + taxAmount.value
})

// Methods
const addStudent = () => {
  students.value.push('')
}

const removeStudent = (index) => {
  students.value.splice(index, 1)
}

const formatDate = (date) => {
  if (!date) return new Date().toLocaleDateString('en-GB')
  return new Date(date).toLocaleDateString('en-GB')
}

const formatCurrency = (amount) => {
  if (!amount) return '0'
  return '₦' + new Intl.NumberFormat('en-NG').format(amount)
}

const handleSignatureUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      signaturePreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const removeSignature = () => {
  signatureFile.value = null
  signaturePreview.value = null
}

const generatePDF = async () => {
  // This method is now handled by the PdfGenerator component
  console.log('PDF generation handled by client component')
}
</script>

<style scoped>
.invoice-preview {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.invoice-container {
  background: linear-gradient(135deg, #fff9c4 0%, #f8bbd9 50%, #e8a5d8 100%);
  padding: 20px;
  font-family: Arial, sans-serif;
  /* min-height: 800px; */
  color: #000;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-image {
  max-width: 140px;
  max-height: 155px;
  object-fit: contain;
}

.logo-placeholder {
  width: 60px;
  height: 60px;
  background: #ff6b35;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.company-name {
  font-weight: bold;
  font-size: 14px;
  color: #000;
}

.tagline {
  font-size: 10px;
  color: #333;
}

.company-info {
  text-align: right;
  font-size: 12px;
}

.company-title {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}

.company-subtitle {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.invoice-title {
  /* background: rgba(255, 255, 255, 0.8); */
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  border-radius: 8px;
  color: #000;
}

.invoice-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;
}

.invoice-details div {
  margin-bottom: 5px;
}

.location-line {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 5px 0;
  border-bottom: 2px solid #000;
  color: #000;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.9);
}

.invoice-table th,
.invoice-table td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: #000;
}

.invoice-table th {
  background: rgba(255, 255, 255, 0.5);
  font-weight: bold;
}

.totals-section {
  margin-bottom: 30px;
  text-align: right;
  color: #000;
}

.total-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
}

.final-total {
  border-top: 2px solid #000;
  padding-top: 5px;
  font-size: 16px;
}

.payment-section {
  margin-bottom: 20px;
  color: #000;
}

.payment-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}

.payment-details {
  font-size: 12px;
  margin-bottom: 20px;
}

.payment-details div {
  margin-bottom: 3px;
}

.signature-section {
  float: right;
  text-align: center;
  width: 150px;
}

.signature-container {
  border-bottom: 2px solid #000;
  margin-bottom: 5px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.signature-image {
  max-width: 140px;
  max-height: 55px;
  object-fit: contain;
}

.signature-placeholder {
  width: 100%;
  height: 100%;
  background: transparent;
}

.signature-label {
  font-size: 12px;
  color: #000;
}

.signature-preview {
  border: 1px dashed #ccc;
  border-radius: 4px;
}

.footer {
  clear: both;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #000;
  color: #000;
}
</style>