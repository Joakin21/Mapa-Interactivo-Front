<template>
<div>
<gmaps-map :options="mapOptions" />
</div>
</template>

<script>

import { gmapsMap } from 'x5-gmaps'

export default {
    components: { gmapsMap },
    data: () => ({
      mapOptions: {
        center: { lat: -27.47, lng: 153.025 },
        zoom: 12,
      },
    }),
}
</script>

<style scoped>

h1{
    color: green;
}
</style>