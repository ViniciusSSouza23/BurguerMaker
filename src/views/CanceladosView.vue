<template>
  <div class="main-container">
    <h1>Pedidos Cancelados:</h1>
    <DashCancelados/>
    
  </div>
</template>

<script>
import DashCancelados from "../components/DashCancelados.vue";
export default {
  components:{
    DashCancelados
  }
}
</script>