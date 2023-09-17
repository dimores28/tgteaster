// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
import * as flsFunctions from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener('resize', function(event) {
   flsFunctions.tabs();

   const tabs = document.querySelectorAll('.tabs__body')

   if(window.innerWidth < 768) {
      tabs?.forEach(tab => {
        tab.hidden = false;
      });
   }

}, true);


function isValidEmail(value) {
   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}

function isValidName(value) {
   return /^[А-ЯЁ][а-яё]+$/.test(value);
}


const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");

userName?.addEventListener("input", function () {
   if (!isValidName(userName.value)) {
     userName.classList.add("_notvalid");
   } else {
     userName.classList.remove("_notvalid");
   }
 });

 userEmail?.addEventListener("input", function () {
   if (!isValidEmail(userEmail.value)) {
     userEmail.classList.add("_notvalid");
   } else {
     userEmail.classList.remove("_notvalid");
   }
 });

 const form = document.querySelector("#contact-form");

 form?.addEventListener("submit", async function (e) {
   e.preventDefault();
 
   let notError =
     isValidEmail(userEmail.value) &&
     isValidName(userName.value);
 
   let formData = new FormData(form);
 
   if (notError) {
      form.classList.add("_sending");
 
     let response = await fetch("mail.php", {
       method: "POST",
       body: formData,
     });
 
     if (response.ok) {
       let result = await response.json();
       let alertMsg = document.querySelector(".alert");
      alertMsg.innerHTML =
        '<p class="alert__msg" >Ваше повідомлення відправлене!<p/>';
       alertMsg.classList.add("_show__success");

       form.reset();
       form.classList.remove("_sending");
     } else {
       let alertMsg = document.querySelector(".alert");
       alertMsg.innerHTML = '<p class="alert__msg" >Помилка відправки, спробуйте ще раз!<p/>';
       alertMsg.classList.add("_show");

       form.classList.remove("_sending");
     }
   } else {
      if (!isValidName(userName.value)) {
         userName.classList.add("_empty");
       } else {
         userName.classList.remove("_empty");
       }

       if (!isValidEmail(userEmail.value)) {
         userEmail.classList.add("_empty");
       } else {
         userEmail.classList.remove("_empty");
       }  

       alertMsg.innerHTML =
      `<p class="alert__msg" >Заповніть обов'язкові поля<p/>`;
       alertMsg.classList.add("_show");
   }
 });