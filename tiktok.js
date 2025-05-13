
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PIXEL_ID = 'D0GI5FJC77UA6FH9BF50';
  const ACCESS_TOKEN = '2a9a4db3d27d22db7f735addbed1a4abee3590b4';

  const event = req.body;

  const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({
      pixel_code: PIXEL_ID,
      event: event.event,
      event_id: event.event_id || new Date().getTime().toString(),
      timestamp: event.timestamp || new Date().toISOString(),
      properties: event.properties || {},
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
