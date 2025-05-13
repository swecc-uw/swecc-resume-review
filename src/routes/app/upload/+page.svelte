<script lang="ts">
    import { messageStore } from "$lib/socketStore";
    import FileUpload from "../../../components/FileUpload.svelte";
    import {
        devPublishToReview,
        getPresignedUrl,
        uploadFile,
    } from "../../../services/fileUpload";
    import { MessageType, ResumeReviewStatus } from "../../../types";

    let fileInput: HTMLInputElement | null = $state(null);
    let resumeReviewStatus = $state(ResumeReviewStatus.PENDING);

    const handleSubmit = async () => {
        if (!fileInput) {
            return;
        }
        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }
        if (fileInput.files.length > 1) {
            alert("Please select only one file to upload.");
            return;
        }

        const file = fileInput.files[0];
        const { presignedUrl, key } = await getPresignedUrl(
            file!.name,
            file!.size
        );
        await uploadFile(file, presignedUrl);
        if (import.meta.env.DEV) {
            await devPublishToReview(key);
        }
        resumeReviewStatus = ResumeReviewStatus.IN_PROGRESS;
    };

    messageStore.subscribe((messages) => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.type === MessageType.RESUME_REVIEWED) {
                resumeReviewStatus = ResumeReviewStatus.COMPLETED;
            }
        }
    });
</script>

<div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <FileUpload bind:file={fileInput} />
    <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onclick={handleSubmit}
    >
        Upload
    </button>
    {#if resumeReviewStatus === ResumeReviewStatus.PENDING}
        <div class="text-gray-500">Waiting for upload...</div>
    {:else if resumeReviewStatus === ResumeReviewStatus.IN_PROGRESS}
        <div class="flex items-center space-x-2">
            <div
                class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
            ></div>
            <span class="text-blue-500">Review in progress...</span>
        </div>
    {:else if resumeReviewStatus === ResumeReviewStatus.COMPLETED}
        <div class="flex items-center space-x-2">
            <svg
                class="h-6 w-6 text-green-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                ></path>
            </svg>
            <span class="text-green-500"
                >Resume review completed successfully!</span
            >
        </div>
    {/if}
</div>
