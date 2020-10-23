<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-banner v-if="getDues" rounded class="bg-info text-white">
          <template v-slot:avatar>
            <q-icon name="check" color="green" />
          </template>
            Print your receipts
          <template v-slot:action>
            <q-btn flat :disable="getDues[0].status !== 'PAID'" @click="dialog = true; setDues('first');" label="first semester receipt" />
            <q-btn flat :disable="getDues[1].status !== 'PAID'" @click="dialog = true; setDues('second');" label="second semester receipt" />
          </template>
        </q-banner>
      </div>

      <div class="col-12 q-pt-lg" align="center">
        <q-markup-table flat bordered class="bg-positive" style="width: 400px">
          <thead>
            <tr>
              <th class="text-left text-white">Semester</th>
              <th class="text-left text-white">Amount</th>
              <th class="text-center text-white">Status</th>
            </tr>
          </thead>
          <tbody class="bg-grey-3" v-if="getDues">
            <tr v-for="(due, i) in getDues" :key="i">
              <td class="text-left">{{due.semester}} Semester</td>
              <td class="text-left">&#8358;{{due.amount}}</td>
              <td class="text-center"> {{due.status}} <br /> <q-btn v-if="due.status === 'N/A'" flat label="Pay" @click="makePayment(due._id)" color="positive" /> </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
        <pdf :dialog="dialog" :receipt="receipt" @close="dialog = false" />
    <div class=" q-pr-sm text-right absolute-bottom all-pointer-events">
      Send us a mail if you are having difficulties in payment <br /> 
      <q-btn flat color="info" label="click Here to send mail" /> 
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import jspdf, { jsPDF } from 'jspdf'
import domtoimage from "dom-to-image";
import html2canvas from 'html2canvas'
import {mapState, mapActions, mapGetters} from 'vuex'
import Axios from 'axios'
export default {
  name: 'PageIndex',
  components: {
    'pdf': require('src/components/Pdf').default
  },
  data() {
    return {
      res: 'ntn',
      dialog: false, 
      receipt: {}
    }
  },
  computed: {
    ...mapState('dues', ['dues']),
    ...mapGetters('dues', ['getDues']),
    ...mapState('auth', ['user']),
  },
  mounted() {
    this.verifyPayment();
  },
  methods: {
    ...mapActions('payments', ['makePayment', 'verifyPayment']),
    setDues(value) {
      this.receipt.name = this.user.name
      this.receipt.year = this.user.level
      this.user.payments.forEach(pay => {
        if(pay.semester === value){
          const naira = '\u20A6'
          this.receipt.amount = `${naira}${pay.amount}`
          this.receipt.semester = pay.semester
        }
      })
    },
    printReceipt(){
      window.print()
    },
    download() {
      // const doc = new jsPDF('p', 'pt', 'letter')
      //   // var element = document.getElementById('content');
      //   var element = this.$refs.content.innerHTML;
      //   var width= 72 * 8.5;
      //   var height = 72 * 11;
      //     html2canvas(this.$refs.content).then(canvas => {
      //       var image = canvas.toDataURL('image/png');
      //       doc.addImage(image, 'JPEG', 20, 20, width, height);
      //       doc.save('me.pdf')
      //   });
    //   domtoimage
    // .toPng(this.$refs.content)
    // .then(function(dataUrl) {
    //   var img = new Image();
    //   img.src = dataUrl;
    //   const doc = new jsPDF({
    //     orientation: "portrait",
    //     unit: "pt",
    //     format: [900, 1400]
    //   });
    //   doc.addImage(img, "JPEG", 20, 20);
    //   const date = new Date();
    //   const filename =
    //     "timechart_" +
    //     date.getFullYear() +
    //     ("0" + (date.getMonth() + 1)).slice(-2) +
    //     ("0" + date.getDate()).slice(-2) +
    //     ("0" + date.getHours()).slice(-2) +
    //     ("0" + date.getMinutes()).slice(-2) +
    //     ("0" + date.getSeconds()).slice(-2) +
    //     ".pdf";
    //   doc.save(filename);
    // })
    // .catch(function(error) {
    //   console.error("oops, something went wrong!", error);
    // });
    },
  },
}
</script>
