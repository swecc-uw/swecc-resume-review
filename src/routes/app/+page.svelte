<script lang="ts">
  import { onMount } from 'svelte';
  import { getWebSocketToken, getWebSocket } from '../../services/websocket.js';

  let ws: WebSocket;

  onMount(async () => {
    const token = await getWebSocketToken();
    ws = getWebSocket(token);
  })

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ content: 'Hello, WebSocket!' }));
    }
  };
</script>

<div class="flex items-center justify-center h-screen">
  <h1 class="text-4xl font-bold">App</h1>
  <button type="submit"
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
  on:click={sendMessage}>Test</button>
</div>