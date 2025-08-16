<script lang="ts">
    import { onMount } from "svelte";
    import {
        getWebSocketToken,
        getWebSocket,
    } from "../../services/websocket.js";
    import { getResumes } from "../../services/resume.js";
    import ResumeFeedback from "../../components/ResumeFeedback.svelte";
    import type { Resume } from "../../types";

    let ws: WebSocket;
    let resumes: Resume[] = $state([]);
    let selectedResume: Resume | null = $state(null);
    let loading = $state(true);
    let error = $state("");

    onMount(async () => {
        try {
            const token = await getWebSocketToken();
            ws = getWebSocket(token);

            // Load user's resumes
            resumes = await getResumes();
            loading = false;
        } catch (err) {
            error = "Failed to load resumes";
            loading = false;
            console.error("Error loading resumes:", err);
        }
    });

    const selectResume = (resume: Resume) => {
        selectedResume = resume;
    };
</script>

<div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div
        class="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col h-full"
    >
        <div class="p-6 border-b border-gray-200 flex-shrink-0">
            <h1 class="text-2xl font-bold text-gray-800">My Resumes</h1>
            <p class="text-sm text-gray-600 mt-1">
                Click on a resume to view feedback
            </p>
        </div>

        <div class="flex-1 overflow-y-auto p-4 min-h-0">
            {#if loading}
                <div class="flex items-center justify-center py-8">
                    <div
                        class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
                    ></div>
                    <span class="ml-2 text-gray-600">Loading resumes...</span>
                </div>
            {:else if error}
                <div class="text-red-600 text-center py-8">
                    <p>{error}</p>
                </div>
            {:else if resumes.length === 0}
                <div class="text-center py-8">
                    <div class="text-gray-400 mb-4">
                        <svg
                            class="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                        </svg>
                    </div>
                    <p class="text-gray-600 text-sm">No resumes uploaded yet</p>
                    <a
                        href="/app/upload"
                        class="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                    >
                        Upload your first resume →
                    </a>
                </div>
            {:else}
                <div class="space-y-2">
                    {#each resumes as resume}
                        <button
                            class="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                            class:bg-blue-100={selectedResume?.id === resume.id}
                            class:border-blue-300={selectedResume?.id ===
                                resume.id}
                            onclick={() => selectResume(resume)}
                        >
                            <div class="font-medium text-gray-800 truncate">
                                {resume.fileName}-{resume.id}
                            </div>
                            <div class="text-xs text-gray-500 mt-1">
                                Uploaded {resume.createdAt.toLocaleDateString()}
                            </div>
                            <div class="text-xs text-gray-400 mt-1">
                                {(resume.fileSize / 1024).toFixed(1)} KB
                            </div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
        {#if selectedResume}
            <div class="p-8">
                <div class="max-w-4xl mx-auto">
                    <ResumeFeedback
                        feedback={selectedResume.feedback}
                        fileName={selectedResume.fileName}
                    />
                </div>
            </div>
        {:else}
            <div class="flex items-center justify-center h-full">
                <div class="text-center">
                    <div class="text-gray-400 mb-4">
                        <svg
                            class="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                        </svg>
                    </div>
                    <h2 class="text-xl font-medium text-gray-600 mb-2">
                        Select a Resume
                    </h2>
                    <p class="text-gray-500">
                        Choose a resume from the sidebar to view its feedback
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>
