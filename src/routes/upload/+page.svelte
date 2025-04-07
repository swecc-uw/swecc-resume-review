<script lang="ts">
  import FileUpload from '../../components/FileUpload.svelte';
  import { uploadFile } from '../../services/fileUpload';

  let fileInput: HTMLInputElement;
  let presignedUrl: string

  const handleSubmit = () => {
    const file = fileInput.files?.[0];
    console.log(presignedUrl)
    uploadFile(file!, presignedUrl);
  };

</script>


<div class="flex flex-col items-center justify-center min-h-screen space-y-4">
  <input 
    type="url" 
    placeholder="Enter a URL" 
    class="border border-gray-300 rounded-md p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
    bind:value={presignedUrl}
  />
  <FileUpload bind:file={fileInput}/>
  <button
    type="submit"
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    on:click={handleSubmit}
  >
    Upload
  </button>
</div>