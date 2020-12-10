import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "../main";
//import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    juguetes: []
  },
  getters: {
    traerJuguetes(state){
      return state.juguetes
    }
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
            codigo: element.data().Codigo,
            nombre: element.data().Nombre,
            stock: element.data().Stock,
            precio: element.data().Precio,
          })
        });
        commit('mutarJuguetes',array);
      });
    },
    // Editing(context, data){
    //   db.collection("juguetes").doc(data.id).update({
    //     codigo: data.Codigo,
    //     nombre: data.Nombre,
    //     stock: data.Stock,
    //     precio: data.Precio,
    //     id: data.id
    //   }).then(()=>{
    //     console.log('editado')
    //   })
    // },
  },
})
