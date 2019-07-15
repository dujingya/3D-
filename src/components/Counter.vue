<template>
    <div>
      {{count}}
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Counter",
    data() {
      return {
        localCount: 0
      }
    },
    computed: mapState({
      count: state => state.count,
      countAlias: 'count',
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  }
</script>

<style scoped>

</style>
