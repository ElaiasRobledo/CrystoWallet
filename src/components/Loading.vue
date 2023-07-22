<template>
  <div class="spinner-border load" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="mt-3">Cargando</h2>
</template>

<script>
export default ({
  name: 'CargandoPantalla',
});
</script>

<style scoped>
.load{
  width: 10rem;
  height: 10rem;
}
.first{
  width: 0.75rem;
  height: 0.75rem;
}
.second{
  width: 1.25rem;
  height: 1.25rem;
}
.third{
  width: 1.75rem;
  height: 1.75rem;
}
.fourth{
  width: 2.25rem;
  height: 2.25rem;
}
</style>
