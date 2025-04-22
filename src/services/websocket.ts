import api from './api';

const authenticateWebSocket = async () => {
  const response = await api.get('/auth/jwt');

  if (response.status !== 200) {
    throw new Error(
      `Authentication failed: ${response.data.detail ?? 'Unknown error'}`
    );
  }

  const token = response.data.token;
  if (!token) {
    throw new Error('No token received');
  }

  localStorage.setItem('ws_token', token);
};

const getWebSocket = (token: string) => {
  const ws = new WebSocket(`ws://localhost:8000/ws/chat/?token=${token}`);

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event) => {
    console.log('Message from server:', event.data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return ws;
};
