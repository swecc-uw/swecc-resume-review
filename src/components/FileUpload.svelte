<script lang="ts">
  let {file = $bindable()} = $props();

</script>

<div class="flex justify-center">
  <input
    type="file"
    class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    bind:this={file}
    accept=".pdf"
  />
</div>
