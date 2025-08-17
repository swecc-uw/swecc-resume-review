<script lang="ts">
    import { onMount } from "svelte";
    import { getWebSocketToken, getWebSocket } from "../../services/websocket";
    import { messageStore } from "$lib/socketStore";
    import type { Message } from "../../types";
    import { currentUser } from "../../services/userStore";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { devPrint } from "../../utils";

    let { children } = $props();
    let ws: WebSocket;

    onMount(async () => {
        if (!$currentUser) {
            goto(`${base}/login`);
            return;
        }

        const token = await getWebSocketToken();
        ws = getWebSocket(token);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            devPrint("WebSocket message received:", data);
            messageStore.update((messages) => {
                return [...messages, data as Message];
            });
        };
    });
</script>

{@render children()}
