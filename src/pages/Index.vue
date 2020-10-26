<template>
  <q-page padding>
    <div class="row">
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"> 
      <div class="col-12" v-if="getDues">
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
    </transition>
      <div class="col-12 text-center q-pt-md">
        <span class="text-center text-caption-1"> 
          Nacoss Departmental Dues <br />

        </span>
        <q-avatar>
            <img src="~assets/nacoss.png" alt="" />
          </q-avatar>
      </div>
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"> 
        <div class="col-12 q-pt-lg" align="center">
          <q-markup-table flat bordered class="bg-positive" style="width: 300px;">
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
      </transition>
    </div>
        <pdf :dialog="dialog" :receipt="receipt" @close="dialog = false" />
    <div class="q-pr-sm text-right absolute-bottom all-pointer-events">
      Send us a mail if you are having difficulties in payment <br /> 
      <q-btn @click="emailUs" flat color="info" label="click Here to send mail" /> 
    </div>
  </q-page>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
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
    emailUs() {
      window.location.href = 'mailto:uzoagulujoshua@gmail.com?subject= '
    },
  },
}
</script>
