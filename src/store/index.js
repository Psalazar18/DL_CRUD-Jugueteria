import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "../main";
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    juguetes: []
  },
  getters: {
    traerJuguetes(state){
      return state.juguetes
    },
    jueguetesConStock: state => {
      return state.juguetes.filter((juguetes)=>{
      return juguetes.Stock > 0
      })
    },
  },
  mutations: {
    mutarJuguetes(state,array){
      state.juguetes = array;
    }
  },
  actions: {
    traerData({commit}){
      db.collection("juguetes").onSnapshot(respuesta => {
        let array = [];
        respuesta.forEach(element =>{
          array.push({
            id: element.id,
            Codigo: element.data().Codigo,
            Nombre: element.data().Nombre,
            Stock: element.data().Stock,
            Precio: element.data().Precio,
          })
        });
        commit('mutarJuguetes',array);
      });
    },
    addingJuguetes(context, data){
      db.collection("juguetes").add({
        Codigo: data.Codigo,
        Nombre: data.Nombre,
        Stock: data.Stock,
        Precio: data.Precio,
      }).then(resp=>{
        console.log(resp);
      })
      console.log(data)
    },
    eliminarJuguete(context,id){
      db.collection('juguetes').doc(id).delete().then(()=>{
      }).catch(error=>{
        console.log(error);
      })
    },
    editandoJuguetes(context,data){
      db.collection("juguetes").doc(data.id).update({
        Nombre: data.Nombre,
        Stock: data.Stock,
        Precio: data.Precio,
      }).then(()=>{
        setTimeout(()=>{
          router.push('/list');
        },1000);
      })
    }

  },
})
