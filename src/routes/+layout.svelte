<script>
  let { children } = $props();
  import "../app.css"
  import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
{@render children()}
