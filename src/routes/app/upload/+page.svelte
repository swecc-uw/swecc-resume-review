<script lang="ts">
  import FileUpload from '../../../components/FileUpload.svelte';
  import { devPublishToReview, getPresignedUrl, uploadFile } from '../../../services/fileUpload';

  let fileInput: HTMLInputElement;

  const handleSubmit = async () => {
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }
    if (fileInput.files.length > 1) {
      alert('Please select only one file to upload.');
      return;
    }

    const file = fileInput.files[0];
    const {presignedUrl, key} = await getPresignedUrl(file!.name, file!.size);
    await uploadFile(file, presignedUrl);
    if (import.meta.env.DEV) {
      await devPublishToReview(key);
    }
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