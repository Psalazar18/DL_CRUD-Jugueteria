<template>
  <div class="container">
        <h1 class="display-2 text-center">Juguetes con stock</h1>
        <div class="text-center" v-if="jueguetesConStock == ''">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </div>    
        <el-table :data= jueguetesConStock style="width: 100%" v-show="jueguetesConStock != ''">
            <el-table-column label="Codigo" prop="Codigo"></el-table-column>
            <el-table-column label="Nombre" prop="Nombre"></el-table-column>
            <el-table-column label="Stock" prop="Stock"></el-table-column>
            <el-table-column label="Precio" prop="Precio"></el-table-column>
            <el-table-column align="right">
            <template slot-scope="scope">
                <el-button size="mini" @click="Editar(scope.row.id)">Edit</el-button>
            </template>
            </el-table-column>
        </el-table>
<v-app v-if="mostrar">
  <v-form ref="form" @submit.prevent="edit">
    <v-container>
        <h1 class="text-center">Edita un juguete</h1>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field v-model="Editing.Nombre" label="Nombre" type="text" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="Editing.Stock" label="Stock" type="text" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="Editing.Precio" label="Precio" type="text" required></v-text-field>
            </v-col>
        </v-row>
            <v-btn color="success" class="mr-4" type="submit">Edit</v-btn>
            <v-btn color="primary" class="mr-4" @click="goBack"> Return</v-btn>
    </v-container>
  </v-form>
</v-app>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            mostrar: false,
            Editing:{
                id: '',
                Nombre: '',
                Stock: '',
                Precio: '',

            }
        }
    },
    computed:{
        ...mapGetters(['jueguetesConStock'])
    },
    methods: {
        edit(){
            if(this.Editing.id && this.Editing.Nombre && this.Editing.Stock && this.Editing.Precio){
                this.$confirm('¿Quiere editar este juguete?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Elemento editado'
                });
                this.$store.dispatch('editandoJuguetes',this.Editing);
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'No se pudo editar...'
                });
                this.$router.push('/list')
                });                    
            }
        },
        goBack(){
            this.$router.push('/list')
        },
        Editar(){
            this.mostrar = !this.mostrar;
        },
    },
    created() {
        let datos = {};
        datos = this.$store.getters.traerJuguetes.find(resp => resp.id === this.$route.params.id)
        if (datos){
            this.Editing.Nombre = datos.Nombre;
            this.Editing.Precio = datos.Precio;
            this.Editing.Stock = datos.Stock;
            this.Editing.id = datos.id;
        }
    },
}
</script>

<style>

</style>