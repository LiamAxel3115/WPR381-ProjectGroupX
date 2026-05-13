  //Admin dashboard form
  // Open modal
  document.getElementById('btn-new-event').addEventListener('click', () => {
    document.getElementById('new-event-overlay').classList.add('open');
  });

  // Close modal
  document.getElementById('new-event-close').addEventListener('click', () => {
    document.getElementById('new-event-overlay').classList.remove('open');
  });

  // Handle form submission
  document.getElementById('newEventForm').addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      title: document.getElementById('ev-title').value,
      date: document.getElementById('ev-date').value,
      capacity: document.getElementById('ev-capacity').value,
      status: document.getElementById('ev-status').value
    };

    try {
      const res = await fetch('/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to create event');
      const newEvent = await res.json();

      alert('Event created successfully!');
      window.location.reload(); // refresh dashboard
    } catch (err) {
      alert(err.message);
    }
  });