<template>
  <div>{{song.description}} ({{song.url}})</div>
</template>

<script>
  export default {
    name: 'SongItem',
    props: ['Song'],
  };
</script>
