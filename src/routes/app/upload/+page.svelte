<script lang="ts">
    import { messageStore } from "$lib/socketStore";
    import FileUpload from "../../../components/FileUpload.svelte";
    import ResumeFeedback from "../../../components/ResumeFeedback.svelte";
    import {
        devPublishToReview,
        getPresignedUrl,
        uploadFile,
    } from "../../../services/fileUpload";
    import { MessageType, ResumeReviewStatus } from "../../../types";

    let fileInput: HTMLInputElement | null = $state(null);
    let feedback = $state("");
    let resumeReviewStatus = $state(ResumeReviewStatus.PENDING);
    let uploadedFileName = $state("");
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
        uploadedFileName = file.name;
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
                // Extract feedback from message data
                if (lastMessage.data && lastMessage.data.feedback) {
                    feedback = lastMessage.data.feedback;
                }
            }
        }
    });
</script>

<div class="flex flex-col items-center min-h-screen py-8 px-4 space-y-6">
    <div class="flex flex-col items-center space-y-4">
        <FileUpload bind:file={fileInput} />
        <button
            type="submit"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onclick={handleSubmit}
        >
            Upload
        </button>
    </div>

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
        <div class="max-w-4xl w-full">
            <ResumeFeedback {feedback} fileName={uploadedFileName} />
        </div>
    {/if}
</div>
