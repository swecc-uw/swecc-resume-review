<script>
    import { goto } from "$app/navigation";
    import { login } from "../../services/auth";
    import { base } from "$app/paths";

    let username = "";
    let password = "";

    const handleLogin = async () => {
        if (await login({ username, password })) {
            goto(`${base}/app`);
        }
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form on:submit|preventDefault={handleLogin} class="space-y-4">
            <div>
                <label
                    for="username"
                    class="block text-sm font-medium text-gray-700"
                    >Username</label
                >
                <input
                    id="username"
                    type="text"
                    bind:value={username}
                    class="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                >
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    class="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button
                type="submit"
                class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Login
            </button>
        </form>
        <p class="text-sm text-center text-gray-600">
            Don't have an account? <a
                href={`${base}/register`}
                class="text-blue-500 hover:underline">Sign up</a
            >
        </p>
    </div>
</div>
