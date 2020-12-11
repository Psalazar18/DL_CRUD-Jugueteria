<template>
  <v-app>
  <v-form ref="form" @submit.prevent="add">
    <v-container>
        <h1 class="text-center">Agrega un juguete</h1>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field v-model="Adding.Codigo" label="Codigo" type="text" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="Adding.Nombre" label="Nombre" type="text" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="Adding.Stock" label="Stock" type="text" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="Adding.Precio" label="Precio" type="text" required></v-text-field>
            </v-col>
        </v-row>
            <v-btn color="success" class="mr-4" type="submit">Add</v-btn>
            <v-btn color="primary" class="mr-4" @click="goBack"> Return</v-btn>
    </v-container>
  </v-form>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            Adding:{
                Codigo: '',
                Nombre: '',
                Stock: '',
                Precio: '',

            }
        }
    },
    methods: {
        add(){
            if(this.Adding.Codigo && this.Adding.Nombre && this.Adding.Stock && this.Adding.Precio){
                this.$confirm('¿Quiere agregar este juguete?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Elemento agregado'
                });
                this.$store.dispatch('addingJuguetes',this.Adding);
                this.$router.push('/list')
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'No se pudo agregar...'
                });
                this.$router.push('/list')
                });                    
            }
        },
        goBack(){
            this.$router.push('/list')
        }
    },
}
</script>
