<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<script>
  const data = [10, 20, 30, 40, 50];
</script>

<div id="chart-container">
  <svg viewBox="0 0 600 60">
  {#each data as d}
    <circle cx={d * 8} cy="20" r="20" fill="red" />
  {/each}
  </svg>
</div>
