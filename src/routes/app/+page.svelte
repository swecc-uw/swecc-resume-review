<script lang="ts">
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    console.log(data);
  })
</script>

<div class="flex items-center justify-center h-screen">
  <h1 class="text-4xl font-bold">App</h1>
</div>