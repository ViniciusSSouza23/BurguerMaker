<template>
  <div id="burguer-table">
    <MessageDialog :msg="msg" v-show="msg" />
    <div>
      <div id="burguer-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
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
          <div>
            <select
              class="status"
              name="status"
              id=""
              @change="updateStatus(burguer.id, $event)"
            >
              <option value="">Status</option>
              <option
                v-for="now in status"
                :key="now.id"
                :value="now.tipo"
                :selected="burguer.status == now.tipo"
              >
                {{ now.tipo }}
              </option>
            </select>
            <button @click="deleteBurguer(burguer.id)" class="delete-btn">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import MessageDialog from "./MessageDialog.vue";
export default {
  name: "Dashboard",
  components: { MessageDialog },
  data() {
    return {
      burguers: null,
      burguer_id: null,
      status: [],
      msg: null,
    };
  },
  methods: {
    async getOrders() {
      const req = await fetch("http://localhost:3000/burgers");

      const data = await req.json();

      this.burguers = data;
    },
    async getStatus() {
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
      this.status = data;
    },
    async createCancelados(id) {
      const burguer = await fetch(`http://localhost:3000/burgers/${id}`);

      const res = await burguer.json();
      res.status = "Cancelado";
      //avoid errors at id number
      res.id = "";
      const dataJson = JSON.stringify(res);
      const canceld = await fetch("http://localhost:3000/cancelados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
    },
    async createFinalized(id)
    {
      const burguer = await fetch(`http://localhost:3000/burgers/${id}`);
      const res = await burguer.json();
      res.status = "Finalizado";
      //avoid erros at id number
      res.id = "";
      console.log(res)
      const dataJson = JSON.stringify(res);
      const finalized = await fetch("http://localhost:3000/concluidos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: dataJson,
      });
    },
    async deleteBurguer(id,isCancel = true) {
      if(isCancel)
      {
        this.createCancelados(id);
      }
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });

      //msg
      if(isCancel)
      {
        this.msg = `Pedido Nº ${id} excluido com sucesso`;
        setTimeout(() => {
          this.msg = "";
        }, 3000);
      }
      else{
        this.msg = `Pedido Nº ${id} finalizado com sucesso`;
         setTimeout(() => {
          this.msg = "";
        }, 3000);
      }

      this.getOrders();
    },
    async updateStatus(id, event) {
      const option = event.target.value;
      //check value of option
      if (option === "Finalizado") {
        this.createFinalized(id);
        this.deleteBurguer(id,false)
      } 
      else {
        const dataJson = JSON.stringify({ status: option });

        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: dataJson,
        });
        const res = await req.json();
        this.msg = `Status do pedido Nº ${id} atualizado com sucesso!`;
        setTimeout(() => {
          this.msg = "";
        }, 3000);
        this.getOrders();
      }
    },
  },
  mounted() {
    this.getOrders();
    this.getStatus();
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
select {
  padding: 12px 6px;
  margin-right: 12px;
}
.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}
.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>