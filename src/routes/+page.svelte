<h1>A Visual History of International Mathematical Olympiads</h1>
<p>The International Mathematical Olympiad (IMO) is the World Championship Mathematics Competition for High School students and is held annually in a different country. The first IMO was held in 1959 in Romania, with 7 countries participating. It has gradually expanded to over 100 countries from 5 continents.</p>

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

<p>Though the number of contestants has steadily increased over time, the number of <span style='color:#8DA7BE'>male</span> and <span style='color:#BD4089'>female</span> contestants remains highly imbalanced. </p>

<div id="chart-container">
  <svg viewBox="0 0 600 60">
  {#each data as d}
    <circle cx={d * 8} cy="20" r="20" fill="blue" />
  {/each}
  </svg>
</div>

<p>Some more text</p>

<div id="chart-container">
  <svg viewBox="0 0 600 60">
  {#each data as d}
    <circle cx={d * 8} cy="20" r="20" fill="blue" />
  {/each}
  </svg>
</div>

<p>This visualises data from <a href="https://www.imo-official.org/organizers.aspx" target="_blank">www.imo-official.org</a> obtained through the <a href="https://github.com/rfordatascience/tidytuesday/blob/main/data/2024/2024-09-24/readme.md" target="_blank">TidyTuesday GitHub repository</a>. You can see the original version on <a href="https://github.com/nrennie/tidytuesday/tree/main/2024/2024-09-24" target="_blank">GitHub</a>.</p>
