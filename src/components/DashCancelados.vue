<template>
  <div id="burguer-table">
    <div>
      <div id="burguer-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Status:</div>
      </div>
      <div id="burguer-table-rows">
        <div
          class="burguer-table-row"
          v-for="burguer in burguers"
          :key="burguer.id"
        >
          <div class="order-number">{{ burguer.id }}</div>
          <div>{{ burguer.nome }}</div>
          <div>{{ burguer.pao }}</div>
          <div>{{ burguer.carne }}</div>
          <div>
            <ul>
              <li v-for="(opcional, index) in burguer.opcionais" :key="index">
                {{ opcional }}
              </li>
            </ul>
          </div>
          <div class="status">{{ burguer.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      burguers: null,
    };
  },
  methods: {
    async getOrders() {
      const req = await fetch("http://localhost:3000/cancelados");

      const data = await req.json();

      this.burguers = data;
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style scoped>
#burguer-table {
  max-width: 1200px;
  margin: 0 auto;
}
#burguer-table-heading,
#burguer-table-rows,
.burguer-table-row {
  display: flex;
  flex-wrap: wrap;
}
#burguer-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}
#burguer-table-heading div,
.burguer-table-row div {
  width: 19%;
}
.burguer-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}
#burguer-table-heading .order-id,
.burguer-table-row .order-number {
  width: 5%;
}

</style>