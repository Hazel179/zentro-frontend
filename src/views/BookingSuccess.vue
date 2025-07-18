<template>
  <div class="success-page">
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
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p>Your session has been successfully booked. We'll send you a confirmation email shortly.</p>
        <div class="booking-info">
          <h2>Booking Details</h2>
          <div class="info-item">
            <span>Booking ID:</span>
            <span>{{ bookingId }}</span>
          </div>
          <div class="info-item">
            <span>Service:</span>
            <span>{{ serviceName }}</span>
          </div>
          <div class="info-item">
            <span>Date:</span>
            <span>{{ bookingDate }}</span>
          </div>
          <div class="info-item">
            <span>Time:</span>
            <span>{{ bookingTime }}</span>
          </div>
        </div>
        <div class="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>Check your email for booking confirmation</li>
            <li>We'll send you a reminder 24 hours before</li>
            <li>Arrive 10 minutes early</li>
            <li>Bring comfortable workout clothes</li>
          </ul>
        </div>
        <div class="actions">
          <button @click="goHome" class="btn-primary">Back to Home</button>
          <button @click="goToDashboard" class="btn-secondary">View My Bookings</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingSuccess',
  data() {
    return {
      bookingId: '',
      serviceName: 'Your Service',
      bookingDate: '',
      bookingTime: ''
    }
  },
  mounted() {
    this.bookingId = this.$route.params.bookingId || 'BK123456';
    this.loadBookingDetails();
  },
  methods: {
    loadBookingDetails() {
      this.serviceName = 'Yoga for Beginners';
      this.bookingDate = new Date().toDateString();
      this.bookingTime = '10:00 AM';
    },
    goHome() {
      this.$router.push('/');
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style scoped>
/* ... (same as provided) ... */
</style> 