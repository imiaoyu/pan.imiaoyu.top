<template>
  <div>
    <el-card shadow="never" style="min-height: 10vh">
      <div slot="header" class="clearfix">
        <span>二维码</span>
      </div>
      <div class="qrcode" ref="qrCodeUrl"></div>
      <div></div>
    </el-card>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {};
  },
  methods: {
    creatQrCode() {
      new QRCode(this.$refs.qrCodeUrl, {
        text: "112", // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  mounted() {
    this.creatQrCode();
  }
};
</script>