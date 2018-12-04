<template>
    <v-layout>
        <v-container fluid fill-height>
            <v-flex dark xs12 sm12>
                <v-card :items="admin" height="100%">
                    <v-layout justify-end>
                        <v-btn @click.native="editprofil = true" flat icon><v-icon>edit</v-icon>
                            <v-dialog v-model="editprofil" max-width="500">
                                <v-card>
                                    <v-card-title class="headline">Edit Profil</v-card-title>
                                    <v-form>
                                      <v-text-field v-model="PJ" label="Nama Admin" single-line autofocus></v-text-field>
                                      <v-select :items="fakt" v-model="Fakultas" label="Nama Fakultas" single-line autofocus></v-select>
                                      <v-text-field v-model="NoHP" label="Nomor HP" single-line autofocus></v-text-field>
                                    </v-form>
                                    <v-card-actions>
                                      <v-btn color="red darken-1" flat="flat" @click.native="editprofil = false">Cancel</v-btn>
                                      <v-btn color="red darken-1" flat="flat" @click.native="editprofil = false">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-btn>
                    </v-layout>
                    <v-layout row>
                    <v-flex xs12 sm2 ml-5 mb-5>
                      <v-hover>
                        <v-avatar size="150" slot-scope="{hover}">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/MarioSMBW.png/220px-MarioSMBW.png" alt="Avatar"></v-avatar>
                        <v-expand-transition ><div v-if="hover" class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text" style="height: 100%;">Edit</div></v-expand-transition>
                      </v-hover>
                    </v-flex>
                    <v-flex xs12 sm8 mt-4>
                    <v-flex xs3 sm12><v-card-title class="headline">Admin PIRUMA</v-card-title></v-flex>
                    <v-spacer></v-spacer>
                    <v-icon>person</v-icon><v-card-text>{{'   ' + PJ}}</v-card-text>
                    <v-spacer></v-spacer>
                    <v-icon>business</v-icon><v-card-text>{{'   ' + Fakultas}}</v-card-text>
                    <v-spacer></v-spacer>
                    <v-icon>phone</v-icon><v-card-text>{{'   ' + NoHP}}</v-card-text>
                    </v-flex></v-layout>     
                </v-card>
                
<template>
  <div>
    <v-flex mt-5 xs12 sm12>
    <v-toolbar flat class="red darken-3" dark>
      <v-toolbar-title>Daftar Ruangan</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" flat dark class="mb-2" icon><v-icon>add</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap column>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.nama_ruangan" label="Nama Ruangan"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fasilitas" label="Fasilitas"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.kapasitas" label="Kapasitas"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="red darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="ruangan"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nama_ruangan }}</td>
        <td class="text-xs-left">{{ props.item.fasilitas }}</td>
        <td class="text-xs-left">{{ props.item.kapasitas }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="red darken-3" @click="initialize" depressed>Update Table</v-btn>
      </template>
    </v-data-table>
    </v-flex>
  </div>
</template>
            </v-flex>
        </v-container>
    </v-layout>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
    export default {
        name: ' Admin',
        props: {
            msg: String
        },
        data() {
            return {
                PJ: 'Murdianz',
                Fakultas:'Fakultas Teknik',
                NoHP:'082337849366',
                editprofil: false,
                headers: [
                    {text:'Ruangan', value:'nama', sortable: false},
                    {text:'Fasilitas', value:'fasilitas', sortable: false},
                    {text:'Kapasitas', value:'kapasitas', sortable: false},
                    {text:'', value:'', sortable: false}
                ],
                dialog: false,
                fakt: ['Fakultas Teknik', 'Fakultas MIPA', 'Fakultas Kedokteran', 'Fakultas Peternakan'],
                ruangan:[],
                editedIndex: -1,
                editedItem: {
                    nama_ruangan: '',
                    fasilitas: '',
                    kapasitas: 0,
                    id_ruangan:''
                },
                defaultItem: {
                    nama_ruangan: '',
                    fasilitas: '',
                    kapasitas: 0,
                    id_ruangan:''
                }
            }
        },
      computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Ruangan Baru' : 'Edit Ruangan'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
         axios.get('https://dteti.au-syd.mybluemix.net/api/ruang/list').then(response => {
          this.ruangan = response.data.result
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
      },
      editItem (item) {
        this.editedIndex = this.ruangan.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.ruangan.indexOf(item)
        const id = this.ruangan[index].id_ruangan
          axios.get('http://dteti.au-syd.mybluemix.net/api/ruangan/'+ id + '/delete').then(response => {
          this.ruangan = response.data.result
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
        confirm('Apakah anda akan menghapus ruangan ini?') && this.ruangan.splice(index, 1)

      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          this.ruangan.push(this.editedItem)
          Object.assign(this.ruangan[this.editedIndex], this.editedItem)
          //var token = localStorage.getItem('token');
          const id = this.ruangan[this.editedIndex].id_ruangan
          axios.put('http://dteti.au-syd.mybluemix.net/api/ruangan/'+ id + '/update', this.editedItem).then(response => {
          this.ruangan = response.data.result
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
          this.ruangan.splice(this.editedIndex, 1)

        } else {
          this.ruangan.push(this.editedItem)
          console.log(JSON.stringify(this.editedItem))
          var token = localStorage.getItem('token');
          axios.post('https://dteti.au-syd.mybluemix.net/api/ruangan/add', this.editedItem, {'headers': {'Authorization' : token}}).then(response => {
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
        }
        this.close()
      }
    }
    }
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>