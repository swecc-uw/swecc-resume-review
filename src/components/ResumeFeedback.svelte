<script lang="ts">
    import { marked } from "marked";

    let { feedback, fileName }: { feedback: string; fileName?: string } =
        $props();

    const renderedFeedback = $derived(feedback ? marked(feedback) : "");
</script>

<div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
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
                {fileName
                    ? `Resume Review: ${fileName}`
                    : "Resume Review Complete!"}
            </h3>
            <p class="text-sm text-gray-500">
                {fileName
                    ? "Feedback for this resume"
                    : "Here's your personalized feedback"}
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
            No feedback available for this resume.
        </div>
    {/if}
</div>
