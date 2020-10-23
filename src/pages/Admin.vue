<template>
  <q-page padding>
        <div class="row" v-if="users">
                <h6 class="col-12 text-center">Admin Panel</h6>
            <div class="col-12 col-md-4">
                <q-card class="bg-positive text-white">
                    <q-card-section class="row">
                        <span class="col-12 text-center">Registered Users</span>
                    </q-card-section>
                    <q-card-section class="row">
                        <span class="col-12 text-center"><h5>{{users.length}}</h5></span>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-4">
                <q-card class="bg-white text-black">
                    <q-card-section class="row">
                        <span class="col-12 text-center">First Semester Balance</span>
                    </q-card-section>
                    <q-card-section class="row">
                        <span class="col-12 text-center"><h5>&#8358;{{firstSemesterAmount}}.00</h5></span>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-4">
                <q-card class="bg-positive text-white">
                    <q-card-section class="row">
                        <span class="col-12 text-center">Second Semester Balance</span>
                    </q-card-section>
                    <q-card-section class="row">
                        <span class="col-12 text-center"><h5>&#8358;{{secondSemesterAmount}}.00</h5></span>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div>
            <h6 class="text-center">Semester prices</h6>
            <q-markup-table 
                flat 
                bordered 
                v-if="getUsers"
                class="table"
                style="width: 400px"
                >
                    <thead class="bg-primary">
                        <tr>
                            <th class="text-left text-white">Semester</th>
                            <th class="text-left text-white">Amount</th>
                        </tr>
                    </thead>
                    <tbody class="bg-grey-3" v-if="dues">
                        <tr v-for="(e,i) in dues" :key="i">
                            <td class="text-left">{{e.semester}}
                            </td>
                               <td class="text-left">
                                   &#8358;{{e.amount}}
                                   <q-btn 
                                   color="secondary" 
                                   @click="dialog = true; amount = e.amount; id = e._id" 
                                   icon="edit" size="sm" flat />
                               </td>
                        </tr>
                    </tbody>
                </q-markup-table>
        </div>
        <div class="row">
            <h6 class="text-center col-12">Users Table</h6>
                <q-select
                label="Year of study"
                transition-show="flip-up"
                transition-hide="flip-down"
                square
                outlined
                dense
                v-model="level"
                :options="levelOptions"
                class="col-5 q-pa-sm"
            />
            <q-select
                label="payment status"
                transition-show="flip-up"
                transition-hide="flip-down"
                square
                dense
                outlined
                v-model="paymentStatus"
                :options="paymentStatusOptions"
                class="col-4 q-pa-sm"
            />
            <q-select
                label="Sort by Semester"
                transition-show="flip-up"
                transition-hide="flip-down"
                square
                dense
                outlined
                v-model="semester"
                :options="semesterOptions"
                class="col-3 q-pa-sm"
            />
            <div align="center" class="text-center row">
                <q-input 
                    label="Search email"
                    class="q-pa-sm  col-12"
                    dense
                    outlined
                    rounded
                    standout
                    hint="search users by email"
                    v-model="searchUser"
                    clearable
                >
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <div class="col-12">
                <q-markup-table flat bordered class="markup-table my-sticky-header-table" v-if="getUsers">
                    <thead class="bg-teal">
                        <tr>
                            <th class="text-left text-white">S/N</th>
                            <th class="text-left text-white">Name</th>
                            <th class="text-center text-white">Email</th>
                            <th class="text-left text-white">Level</th>
                            <th class="text-center text-white">First Semester</th>
                            <th class="text-center text-white">Second Semester</th>
                        </tr>
                    </thead>
                    <tbody class="bg-grey-3">
                        <tr v-for="(user, i) in getUsers" :key="i">
                            <td class="text-left">{{ i + 1 }}</td>
                            <td class="text-left">{{user.name}}</td>
                            <td class="text-center">{{user.email}}</td>
                            <td class="text-left">{{user.level}}</td>
                            <td class="text-center">
                                <span>
                                {{user.first}} <span v-if="user.firstAmount">[&#8358;{{user.firstAmount}}]</span>
                                <span v-if="user.first === 'N/A'"><q-btn 
                                   color="secondary" 
                                   @click="paymentDialog = true; paySetup(user.id, 'first'); userForPayment = user.name" 
                                   icon="edit" size="sm" flat /></span>
                                </span>
                            </td>
                            <td class="text-center">
                                <span>
                                    {{user.second}} <span v-if="user.secondAmount">[&#8358;{{user.secondAmount}}]</span>
                                    <span v-if="user.second === 'N/A'"><q-btn 
                                   color="secondary" 
                                   @click="paymentDialog = true; paySetup(user.id, 'second'); userForPayment = user.name" 
                                   icon="edit" size="sm" flat /></span>
                                </span>
                            </td>
                        </tr>
                        <tr v-if="getUsers.length <= 0">
                            <h6>No user found</h6>
                        </tr>
                    </tbody>
                </q-markup-table>
            </div>
        </div>
        <!-- dialog for semester fee -->
    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section>
                <h6 class="text-center">Departmental fee</h6>
            </q-card-section>
            <q-card-section>
                <q-input dense outlined rounded type="number" v-model.number="amount" autofocus @keyup.enter="prompt = false" />
            </q-card-section>
            <q-card-section>
                <q-btn flat label="cancel" v-close-popup />
                <q-btn flat label="save" @click="edit({id, amount})" />
            </q-card-section>
        </q-card>
    </q-dialog>
     <!-- dialog for admin payment fee -->
    <q-dialog v-model="paymentDialog">
        <q-card>
            <q-card-section>
                <span class="text-center">Are you sure you want to make {{semesterForPayment}} 
                    semester payment of &#8358;{{amountForPayment}} for {{userForPayment}}</span>
            </q-card-section>
 
            <q-card-actions align="right">
                <q-btn flat label="cancel" color="red" v-close-popup />
                <q-btn flat label="confirm" @click="pay" color="primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
    data() {
        return{
            dialog: false,
            paymentDialog: false,
            amount: '',
            id: '',
            userForPayment: '',
            amountForPayment: '',
            semesterForPayment: '',
            data: null,
        }
    },
    computed: {
        ...mapGetters('admin', ['getUsers', 'firstSemesterAmount', 'secondSemesterAmount', 'dues']),
        ...mapState('admin', ['levelModels', 'levelOptions', 'paymentStatusModels', 'paymentStatusOptions',
         'semesterModels', 'semesterOptions', 'search', 'users']),
         level: {
             get() {
                 return this.levelModels
             },
             set(value) {
                 this.setLevelModels(value)
             }
         },
         paymentStatus: {
             get() {
                 return this.paymentStatusModels
             },
             set(value) {
                 this.setPaymentStatusModels(value)
             }
         },
         semester: {
             get() {
                 return this.semesterModels
             },
             set(value) {
                 this.setSemesterModels(value)
             }
         },
         searchUser: {
             get() {
                 return this.search
             },
             set(value) {
                 this.setSearch(value)
             }
         },
    },
    methods: {
        ...mapActions('admin', ['setLevelModels', 
        'changePrice', 'setPaymentStatusModels', 'setSemesterModels', 'setSearch', 'makeUserPayment']),
        edit(value){
            this.changePrice(value)
            this.dialog = false
        },
        paySetup(id, semester){
            const data = {}
            data.user = id
            if(semester === 'first'){
                const due = this.dues.find(e => e.semester === semester)
                data.amount = due.amount
                data.semester = due.semester
                this.amountForPayment = data.amount
                this.semesterForPayment = data.semester
            }
            if(semester === 'second'){
                const due = this.dues.find(e => e.semester === semester)
                data.amount = due.amount
                data.semester = due.semester
                this.amountForPayment = data.amount
                this.semesterForPayment = data.semester
            }
            this.data = data
        },
        pay() {
            console.log(this.data)
            this.makeUserPayment(this.data)
            this.paymentDialog = false
        }
    }
}
</script>

<style>
    .table{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>