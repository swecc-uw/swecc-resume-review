<script lang="ts">
    import { onMount } from "svelte";
    import {
        getWebSocketToken,
        getWebSocket,
    } from "../../services/websocket.js";

    let ws: WebSocket;

    onMount(async () => {
        const token = await getWebSocketToken();
        ws = getWebSocket(token);
    });
</script>

<div class="flex items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">App</h1>
</div>
