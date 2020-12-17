<template>
  <div class="container">     
        <h1 class="display-2 text-center">Juguetes</h1>
        <div class="text-center" v-if="traerJuguetes == ''">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </div> 
        <b-button class="text-white" variant="secondary" @click="Agregar">Agregar Juguete</b-button>     
        <el-table :data= traerJuguetes style="width: 100%" v-show="traerJuguetes != ''">
            <el-table-column label="Codigo" prop="Codigo"></el-table-column>
            <el-table-column label="Nombre" prop="Nombre"></el-table-column>
            <el-table-column label="Stock" prop="Stock"></el-table-column>
            <el-table-column label="Precio" prop="Precio"></el-table-column>
            <el-table-column align="right">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
            </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from "vuex";
export default {
  name: 'List',
  computed: {
    ...mapGetters(['traerJuguetes']),
  },
  methods: {
    out(){
      let _this = this;
      firebase.auth().signOut().then(function() {
        console.log('Sign-out successful.')
        _this.$router.replace({name: 'Login'})
      }).catch(function(error) {
        console.log(error)
      });
    },
    Agregar(){
      this.$router.push('/add')
    },
    handleDelete(id){
            this.$confirm('¿Quieres borrar este juguete?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: 'Elemento borrado'
            });
            this.$store.dispatch('eliminarJuguete',id);
            }).catch(() => {
            this.$message({
                type: 'info',
                message: 'No se pudo borrar...'
            });          
        });
      },
        handleEdit(id){
          this.$router.push({name: 'Editar', params:{id:id}});
        }
    },
  }
</script>
