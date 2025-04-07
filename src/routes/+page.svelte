<script>
  import { goto } from '$app/navigation';

  function handleLogin() {
    alert('Login button clicked!');
  }
</script>

<div class="flex flex-col justify-center items-center h-screen">
  <h1 class="text-4xl font-bold mb-6 text-center">
    SWECC Resume Review
  </h1>
  <button 
    class="bg-blue-500 text-white rounded-lg px-6 py-3 text-lg font-medium hover:bg-blue-700 transition duration-300 mt-4 cursor-pointer"
    on:click={() => {
      goto("/upload");
    }}
  >
    Login
  </button>
</div>
