<script lang="ts">
  import FileUpload from '../../../components/FileUpload.svelte';
  import { getPresignedUrl, uploadFile } from '../../../services/fileUpload';

  let fileInput: HTMLInputElement;

  const handleSubmit = async () => {
    const file = fileInput.files?.[0];
    const presignedUrl = await getPresignedUrl(file!.name, file!.size);
    console.log(presignedUrl)
    await uploadFile(file!, presignedUrl);
  };

</script>


<div class="flex flex-col items-center justify-center min-h-screen space-y-4">
  <FileUpload bind:file={fileInput}/>
  <button
    type="submit"
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    on:click={handleSubmit}
  >
    Upload
  </button>
</div>