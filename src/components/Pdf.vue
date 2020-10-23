<template>
<div class="q-pa-md q-gutter-sm">
    <!-- <q-btn label="Maximized" color="primary" @click="dialog = true" /> -->

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="$emit('close')" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar> 
            <div ref="content">
                <div class="row">
                <div class="col-12 text-center">
                    <h5>National Association of Computer science students</h5><br />
                    <span>(Nacoss)</span><br /> 
                    <q-avatar>
                        <img src="~assets/nacoss.png" alt="" />
                    </q-avatar>
                </div>
                <div align="center" class="col-12 justify-center">
                    <q-list style="width:600px"  bordered separator>
                        <q-item v-ripple v-for="(value,key) in receipt" :key="key">
                            <q-item-section>
                                {{key}}
                            </q-item-section>
                            <q-item-section>
                                {{value}} <span v-if="key== 'year'">Year</span>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
                </div>
          </div>
          <div>
          </div>
            <div class="absolute-bottom row q-pb-lg">
                <q-btn label="Download" class="col q-ma-lg" color="primary"  @click="download" />
                <q-btn label="print" class="col q-ma-lg" color="secondary"  @click="print" />
            </div>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
import  jsPDF  from 'jspdf'
import html2canvas from 'html2canvas'
import domtoimage from "dom-to-image";
export default {
  props: ['dialog', 'receipt'],
     data () {
    return {
      // dialog: false,
      maximizedToggle: true
    }
  },
    methods: {
        print(){
            window.print()
        },
        download() {
              domtoimage
              .toPng(this.$refs.content)
              .then(function(dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                const doc = new jsPDF({
                  orientation: "portrait",
                  // unit: "pt",
                  format: [72*6, 72*11]
                });
                doc.addImage(img, "JPEG", 15, 40);
                const date = new Date();
                const filename =
                  "paymentFee_" +
                  date.getFullYear() +
                  ("0" + (date.getMonth() + 1)).slice(-2) +
                  ("0" + date.getDate()).slice(-2) +
                  ("0" + date.getHours()).slice(-2) +
                  ("0" + date.getMinutes()).slice(-2) +
                  ("0" + date.getSeconds()).slice(-2) +
                  ".pdf";
                doc.save(filename);
              })
              .catch(function(error) {
                console.error("oops, something went wrong!", error);
              });
          },
    }
}
</script>

<style>

</style>