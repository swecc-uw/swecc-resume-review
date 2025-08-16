<script lang="ts">
    import { messageStore } from "$lib/socketStore";
    import FileUpload from "../../../components/FileUpload.svelte";
    import {
        devPublishToReview,
        getPresignedUrl,
        uploadFile,
    } from "../../../services/fileUpload";
    import { MessageType, ResumeReviewStatus } from "../../../types";
    import { marked } from "marked";

    let fileInput: HTMLInputElement | null = $state(null);
    let feedback = $state("");
    let resumeReviewStatus = $state(ResumeReviewStatus.PENDING);
    let renderedFeedback = $state("");

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
                // Extract feedback from message data and render as markdown
                if (lastMessage.data && lastMessage.data.feedback) {
                    feedback = lastMessage.data.feedback;
                    renderedFeedback = marked(feedback) as string;
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
        <div
            class="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 border border-gray-200"
        >
            <div class="flex items-center mb-4">
                <div class="flex-shrink-0">
                    <div
                        class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    >
                        <svg
                            class="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div class="ml-3">
                    <h3 class="text-lg font-medium text-gray-900">
                        Resume Review Complete!
                    </h3>
                    <p class="text-sm text-gray-500">
                        Here's your personalized feedback
                    </p>
                </div>
            </div>

            {#if renderedFeedback}
                <div class="prose prose-gray max-w-none">
                    {@html renderedFeedback}
                </div>
            {:else if feedback}
                <div class="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {feedback}
                </div>
            {:else}
                <div class="text-gray-500 italic">
                    No feedback available at this time.
                </div>
            {/if}
        </div>
    {/if}
</div>
