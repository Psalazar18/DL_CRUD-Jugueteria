<template>
<v-app id="inspire" class="container">
  <v-btn class="mt-6" color="secondary" @click="out">Log out</v-btn>
    <v-data-table
      :headers="headers"
      :items="traerJuguetes"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Agrega un producto</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.codigo"
                        label="Codigo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.stock"
                        label="Stock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field
                        v-model="editedItem.precio"
                        label="Precio"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">¿Seguro que quiere eliminar?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          small
          class="mr-2"
          @click="editItem(item)"
        >
          <font-awesome-icon icon="edit" />
        </v-btn>
        <v-btn
          small
          @click="deleteItem(item)"
        >
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from "vuex";
export default {
  name: 'List',
  data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Codigo', align: 'start', value: 'codigo',},
        { text: 'Nombre', value: 'nombre' },
        { text: 'Stock', value: 'stock' },
        { text: 'Precio', value: 'precio' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        codigo: '',
        nombre: '',
        stock: '',
        precio: '',
      },
      defaultItem: {
        codigo: '',
        nombre:'',
        stock: '',
        precio: '',
      },
  }),
  computed: {
    ...mapGetters(['traerJuguetes']),
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
  },
  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
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
      editItem (item) {
        this.editedIndex = this.traerJuguetes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.traerJuguetes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.traerJuguetes.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.traerJuguetes[this.editedIndex], this.editedItem)
        } else {
          this.traerJuguetes.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
