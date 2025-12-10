// ▼ 要素取得
const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const dateInput = document.getElementById("date");
const msgInput = document.getElementById("msg");

// ▼ エラー表示エリア
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorTel = document.getElementById("error-tel");
const errorDate = document.getElementById("error-date");
const errorMsg = document.getElementById("error-msg");


// ▼ submitイベント
form.addEventListener("submit", function (e) {
  e.preventDefault(); // 自動送信を防ぐ

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
  if (emailInput.value && !emailPattern.test(emailInput.value)) {
    showError(emailInput, errorEmail, "正しいメールアドレスを入力してください");
    isValid = false;
  }

  // --- ③ 電話番号チェック（10〜11桁の数字） ---
  const telPattern = /^[0-9]{10,11}$/;
  if (telInput.value && !telPattern.test(telInput.value)) {
    showError(telInput, errorTel, "電話番号は10〜11桁の数字で入力してください");
    isValid = false;
  }

  // --- ④ 問い合わせメッセージ（任意だが50文字以上なら注意） ---
  if (msgInput.value.length > 300) {
    showError(msgInput, errorMsg, "ご質問内容は300文字以内で入力してください");
    isValid = false;
  }

  // --- ⑤ 全てOKなら送信処理 ---
  if (isValid) {
    alert("送信が完了しました！ありがとうございます。");
    form.submit();
  }
});


// ▼ エラー表示関数
function showError(input, errorArea, message) {
  input.classList.add("input-error");
  errorArea.textContent = message;
}

// ▼ エラークリア関数
function clearErrors() {
  [nameInput, emailInput, telInput, dateInput, msgInput].forEach(input => {
    input.classList.remove("input-error");
  });

  [errorName, errorEmail, errorTel, errorDate, errorMsg].forEach(err => {
    err.textContent = "";
  });
}
