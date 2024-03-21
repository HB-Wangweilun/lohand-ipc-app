<template>
  <div class="header">
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="inner-header flexCol"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Bubble",
});
</script>
<script setup></script>

<style lang="scss" scoped>
.circles {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 18s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 20%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 6s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 8s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 40px;
  height: 40px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 5s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 50px;
  height: 50px;
  animation-delay: 0s;
  animation-duration: 11s;
}
.circles li:nth-child(11) {
  left: 40%;
  width: 25px;
  height: 25px;
  animation-delay: 1s;
  animation-duration: 45s;
}

.circles li:nth-child(12) {
  left: 10%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(13) {
  left: 45%;
  width: 50px;
  height: 50px;
  animation-delay: 0s;
  animation-duration: 11s;
}
.circles li:nth-child(14) {
  left: 28%;
  width: 25px;
  height: 25px;
  animation-delay: 5s;
  animation-duration: 45s;
}

.circles li:nth-child(15) {
  left: 10%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(16) {
  left: 5%;
  width: 50px;
  height: 50px;
  animation-delay: 5s;
  animation-duration: 11s;
}

.circles li:nth-child(16) {
  left: 20%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(17) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(18) {
  left: 65%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(19) {
  left: 75%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(20) {
  left: 20%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(21) {
  left: 65%;
  width: 40px;
  height: 40px;
  animation-delay: 7s;
}

.circles li:nth-child(22) {
  left: 60%;
  width: 25px;
  height: 25px;
  animation-delay: 5s;
  animation-duration: 45s;
}

.circles li:nth-child(23) {
  left: 70%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(24) {
  left: 90%;
  width: 50px;
  height: 50px;
  animation-delay: 0s;
  animation-duration: 11s;
}
.circles li:nth-child(25) {
  left: 25%;
  width: 25px;
  height: 25px;
  animation-delay: 1s;
  animation-duration: 45s;
}

.circles li:nth-child(26) {
  left: 15%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(27) {
  left: 15%;
  width: 50px;
  height: 50px;
  animation-delay: 0s;
  animation-duration: 11s;
}
.circles li:nth-child(28) {
  left: 45%;
  width: 25px;
  height: 25px;
  animation-delay: 5s;
  animation-duration: 45s;
}

.circles li:nth-child(29) {
  left: 40%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(30) {
  left: 50%;
  width: 50px;
  height: 50px;
  animation-delay: 5s;
  animation-duration: 11s;
}

.circles li:nth-child(31) {
  left: 55%;
  width: 50px;
  height: 50px;
  animation-delay: 5s;
  animation-duration: 11s;
}

.circles li:nth-child(32) {
  left: 60%;
  width: 50px;
  height: 50px;
  animation-delay: 5s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
    border-radius: 50%;
  }

  100% {
    transform: translateY(-1100px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.countdown > div {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.25);
  width: 115px;
  height: 115px;
  border-radius: 50%;
  background: #fff9f961;
  // border: 1px solid white;
}

// .number {
//   font-weight: 500;
//   font-size: 44px;
//   color: white;
// }

div span:last-of-type {
  font-size: 12px;
  // color: white;
  font-weight: bold;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.flexCol {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: stretch;
  flex-wrap: nowrap;
  flex-direction: column;
}

.h1 {
  font-size: 60px;
  // color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 8px;
}

#subscribe input {
  color: black;
  vertical-align: middle;
  width: 218px;
  border: 1px solid var(--gradienttwo);
  padding: 0 10px;
  height: 40px;
  text-align: left;
  background: transparent;
}

#subscribe input[type="button"] {
  background: linear-gradient(
    60deg,
    var(--gradientone) 0%,
    var(--gradienttwo) 100%
  );
  width: auto;
  padding: 0px 25px;
  cursor: pointer;
  margin-left: -5px;
  font-weight: bold;
  height: 40px;
  display: inline-block;
  // color: white;
}

input[type="color"] {
  padding: 0;
  width: 150%;
  height: 150%;
  margin: -25%;
  display: none;
}

.cp_wrapper {
  overflow: hidden;
  height: 70px;
  width: 70px;
}

.color_picker {
  position: absolute;
  z-index: 1;
  left: 1%;
  top: 3%;
}

.color_picker_image {
  height: 70px;
  width: 70px;
  position: absolute;
}
</style>
