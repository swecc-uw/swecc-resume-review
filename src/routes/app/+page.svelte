<script lang="ts">
  import { onMount } from 'svelte';
  import { getWebSocketToken, getWebSocket } from '../../services/websocket.js';

  onMount(async () => {
    const token = await getWebSocketToken();
    const ws = getWebSocket(token);
  })

  
</script>

<div class="flex items-center justify-center h-screen">
  <h1 class="text-4xl font-bold">App</h1>
</div>