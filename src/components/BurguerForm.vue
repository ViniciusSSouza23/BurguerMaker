<template>
  <div>
    <MessageDialog :msg="msg" v-show="msg"/>
    <div>
      <form  id="burguer-form" @submit="createBurguer">
        <div class="input-container">
          <label for="name">Nome do Cliente</label>
          <input type="text" id="name" name="name" v-model="name" placeholder="Digite o seu nome">
        </div>
        <div class="input-container">
          <label for="bread">Escolha o pão:</label>
          <select name="bread" id="bread" v-model="bread">
            <option value="">Selecione o seu pão</option>
            <option v-for="bread in breads" :key="bread.id" :value="bread.tipo">{{bread.tipo}}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne">Escolha a carne do seu burguer:</label>
          <select name="meat" id="carne" v-model="meat">
            <option value="">Selecione o tipo da sua carne</option>
            <option v-for="meat in meats" :key="meat.id" :value="meat.tipo">{{meat.tipo}}</option>
          </select>
        </div>
        <div class="input-container" id="option-container">
          <label id="options-title" for="options">Selecione os opcionais:</label>
          <div class="checkbox-container" v-for="options in optiondata" :key="options.id">
            <input type="checkbox" name="options" v-model="optionss" :value="options.tipo">
            <span>{{options.tipo}}</span>
          </div>
          
        </div>
        <div class="input-container">
          <input  type="submit" class="submit-btn" value="Criar meu Burguer">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MessageDialog from "./MessageDialog.vue";
export default {
  name: "BurguerForm",
  data(){
    return{
      breads: null,
      meats: null,
      optiondata:null,
      name: "",
      bread:"",
      meat:"",
      options: [],
      status:"Solicitado",
      msg:null,
      optionss:[]
    }
  },
  methods:{
    async getIngredients(){
      const req = await fetch("http://localhost:3000/ingredientes");
      const data = await req.json();
      console.log(data);

      this.breads= data.paes;
      this.meats= data.carnes;
      this.optiondata = data.opcionais;
    },
    async createBurguer(e){
      e.preventDefault();
       const data ={
         nome: this.name,
         carne: this.meat,
         pao: this.bread,
         opcionais: Array.from(this.optionss),
         status: this.status
       }
       const dataJson = JSON.stringify(data);

       const req = await fetch("http://localhost:3000/burgers",{
         method: "POST",
         headers:{"Content-Type": "application/json"},
         body: dataJson
       });
       const res = await req.json();
       //envia mensagem
       this.msg=`Pedido Nº ${res.id} realizado com sucesso!`;
       //limpar mensagem
       setTimeout(()=>this.msg="",3000);
      //limpar dados
       this.name="";
       this.meat="";
       this.bread="";
       this.optionss=[];

    }
  },
  mounted(){
    this.getIngredients();
  },
  components:{
    MessageDialog
  }
}
</script>

<style scoped>
  #burguer-form{
    max-width: 400px;
    margin: 0 auto;
  }
  .input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

  }
  label{
    font-weight: bold;
    margin-bottom: 20px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #FCBA03;
  }
  input, select{
    padding: 5px 10px;
    width: 300px;
  }
  #option-container{
    flex-direction: row;
    flex-wrap: wrap;
  }
  #options-title{
    width: 100%;
  }
  .checkbox-container{
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }
  .checkbox-container span,
  .checkbox-container input{
    width: auto;

  }
  .checkbox-container span{
    margin-left: 6px;
    font-weight: bold;
  }
  .submit-btn{
    background-color: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  .submit-btn:hover{
    background-color: transparent;
    color: #222;
  }
</style>