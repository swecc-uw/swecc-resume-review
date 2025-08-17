<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { logout } from "../services/auth";
    import { base } from "$app/paths";
    import { currentUser, loadCurrentUser } from "../services/userStore";

    let isMenuOpen = $state(false);

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    const handleLogout = async () => {
        await logout();
        goto("/");
    };

    onMount(async () => {
        await loadCurrentUser();
    });
</script>

<nav class="bg-blue-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <span class="text-xl font-bold">Resume Review</span>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex space-x-5">
                {#if $currentUser}
                    <button
                        onclick={() => goto(`${base}/app`)}
                        class="hover:underline">My Resumes</button
                    >
                    <button
                        onclick={() => goto(`${base}/app/upload`)}
                        class="hover:underline">Upload</button
                    >
                    <button
                        onclick={() => goto(`${base}/app/profile`)}
                        class="hover:underline">Profile</button
                    >
                {/if}
                {#if $currentUser}
                    <button onclick={handleLogout} class="hover:underline"
                        >Logout</button
                    >
                {:else}
                    <button
                        onclick={() => goto(`${base}/login`)}
                        class="hover:underline">Login</button
                    >
                    <button
                        onclick={() => goto(`${base}/register`)}
                        class="hover:underline">Register</button
                    >
                {/if}
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden">
                <button
                    class="text-gray-300 hover:text-white focus:outline-none"
                    onclick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d={isMenuOpen
                                ? "M6 18L18 6M6 6l12 12"
                                : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    {#if isMenuOpen}
        <div class="md:hidden bg-blue-700">
            <a
                href={`${base}/app`}
                class="block px-4 py-2 hover:bg-blue-600 hover:underline"
                >My Resumes</a
            >
            <a
                href={`${base}/app/upload`}
                class="block px-4 py-2 hover:bg-blue-600 hover:underline"
                >Review</a
            >
            <a
                href={`${base}/login`}
                class="block px-4 py-2 hover:bg-blue-600 hover:underline"
                >Login</a
            >
            <a
                href={`${base}/register`}
                class="block px-4 py-2 hover:bg-blue-600 hover:underline"
                >Register</a
            >
        </div>
    {/if}
</nav>
