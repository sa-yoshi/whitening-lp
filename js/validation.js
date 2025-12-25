// ▼ 要素取得
const form = document.getElementById("contactForm");

const nameInput  = document.getElementById("name");
const emailInput = document.getElementById("email");
const telInput   = document.getElementById("tel");
const dateInput  = document.getElementById("date");
const msgInput   = document.getElementById("msg");

// ▼ エラー表示エリア
const errorName  = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorTel   = document.getElementById("error-tel");
const errorDate  = document.getElementById("error-date");
const errorMsg   = document.getElementById("error-msg");

function clearErrors() {
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorTel.textContent = "";
  errorDate.textContent = "";
  errorMsg.textContent = "";
}

// ▼ submitイベント
form.addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();
  let isValid = true;

  // --- ① 必須チェック ---
  if (nameInput.value.trim() === "") {
    showError(nameInput, errorName, "お名前を入力してください");
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, errorEmail, "メールアドレスを入力してください");
    isValid = false;
  }

  if (telInput.value.trim() === "") {
    showError(telInput, errorTel, "電話番号を入力してください");
    isValid = false;
  }

  if (dateInput.value.trim() === "") {
    showError(dateInput, errorDate, "ご予約日を選択してください");
    isValid = false;
  }

  // --- ② メール形式チェック ---
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() !== "" && !emailPattern.test(emailInput.value)) {
    showError(emailInput, errorEmail, "正しいメールアドレスを入力してください");
    isValid = false;
  }

  // --- ③ 電話番号チェック ---
  const telPattern = /^[0-9]{10,11}$/;
  if (telInput.value.trim() !== "" && !telPattern.test(telInput.value)) {
    showError(telInput, errorTel, "電話番号は10〜11桁の数字で入力してください");
    isValid = false;
  }

  // --- ④ メッセージ文字数 ---
  if (msgInput.value.length > 300) {
    showError(msgInput, errorMsg, "ご質問内容は300文字以内で入力してください");
    isValid = false;
  }

  // --- ⑤ 全てOKなら送信 ---
  if (isValid) {
    const params = new URLSearchParams({
      name: nameInput.value,
      email: emailInput.value,
      tel: telInput.value,
      date: dateInput.value,
      message: msgInput.value
    });
  
    fetch("https://script.google.com/macros/s/AKfycbxpfyNQb7OI2CjhnQXqt423BUPm3KCIP284slz6Yz3yytdN0VsaTDtGsLdzPn9wIaesYQ/exec", {
      method: "POST",
      body: params
    })
    .then(res => res.text())
    .then(text => {
       console.log("GAS response:", text);

       if (text === "success") {
         alert("送信完了しました");
         form.reset();
       } else {
       alert(
         "送信に失敗しました。\n" +
         "時間をおいて再度お試しください。"
         );
       }
    })
  }
})
.catch(() => {
  // 通信エラー・セキュリティソフト等でブロックされた場合
  alert(
    "送信に失敗しました。\n" +
    "お手数ですが、お電話またはメールでご連絡ください。"
  );
}); // ← ★これが必須！
