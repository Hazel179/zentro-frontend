<template>
  <div class="confirmation-page">
    <div class="container">
      <div class="success-icon">✅</div>
      <h1>Booking Confirmed!</h1>
      <p>Your session has been successfully booked.</p>
      <div class="booking-details">
        <h2>Booking Details</h2>
        <div class="detail-item">
          <span class="label">Booking ID:</span>
          <span class="value">{{ bookingId }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Service:</span>
          <span class="value">{{ serviceName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Date:</span>
          <span class="value">{{ formatDate(date) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Time:</span>
          <span class="value">{{ formatTime(time) }}</span>
        </div>
      </div>
      <div class="next-steps">
        <h3>What's Next?</h3>
        <ul>
          <li>Check your email for booking confirmation</li>
          <li>You'll receive a reminder 24 hours before your session</li>
          <li>Arrive 10 minutes early for your appointment</li>
          <li>Bring comfortable workout clothes</li>
        </ul>
      </div>
      <div class="actions">
        <button @click="goToDashboard" class="btn-primary">
          View My Bookings
        </button>
        <button @click="goHome" class="btn-secondary">
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingConfirmation',
  data() {
    return {
      bookingId: '',
      serviceName: '',
      date: '',
      time: ''
    }
  },
  mounted() {
    this.bookingId = this.$route.params.bookingId || 'BK123456';
    this.serviceName = this.$route.params.serviceName || 'Yoga for Beginners';
    this.date = this.$route.params.date || new Date().toISOString().split('T')[0];
    this.time = this.$route.params.time || '09:00';
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(hours, minutes);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
/* ... (same as provided) ... */
</style> 