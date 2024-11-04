import React from 'react';

const BookingIframe = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://booking.careconcierge.fr/location/appartement-saint-gervais-les-bains-le-204-mountain-lodge-503118.html"
        title="Booking Page"
        width="20%"
        height="20%"
        frameBorder="0"
        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default BookingIframe;
