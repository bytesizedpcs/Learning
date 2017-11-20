<template>
  <div>
    <song-item
      v-for="song in allSongs"
      :key="song.id"
      :song="song">
    </song-item>
  </div>
</template>

<script>
  import SongItem from './SongItem';

  export default {
    name: 'SongList',
    data() {
      return {
        allSongs: [
          {
            id: '1',
            description: 'Song number 1',
            url: 'https://www.musicshare.com/song1.mp3',
          },
          {
            id: '2',
            description: 'Song number 2',
            url: 'https://www.musicshare.com/song2.mp3',
          },
        ],
      };
    },
    components: {
      SongItem,
    },
  };
</script>
