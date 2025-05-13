<script lang="ts">
    import { onMount } from "svelte";
    import { getWebSocketToken, getWebSocket } from "../../services/websocket";
    import { messageStore } from "$lib/socketStore";
    import type { Message } from "../../types";

    let { children } = $props();
    let ws: WebSocket;

    onMount(async () => {
        const token = await getWebSocketToken();
        ws = getWebSocket(token);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);
            messageStore.update((messages) => {
                return [...messages, data as Message];
            });
        };
    });
</script>

{@render children()}
