<script>
  import { Container } from '@sveltestrap/sveltestrap';
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';
  import { scaleBand, scaleLinear } from 'd3-scale';

  let data = [];
  let processedData = [];
  let width = 500;
  let height = 350;
  let margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
  onMount(async () => {
    data = await csv('data/country_results_df.csv');
  
    const aggregatedData = data.reduce((acc, d) => {
      let year = d.year;
      let teamSize = +d.team_size_all;
      let teamSizeMale = +d.team_size_male;
      let teamSizeFemale = +d.team_size_female;
      
      if (!teamSize || isNaN(teamSize)) teamSize = 0; 
      if (!teamSizeMale || isNaN(teamSizeMale)) teamSizeMale = 0; 
      if (!teamSizeFemale || isNaN(teamSizeFemale)) teamSizeFemale = 0; 

      if (!acc[year]) {
        acc[year] = { total: 0, team_size_male: 0, team_size_female: 0 };
      }
      acc[year].total += teamSize;
      acc[year].team_size_male += teamSizeMale;
      acc[year].team_size_female += teamSizeFemale;

      return acc;
    }, {});
    
    processedData = Object.entries(aggregatedData).map(([year, { total, team_size_male, team_size_female }]) => ({
      year,
      total,
      team_size_male,
      team_size_female
    }));
    
  });

  $: xScale = scaleBand()
  .domain(processedData.map(d => d.year))
  .range([margin.left, width - margin.right])
  .padding(0.2);
  
  $: yScale = scaleLinear()
  .domain([0, Math.max(0, ...processedData.map(d => d.total))])
  .nice()
  .range([height - margin.bottom, margin.top]);
  
</script>
  
<Container md>
  <h1>A Visual History of International Mathematical Olympiads</h1>
  <p>The International Mathematical Olympiad (IMO) is the World Championship Mathematics Competition for High School students and is held annually in a different country. The first IMO was held in 1959 in Romania, with 7 countries participating. It has gradually expanded to over 100 countries from 5 continents.</p>
  
  <div class="chart" bind:clientWidth={width}>
    <svg {width} {height}>
    
    <g class="title">
      <text x="50" y="30" text-anchor="start">
      Number of team members per year
      </text>
    </g>
  
      <g class="bars">
      {#each processedData as { year, total }}
      <rect
        x={xScale(year)}
        y={yScale(total)}
        width={xScale.bandwidth()}
        height={height - margin.bottom - yScale(total)}
      />
      {/each}
      </g>
      
      <g class="x-axis">
      {#each processedData as { year, total }}
      <text x={xScale(year) + 0.75 * xScale.bandwidth()} y={320} text-anchor="middle" alignment-baseline="bottom"  transform="rotate(-90 {xScale(year) + 0.75 * xScale.bandwidth()}, 320)" >{year}</text>
  {/each}
      </g>
      
    </svg>
  </div>
  
<p>Though the number of contestants has steadily increased over time, the number of <span style='color:#8DA7BE'>male</span> and <span style='color:#BD4089'>female</span> contestants remains highly imbalanced. Note that gender data has not always been accurately recorded, and so the number of male and female team members may not always add up to the number of total team players.</p>
  
  <div class="chart" bind:clientWidth={width}>
    <svg {width} {height}>
    
      <g class="title">
        <text x="50" y="30" text-anchor="start">
        Number of male team members per year
        </text>
      </g>
    
      <g class="male-bars">
      {#each processedData as { year, team_size_male }}
      <rect
        x={xScale(year)}
        y={yScale(team_size_male)}
        width={xScale.bandwidth()}
        height={height - margin.bottom - yScale(team_size_male)}
      />
      {/each}
      </g>
      
      <g class="x-axis">
      {#each processedData as { year, total }}
      <text x={xScale(year) + 0.75 * xScale.bandwidth()} y={320} text-anchor="middle" alignment-baseline="bottom"  transform="rotate(-90 {xScale(year) + 0.75 * xScale.bandwidth()}, 320)" >{year}</text>
  {/each}
      </g>
      
    </svg>
  </div>
  
  <div class="chart" bind:clientWidth={width}>
    <svg {width} {height}>
    
      <g class="title">
        <text x="50" y="30" text-anchor="start">
        Number of female team members per year
        </text>
      </g>
    
      <g class="female-bars">
      {#each processedData as { year, team_size_female }}
      <rect
        x={xScale(year)}
        y={yScale(team_size_female)}
        width={xScale.bandwidth()}
        height={height - margin.bottom - yScale(team_size_female)}
      />
      {/each}
      </g>
      
      <g class="x-axis">
      {#each processedData as { year, total }}
      <text x={xScale(year) + 0.75 * xScale.bandwidth()} y={320} text-anchor="middle" alignment-baseline="bottom"  transform="rotate(-90 {xScale(year) + 0.75 * xScale.bandwidth()}, 320)" >{year}</text>
  {/each}
      </g>
      
    </svg>
  </div>
            
  <br>
  <p>This visualisation uses data from <a href="https://www.imo-official.org/organizers.aspx" target="_blank">www.imo-official.org</a> obtained through the <a href="https://github.com/rfordatascience/tidytuesday/blob/main/data/2024/2024-09-24/readme.md" target="_blank">TidyTuesday GitHub repository</a>. You can see the original version on <a href="https://github.com/nrennie/tidytuesday/tree/main/2024/2024-09-24" target="_blank">GitHub</a>.</p>
              
</Container>
              
<style>

.bars rect {
  fill: #F0F5F5;
  stroke: none;
}

.male-bars rect {
  fill: #8DA7BE;
  stroke: none;
}

.female-bars rect {
  fill: #BD4089;
  stroke: none;
}

.x-axis text {
  fill: #F0F5F5;
  stroke: none;
  font-size: x-small;
  font-family: 'Commissioner', Arial, sans-serif;
}

.title text {
  font-weight: bold;
  stroke: none;
  fill: #F0F5F5;
  font-size: large;
  font-family: 'Fraunces', 'Times New Roman', Times, serif;
}

</style>
              