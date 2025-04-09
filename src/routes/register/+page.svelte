<script lang="ts">
  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let username = ''; // Added username
  let discordUsername = ''; // Added Discord username

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    class="bg-white p-8 rounded shadow-md w-full max-w-md"
    on:submit={handleSubmit}
  >
    <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

      <div class="mb-4">
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <input
          id="firstName"
          type="text"
          bind:value={firstName}
          class="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div class="mb-4">
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          id="lastName"
          type="text"
          bind:value={lastName}
          class="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          class="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your username"
          required
        />
      </div>
      <div class="mb-4">
        <label for="discordUsername" class="block text-sm font-medium text-gray-700">Discord Username</label>
        <input
          id="discordUsername"
          type="text"
          bind:value={discordUsername}
          class="w-full px-4 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your Discord username"
          required
        />
      </div>

    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        bind:value={email}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        id="password"
        bind:value={password}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

    <div class="mb-4">
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        bind:value={confirmPassword}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Register
    </button>
  </form>
</div>