<template>
    <v-layout row justify-start>
        <v-container>
            <v-flex>
                <v-toolbar class=" red darken-3">
                    <v-toolbar-title class="headline">Departemen Teknik Elektro dan Teknologi Informasi</v-toolbar-title>
                    <v-divider></v-divider><v-divider></v-divider><v-divider></v-divider><v-divider></v-divider>
                    <v-layout justify-center row>
                      <!---  <v-menu :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                            <v-text-field slot="activator" v-model="date" readonly></v-text-field>
                            <v-date-picker v-model="date" @change="initialize" @input="menu = false"></v-date-picker>
                        </v-menu> -->
                    <v-dialog v-model="newdialog" max-width="500px">
        <v-btn slot="activator" flat dark class="mb-2" icon><v-icon>add</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Tambah Pemakaian Baru</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap column>
                <v-flex xs12 sm6 md4>
                  <v-select :items="listruang" item-text="nama_ruangan" v-model="newItem" return-object label="Nama Ruangan"></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.departemen" label="Departemen"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.penanggung_jawab" label="Penanggung Jawab"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.telepon" label="Nomor HP"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.keterangan" label="Keterangan"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-flex>
                    <v-menu :close-on-content-click="false" v-model="menu4" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <v-text-field slot="activator" v-model="datedialog" readonly>13 Maret 2018</v-text-field>
                        <v-date-picker v-model="datedialog" @input="menu4 = false"></v-date-picker>
                    </v-menu>
                    <v-spacer></v-spacer>  
                      <v-layout row>
                        <v-flex><v-select :items="timeselect" v-model="mulaiwaktu" label="Mulai"></v-select></v-flex>
                        <v-flex ml-1><v-select :items="timeselect" v-model="selesaiwaktu" label="Selesai"></v-select></v-flex>
                      </v-layout>
                      
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
      </v-layout>
      </v-toolbar>



    <v-layout row>
      
      <v-flex xs12 sm6 md3>
      <v-layout column>
      <v-flex xs12 sm6 md3>
      <v-date-picker v-model="date" @change="initialize"></v-date-picker>
      </v-flex>
      <v-list class="blue darken-3">

        <v-layout justify-center><v-subheader class="headline" ><v-icon>email</v-icon>  Pesanan Ruang</v-subheader></v-layout>
        <v-list-tile v-for="(item3, n) in requestOrder" :key="n" @click="$set(reqDialog, item3.id_pemesanan, true)">
          <v-list-tile-content>
            <v-list-tile-title>{{item3.keterangan}}</v-list-tile-title>
            <v-dialog v-model="reqDialog[item3.id_pemesanan]" :key="item3.id_pemesanan" max-width="500">
              <v-card>
                <v-card-title class="headline">Detail Pesanan</v-card-title>
                <v-spacer></v-spacer>
                  <v-chip class="red darken-3" text-color="white">{{item3.ruangan}}</v-chip>
                  <v-chip class="red darken-3" text-color="white">{{item3.tanggal}}</v-chip>
                  <v-chip class="red darken-3" text-color="white">{{item3.timestamp_start + ' - ' + item3.timestamp_end}}</v-chip>
                  <v-spacer></v-spacer>
                  <v-card-text>Keperluan : {{item3.keterangan}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Penanggung Jawab : {{item3.penanggung_jawab}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Nomor HP : {{item3.telepon}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Status Surat : {{item3.status_surat}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Status Peminjaman : <v-chip round small color="grey darken-4" text-color="white">{{item3.status_peminjaman}}</v-chip></v-card-text>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn flat color="error" @click="Declineruang(item3); $set(reqDialog, item3.id_pemesanan, false)">Decline</v-btn>
                    <v-btn flat color="success" @click="ACCruang(item3); $set(reqDialog, item3.id_pemesanan, false)">Accept</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-layout>
    </v-flex>      
            

    <v-layout row align-start>
    <v-flex>
      <v-layout row>
     <v-list single-line subheader v-for="(item, index1) in ruang" :key="index1" class="grey darken-3">
        <v-layout justify-center>
        <v-subheader v-text="item.Ruangan" class="headline"></v-subheader>
        </v-layout>
        <v-list-tile v-for="(item2, index2) in item.Jadwal" :key="index2" @click.stop="$set(viewdialog, item2.ID, true)">
            <v-list-tile-content>
              <v-list-tile-title>{{item2.keterangan}}</v-list-tile-title>
              <v-list-tile-text>{{new Date(item2.timestamp_start*1000).getHours() + '.00' + ' - ' + new Date(item2.timestamp_end*1000).getHours() + '.00'}}</v-list-tile-text>
            <!---  <v-list-tile-text>{{item2.mulai + ' - ' + item2.selesai}}</v-list-tile-text> -->
            </v-list-tile-content>
            <v-list-tile-action>
              <v-dialog v-model="viewdialog[item2.ID]" :key="item2.ID" max-width="500">
                <v-card>
                  <v-card-title class="headline">Detail Pemakaian Ruangan</v-card-title>
                  <v-spacer></v-spacer>
                  <v-chip class="red darken-3" text-color="white">{{item2.ruangan}}</v-chip>
                  <v-chip class="red darken-3" text-color="white">{{new Date(item2.timestamp_start*1000).toISOString().substr(0, 10)}}</v-chip>
                  <v-chip class="red darken-3" text-color="white">{{new Date(item2.timestamp_start*1000).getHours() + '.00' + ' - ' + new Date(item2.timestamp_end*1000).getHours() + '.00'}}</v-chip>
                  <v-spacer></v-spacer>
                  <v-card-text>Keperluan : {{item2.keterangan}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Penanggung Jawab : {{item2.penanggung_jawab}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Nomor HP : {{item2.telepon}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Status Surat : {{item2.status_surat}}</v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-text>Status Peminjaman : <v-chip color="grey darken-4" text-color="white">{{item2.status_peminjaman}}</v-chip></v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click.stop="$set(editdialog, item2.ID, true);$set(viewdialog, item2.ID, false)">
                      Edit
                      <v-dialog v-model="editdialog[item2.ID]" :key="item2.ID" max-width="500">
                        <v-card>
                          <v-card-title class="headline">Ubah Status surat</v-card-title>
                          <v-spacer></v-spacer>
                          <v-select :items="ubahstatus" return-object v-model="editsurat.status_surat" label="Status surat"></v-select>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click.stop="$set(editdialog, item2.ID, false)">Cancel</v-btn>
                      <v-btn color="green darken-1" flat="flat" @click.stop="UpdateSurat(index1, index2);$set(editdialog, item2.ID, false)">Update</v-btn>
                    </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                      
                        
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile-action>
        </v-list-tile>
        </v-list>
        </v-layout>
        </v-flex>
        </v-layout>
        
        </v-layout>      
        </v-flex>
        </v-container>
    </v-layout>
</template>



<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'Jadwal2',
  props: {
    msg: String,
  },
  data(){
      return {
        ACC: true,
        filterruang: [],
        Batal: false,
        newdialog: false,
        mulaiwaktu: 0,
        newItem: null,
        editsurat: {status_surat: ''},
        ubahstatus: ['Belum mengajukan', 'Dalam Proses', 'ACC'],
        selesaiwaktu: 0,
        timeselect: [6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00,
                    13.00, 14.00, 15.00, 16.00, 17.00, 18.00,
                    19.00, 20.00, 21.00, 22.00],
        reqDialog: {},
        menu2: false,
        menu3: false,
        menu4: false,
        viewdialog: {},
        editdialog:{},
        addAcara: false,
        requestOrder: [],
        ruang: [],
        listruang: [],
        date: new Date().toISOString().substr(0, 10),
        datedialog: new Date().toISOString().substr(0, 10),
        timestart: new Date(),
        timeend: new Date(),
        editedIndex: -1,
        editedIndexedit: 0,
        editedItem: { id_ruangan: '', id_departemen: '', ruangan: '', status_proses: true, departemen: '', penanggung_jawab: '', telepon: '', keterangan: '',email: '',
                      StatusSurat: {status_peminjaman: true, status_surat: 'ACC'},
                      TimeStamp: {timestamp_start: '', timestamp_end: ''}
                    },
        editedItem2: { id_ruangan: '', id_departemen: '', ruangan: '', status_proses: null, departemen: '', penanggung_jawab: '', telepon: '', keterangan: '',email: '',
                      StatusSurat: {status_peminjaman: null, status_surat: 'ACC'},
                      TimeStamp: {timestamp_start: '', timestamp_end: ''}
                    },
        defaultItem: { id_ruangan: '', id_departemen: '', ruangan: '',  status_proses: true,departemen: '', penanggung_jawab: '', telepon: '', keterangan: '',email: '',
                      StatusSurat: {status_peminjaman: true, status_surat: 'ACC'},
                      TimeStamp: {timestamp_start: '', timestamp_end: ''}
                    }
      }
  },

  created() {
      this.initialize()
  },
  methods: {
      initialize () {
          var now2 = new Date(this.date);
          var startOfDay2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
          var timestamp2start = (startOfDay2.getTime() / 1000) + 86400 - 61200;
          var timestamp2end = (startOfDay2.getTime() / 1000) + 86400 - 61200 + 86399;
          console.log(timestamp2start)
          console.log(timestamp2end)
          axios.get('https://dteti.au-syd.mybluemix.net/api/jadwal/Dept-1/time?start=' + timestamp2start + '&end='+ timestamp2end).then(response => {
              this.ruang = response.data.result
          
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))

          axios.get('https://dteti.au-syd.mybluemix.net/api/ruang/list').then(res => {
          this.listruang = res.data.result
          console.log(res)
          })
          .catch(error => console.log(JSON.stringify(error)))

          axios.get('https://dteti.au-syd.mybluemix.net/api/order/listorder').then(res => {
          this.requestOrder = res.data.result
          console.log(res)
          })
          .catch(error => console.log(JSON.stringify(error)))
          


      },
        ACCruang(item){
          const index = this.requestOrder.indexOf(item)
          const id = this.requestOrder[index].id_pemesanan
          this.requestOrder[index].status_peminjaman = true
          this.requestOrder[index].status_surat = 'ACC'
          this.requestOrder[index].status_proses = true
          this.editedItem2.id_ruangan = this.requestOrder[index].id_ruangan
          this.editedItem2.ruangan = this.requestOrder[index].ruangan
          this.editedItem2.id_departemen = this.requestOrder[index].id_departemen
          this.editedItem2.penanggung_jawab = this.requestOrder[index].penanggung_jawab
          this.editedItem2.keterangan = this.requestOrder[index].keterangan
          this.editedItem2.telepon = this.requestOrder[index].telepon
          this.editedItem2.email = this.requestOrder[index].email
          this.editedItem2.departemen = this.requestOrder[index].departemen
          this.editedItem2.StatusSurat.status_surat = this.requestOrder[index].status_surat
          this.editedItem2.StatusSurat.status_peminjaman = this.requestOrder[index].status_peminjaman
          this.editedItem2.TimeStamp.timestamp_start = this.requestOrder[index].timestamp_start
          this.editedItem2.TimeStamp.timestamp_end = this.requestOrder[index].timestamp_end
          var token = localStorage.getItem('token');
          axios.post('https://dteti.au-syd.mybluemix.net/api/addOrder', this.editedItem2, {'headers': {'Authorization' : token}}).then(response => {
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
          axios.put('http://dteti.au-syd.mybluemix.net/api/order/'+ id + '/accept').then(response => {
          this.requestOrder = response.data.result
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
          this.ruangan.splice(index, 1)
        },
        UpdateSurat(index1, index2){
          const id = this.ruang[index1].Jadwal[index2].id_pemesanan
          axios.put('http://dteti.au-syd.mybluemix.net/api/order/'+ id + '/update', this.editsurat).then(response => {
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
        },
        Declineruang(item){
          const index = this.requestOrder.indexOf(item)
          const id = this.requestOrder[index].id_pemesanan
          this.requestOrder[index].status_peminjaman = false
          this.requestOrder[index].status_surat = 'Ditolak'
          this.requestOrder[index].status_proses = false
          this.editedItem2.id_ruangan = this.requestOrder[index].id_ruangan
          this.editedItem2.ruangan = this.requestOrder[index].ruangan
          this.editedItem2.id_departemen = this.requestOrder[index].id_departemen
          this.editedItem2.penanggung_jawab = this.requestOrder[index].penanggung_jawab
          this.editedItem2.keterangan = this.requestOrder[index].keterangan
          this.editedItem2.telepon = this.requestOrder[index].telepon
          this.editedItem2.email = this.requestOrder[index].email
          this.editedItem2.departemen = this.requestOrder[index].departemen
          this.editedItem2.StatusSurat.status_surat = this.requestOrder[index].status_surat
          this.editedItem2.StatusSurat.status_peminjaman = this.requestOrder[index].status_peminjaman
          this.editedItem2.TimeStamp.timestamp_start = this.requestOrder[index].timestamp_start
          this.editedItem2.TimeStamp.timestamp_end = this.requestOrder[index].timestamp_end
          
          axios.put('http://dteti.au-syd.mybluemix.net/api/order/'+ id + '/decline').then(response => {
          this.requestOrder = response.data.result
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
          this.ruangan.splice(index, 1)
        },
        editItem (item) {
        this.editedIndex = this.ruang.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.newdialog = true
      },
            close () {
        this.newdialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          this.ruang.push(this.editedItem)
          Object.assign(this.ruang[this.editedIndex], this.editedItem)
          console.log(this.editedItem)
          
    
        } else {
          
          var now = new Date(this.datedialog);
          var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          var timestamp = (startOfDay.getTime() / 1000) + 86400 - 61200;
          this.editedItem.id_ruangan = this.newItem.id_ruangan
          this.editedItem.id_departemen = this.newItem.id_departemen
          this.editedItem.ruangan = this.newItem.nama_ruangan
          this.editedItem.TimeStamp.timestamp_start = (timestamp + (this.mulaiwaktu*3600) - 25200).toString()
          this.editedItem.TimeStamp.timestamp_end = (timestamp + (this.selesaiwaktu*3600)- 25200).toString()
          console.log(this.editedItem.TimeStamp.timestamp_start)
          console.log(this.editedItem.TimeStamp.timestamp_end)
          var token = localStorage.getItem('token');
          axios.post('https://dteti.au-syd.mybluemix.net/api/addOrder', this.editedItem, {'headers': {'Authorization' : token}}).then(response => {
          console.log(response)
          })
          .catch(error => console.log(JSON.stringify(error)))
          this.ruang.push(this.editedItem)
          console.log(JSON.stringify(this.editedItem))
        }
        this.close()
      }
  }

}
</script>