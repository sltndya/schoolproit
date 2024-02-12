 const URL_APP =     "https://script.google.com/macros/s/AKfycbwdY55F3kRBL8CKPOkqqmyC-QNiWsvkoTg305gpfBujY1LSjgJQLY4jo0pXXuJBI4ui/exec";

      // находим форму в документе
      const form = document.querySelector("#form");

      // указываем адрес отправки формы (нужно только в начале примера)
      form.action = URL_APP;

      // вспомогательная функция проверки заполненности формы
      function isFilled(details) {
        const { name, email, phone, rule } = details;
        if (!name) return false;
        if (!email) return false;
        if (!phone) return false;
        if (!rule) return false;
        return true;
      }

      // навешиваем обработчик на отправку формы
      form.addEventListener("submit", async () => {
        // отменяем действие по умолчанию

        // получаем ссылки на элементы формы
        const name = document.querySelector("[name=name]");
        const email = document.querySelector("[name=email]");
        const phone = document.querySelector("[name=phone]");
        const message = document.querySelector("[name=message]");
        const rule = document.querySelector("[name=rule]");

        // собираем данные из элементов формы
        let details = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          message: message.value.trim(),
          rule: rule.checked,
        };

        // если поля не заполнены - прекращаем обработку
        if (!isFilled(details)) return;

        // подготавливаем данные для отправки
        let formBody = [];
        for (let property in details) {
          // кодируем названия и значения параметров
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        // склеиваем параметры в одну строку
        formBody = formBody.join("&");

        // выполняем отправку данных в Google Apps
        const result = await fetch(URL_APP, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          //cors: "no-cors", <- это неправильно
          mode: "cors", //<- оставим по умолчанию
          body: formBody,
        })
          .then((res) => res.json())
          .catch((err) => alert("Ошибка!"))
          // .then((res) => console.log(res));
          
         if( result.type === 'success' ) {
            name.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
           alert('Спасибо за заявку!')
         }
         if( result.type === 'error' ) {            
           alert(`Ошибка( ${result.errors}`)
         }


      });

