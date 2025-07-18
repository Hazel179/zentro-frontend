<template>
  <div class="booking-page">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/">Zentro</router-link>
        </div>
        <div class="nav-menu">
          <router-link to="/services">Services</router-link>
          <router-link to="/consultants">Consultants</router-link>
          <router-link to="/bookings">Bookings</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="booking-header">
        <h1>Book Your Session</h1>
        <div class="breadcrumb">
          <router-link to="/">Home</router-link> > 
          <router-link to="/services">Services</router-link> > 
          <span>Book {{ service.name }}</span>
        </div>
      </div>
      <div class="booking-content">
        <div class="service-summary">
          <h2>{{ service.name }}</h2>
          <div class="service-details">
            <div class="detail-row">
              <span>Duration:</span>
              <span>{{ service.duration }}</span>
            </div>
            <div class="detail-row">
              <span>Price:</span>
              <span class="price">${{ service.price }}</span>
            </div>
            <div class="detail-row">
              <span>Category:</span>
              <span>{{ service.category }}</span>
            </div>
          </div>
        </div>
        <form @submit.prevent="submitBooking" class="booking-form">
          <div class="form-section">
            <h3>Personal Information</h3>
            <div class="form-group">
              <label>Full Name *</label>
              <input v-model="form.name" type="text" required placeholder="Enter your full name">
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input v-model="form.email" type="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
              <label>Phone *</label>
              <input v-model="form.phone" type="tel" required placeholder="Enter your phone number">
            </div>
          </div>
          <div class="form-section">
            <h3>Session Details</h3>
            <div class="form-group">
              <label>Preferred Date *</label>
              <input v-model="form.date" type="date" required :min="todayDate">
            </div>
            <div class="form-group">
              <label>Preferred Time *</label>
              <select v-model="form.time" required>
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
            <div class="form-group">
              <label>Experience Level</label>
              <select v-model="form.experience">
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div class="form-group">
              <label>Notes</label>
              <textarea v-model="form.notes" rows="3" placeholder="Any special requirements or questions?"></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="goBack" class="btn-secondary">Back</button>
            <button type="submit" :disabled="isSubmitting" class="btn-primary">
              {{ isSubmitting ? 'Processing...' : `Book Now - $${service.price}` }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingPage',
  data() {
    return {
      isSubmitting: false,
      service: {
        id: '',
        name: '',
        duration: '',
        price: 0,
        category: ''
      },
      form: {
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        experience: '',
        notes: ''
      },
      todayDate: new Date().toISOString().split('T')[0]
    }
  },
  mounted() {
    this.loadService();
  },
  methods: {
    loadService() {
      const serviceId = this.$route.params.serviceId;
      const services = {
        'yoga-beginners': {
          id: 'yoga-beginners',
          name: 'Yoga for Beginners',
          duration: '60 min',
          price: 20,
          category: 'Yoga Classes'
        },
        'hiit-fitness-blast': {
          id: 'hiit-fitness-blast',
          name: 'HIIT Fitness Blast',
          duration: '45 min',
          price: 25,
          category: 'Fitness Training'
        },
        'wellness-workshop': {
          id: 'wellness-workshop',
          name: 'Wellness Workshop',
          duration: '90 min',
          price: 15,
          category: 'Wellness'
        }
      };
      this.service = services[serviceId] || services['yoga-beginners'];
    },
    async submitBooking() {
      this.isSubmitting = true;
      try {
        const booking = {
          id: this.generateBookingId(),
          service: this.service,
          customer: this.form,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        console.log('Booking submitted:', booking);
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.$router.push(`/booking-success/${booking.id}`);
      } catch (error) {
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    generateBookingId() {
      return 'BK' + Date.now().toString(36).toUpperCase();
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.booking-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}
.container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.booking-header {
  text-align: center;
  margin-bottom: 30px;
}
.booking-header h1 {
  color: #059669;
  margin-bottom: 10px;
}
.booking-header p {
  color: #6b7280;
  font-size: 18px;
}
.booking-content {
  display: flex;
  gap: 30px;
}
.service-summary {
  flex: 1;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}
.service-summary h2 {
  color: #059669;
  margin-bottom: 15px;
}
.service-details {
  display: flex;
  flex-direction: column;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.detail-row span:first-child {
  font-weight: 600;
  color: #374151;
}
.detail-row span:last-child {
  color: #4b5563;
  font-weight: 500;
}
.price {
  font-size: 1.2em;
  font-weight: 700;
  color: #059669;
}
.booking-form {
  flex: 2;
}
.form-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.form-section h3 {
  color: #059669;
  margin-bottom: 15px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #374151;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
}
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.btn-secondary {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-secondary:hover {
  background: #d6d3d1;
}
.btn-primary {
  background: #059669;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}
.btn-primary:hover:not(:disabled) {
  background: #047857;
}
.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style> 