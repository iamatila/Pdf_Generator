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
              
              <v-card-text style="max-height: 900px; overflow-y: auto;">
                <v-form @submit.prevent="generatePDF">
                  <!-- Student Names -->
                  <v-card variant="outlined" class="mb-4">
                    <v-card-title class="text-h6">Invoice For</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="invoiceData.item"
                        label="John Doe or Jane Doe"
                        variant="outlined"
                        density="compact"
                        class="mb-2"
                      />
                    </v-card-text>
                  </v-card>
                  
                  <!-- Business Details -->
                  <v-card variant="outlined" class="mb-4">
                    <v-card-title class="text-h6">Business Details</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="invoiceData.businessTitle"
                            label="Business Name"
                            variant="outlined"
                            density="compact"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="invoiceData.businessSubtitle"
                            label="Business Subtitle"
                            variant="outlined"
                            density="compact"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="invoiceData.businessLocation"
                            label="Business Location"
                            variant="outlined"
                            density="compact"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="invoiceData.businessPhone"
                            label="Business Phone Number"
                            variant="outlined"
                            density="compact"
                          />
                        </v-col>
                      </v-row>
                      <v-text-field
                        v-model="invoiceData.businessEmail"
                        label="Business Email"
                        variant="outlined"
                        density="compact"
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
                        placeholder="e.g., LAGOS, NIGERIA"
                        variant="outlined"
                        density="compact"
                      />
                    </v-card-text>
                  </v-card>

                  <!-- Service Details -->
                  <v-card variant="outlined" class="mb-4">
                    <v-card-title class="text-h6">Service Details</v-card-title>
                    <v-card-text>
                      <!-- Items Names -->
                      <v-card variant="outlined" class="mb-4">
                        <v-card-title class="text-h6">Items Information</v-card-title>
                        <v-card-text>
                          <v-card  variant="outlined" v-for="(student, index) in students" :key="index" class="d-flex align-center mb-2">
                            <v-card-text>
                              <v-text-field
                                v-model="students[index].name"
                                :label="`Items ${index + 1} Name`"
                                variant="outlined"
                                density="compact"
                                class="flex-grow-1 mr-2"
                              />
                              <v-text-field
                                v-model="students[index].subjects"
                                label="Value"
                                placeholder="e.g., Maths, English and Science"
                                variant="outlined"
                                density="compact"
                                class="mb-2"
                              />
                              <v-text-field
                                v-model="students[index].contact"
                                label="Number of Contact"
                                placeholder="e.g., THREE TIMES(3) WEEKLY"
                                variant="outlined"
                                density="compact"
                                class="mb-2"
                              />
                              <v-row>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model.number="students[index].units"
                                    label="Units"
                                    type="number"
                                    variant="outlined"
                                    density="compact"
                                  />
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model.number="students[index].total"
                                    label="Total Amount"
                                    type="number"
                                    variant="outlined"
                                    density="compact"
                                  />
                                </v-col>
                              </v-row>
                              <v-btn
                                v-if="students.length > 1"
                                icon="mdi-delete"
                                color="error"
                                size="small"
                                @click="removeStudent(index)"
                              />
                            </v-card-text>
                          </v-card>
                          <v-btn
                            @click="addStudent"
                            color="primary"
                            variant="outlined"
                            prepend-icon="mdi-plus"
                            size="small"
                          >
                            Add Item
                          </v-btn>
                        </v-card-text>
                      </v-card>
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
                      
                      <!-- Logo Upload -->
                      <v-file-input
                        v-model="logoFile"
                        label="Upload Logo Image"
                        accept="image/*"
                        variant="outlined"
                        density="compact"
                        prepend-icon="mdi-camera"
                        @change="handleLogoUpload"
                      />
                      
                      <!-- Logo Preview -->
                      <div v-if="logoPreview" class="mt-2">
                        <v-img
                          :src="logoPreview"
                          max-width="200"
                          max-height="100"
                          class="logo-preview"
                        />
                        <v-btn
                          @click="removeLogo"
                          color="error"
                          size="small"
                          variant="text"
                          class="mt-1"
                        >
                          Remove Logo
                        </v-btn>
                      </div>
                      
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
                      :logo-preview="logoPreview" 
                      :signature-preview="signaturePreview" 
                    />
                    <template #fallback>
                      <v-btn disabled block>Loading PDF Generator...</v-btn>
                    </template>
                  </ClientOnly>
                </v-form>
              </v-card-text>
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
                        <!-- <img 
                         :src="tm_logo_3" 
                         alt="TM Logo"
                         class="logo-image"
                       /> -->
                       <img 
                          v-if="logoPreview" 
                          :src="logoPreview" 
                          alt="Logo"
                          class="logo-image"
                        />
                        <div v-else class="signature-placeholder"></div>
                        <!-- <div class="company-name">TECH MOM</div>
                        <div class="tagline">ONLINE TUTOR</div> -->
                      </div>
                      <div class="company-info">
                        <div class="company-title">{{ invoiceData.businessTitle || 'Business Name' }}</div>
                        <div class="company-subtitle">{{ invoiceData.businessSubtitle || 'Business Subtitle' }}</div>
                        <div class="location">{{ invoiceData.businessLocation || 'LAGOS, NIGERIA' }}</div>
                        <div class="phone">{{ invoiceData.businessPhone || '+234800284858' }}</div>
                        <div class="email">{{ invoiceData.businessEmail || 'receipt-gen@gmail.com' }}</div>
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

                    <div class="mt-10 location-line">{{ invoiceData.location }}</div>

                    <!-- Table -->
                    <table class="mt-10 invoice-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Value</th>
                          <th>Contact</th>
                          <th>Unit</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(_student, i) in students" :key="i">
                          <!-- <td>{{ invoiceData.item || 'TITO AND MOYO' }}</td> -->
                          <td>{{ _student.name }}</td>
                          <td>{{ _student.subjects }}</td>
                          <td>{{ _student.contact }}</td>
                          <td>{{ _student.units }}</td>
                          <td>{{ formatCurrency(_student.total) }}</td>
                        </tr>
                        <!-- <tr>
                          <td>{{ studentNames }}</td>
                          <td>{{ invoiceData.subjects }}</td>
                          <td>{{ invoiceData.numberOfContact }}</td>
                          <td>{{ invoiceData.units }}</td>
                          <td>{{ formatCurrency(invoiceData.total) }}</td>
                        </tr> -->
                      </tbody>
                    </table>

                    <!-- Totals -->
                    <div class="mt-10 totals-section">
                      <div class="total-line">
                        <span>Subtotal</span>
                        <span>{{ formatCurrency(grandTotal) }}</span>
                        <!-- <span>{{ formatCurrency(invoiceData.total) }}</span> -->
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
                        <div>Account Name: {{ invoiceData.accountName }}</div>
                        <div>Account No. {{ invoiceData.accountNo }}</div>
                        <div>Bank Name: {{ invoiceData.bankName }}</div>
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
// import tm_logo_3 from '~/assets/tm_logo_3.png'  // Import your logo image
import PdfGenerator from '~/components/PdfGenerator.client.vue'

// Reactive data
// const students = ref([''])
const students = ref([{
  name: '',
  subjects: '',
  contact: '',
  units: 0,
  total: 0
}])
const signatureFile = ref(null)
const signaturePreview = ref(null)
const logoFile = ref(null)
const logoPreview = ref(null)
const invoiceData = ref({
  businessTitle: '',
  businessSubtitle: '',
  businessLocation: '',
  businessPhone: '',
  businessEmail: '',
  date: new Date().toISOString().split('T')[0],
  location: '',
  item: '',
  // subjects: '',
  // numberOfContact: '',
  // units: 0,
  // total: 0,
  tax: 0,
  accountName: '',
  accountNo: '',
  bankName: ''
})

// The maximum number of students allowed
const MAX_STUDENTS = 8;

const grandTotal = computed(() => {
  // Use the .reduce() method to iterate over the array
  // and accumulate the 'total' value from each object.
  return students.value.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.total;
  }, 0); // Start the accumulation at 0
});

// Computed properties
// const studentNames = computed(() => {
//   return students.value.filter(name => name.trim()).join(' and ')
// })
// const studentNames = computed(() => {
//   return students.value.filter(name => name.name.trim())
//     .join(',\n');
// });

const taxAmount = computed(() => {
  // return (invoiceData.value.total * (invoiceData.value.tax / 100)) || 0
  return (grandTotal.value * (invoiceData.value.tax / 100)) || 0
})

const finalTotal = computed(() => {
  // return (invoiceData.value.total || 0) + taxAmount.value
  return (grandTotal.value || 0) + taxAmount.value
})

// Methods
const addStudent = () => {
  // 1. Check if the current array length is already at the maximum limit
  if (students.value.length >= MAX_STUDENTS) {
    // 2. If at the limit, show the toast notification
    useNuxtApp().$toast.info(`Limit reached! You can only add a maximum of ${MAX_STUDENTS} items.`);
    return; // Exit the function without adding the student
  }
  // students.value.push('')
  students.value.push({
    name: '',
    subjects: '',
    contact: '',
    units: 0,
    total: 0
  })
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

const handleLogoUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
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

const removeLogo = () => {
  logoFile.value = null
  logoPreview.value = null
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
  height: 1150px;
}

.invoice-container {
  /* background: linear-gradient(135deg, #fff9c4 0%, #f8bbd9 50%, #e8a5d8 100%); */
  background: #ffffff;
  padding: 20px;
  font-family: Arial, sans-serif;
  /* min-height: 800px; */
  color: #000;
  height: 1150px;
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
  /* background: none; */
  /* background: linear-gradient(135deg, #fff9c4 0%, #f8bbd9 50%, #e8a5d8 100%); */
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