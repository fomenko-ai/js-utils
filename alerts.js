function customAlert(message, options = {}) {
  const alertMessage = document.getElementById('alert-message')
  if (options.isHTML) {
    alertMessage.innerHTML = message;
  } else {
    alertMessage.innerText = message;
  }
  document.getElementById('custom-alert').style.display = 'block';
  document.getElementById('custom-alert-overlay').style.display = 'block';
}

function closeAlert() {
  document.getElementById('custom-alert').style.display = 'none';
  document.getElementById('custom-alert-overlay').style.display = 'none';
}

function statusAlert(status) {
  if (status === "200") {
    customAlert('Успешно!');
  } else if (["404", "408"].includes(status)){
    return;
  } else if (status === "403") {
    customAlert(
      'Извинения принимаются <a href="https://dront.ru/campaign/42pravo">вот здесь</a>.',
      { isHTML: true }
    );
  } else if (status === "404") {
    customAlert('Не найдено!');
  } else if (status === "422") {
    customAlert('Ошибка! Проверьте введенные значения.');
  } else if (status === "429") {
    customAlert('Слишком много запросов...\nОтдохните пару часов.');
  } else if (status === "500") {
    customAlert(
      'Ошибка на сервере! Попробуйте через 1 час. При повторном возникновении ошибки, напишите нам <a href="mailto:42pravo@gmail.com">42pravo@gmail.com</a>.',
      { isHTML: true }
    );
  } else {
    customAlert('Ошибка! Попробуйте через 10 минут.');
  }
}
