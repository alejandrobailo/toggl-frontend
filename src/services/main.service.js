const apiUrl = 'https://toggl-hire-frontend-homework.onrender.com/api';

export const sendEmails = (emails) =>
  fetch(`${apiUrl}/send`, {
    method: 'POST',
    body: JSON.stringify({ emails }),
    headers: { 'Content-type': 'application/json' }
  });
