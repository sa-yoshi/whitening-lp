// ==============================
// ▼ 要素取得
// ==============================
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

// ==============================
// ▼ 共通関数
// ==============================
function clearErrors() {
  const inputs = [nameInput, emailInput, telInput, dateInput, msgInput];
  const errors = [errorName, errorEmail, errorTel, errorDate, errorMsg];

  errors.forEach(err => err.textContent = "");
  inputs.forEach(input => {
    input.classList.remove("input-error");
  });
}

// ★ CSSに合わせた showError
function showError(input, errorEl, message) {
  errorEl.textContent = message;

  // ▼ 一度削除（再点滅させるため）
  input.classList.remove("input-error");

  // ▼ 強制リフロー（これがないと再アニメーションされない）
  void input.offsetWidth;

  // ▼ 再付与
  input.classList.add("input-error");
}

// ==============================
// ▼ submitイベント
// ==============================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();
  let isValid = true;

  // --- 必須チェック ---
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

  // --- メール形式 ---
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value && !emailPattern.test(emailInput.value)) {
    showError(emailInput, errorEmail, "正しいメールアドレスを入力してください");
    isValid = false;
  }

  // --- 電話番号 ---
  const telPattern = /^[0-9]{10,11}$/;
  if (telInput.value && !telPattern.test(telInput.value)) {
    showError(telInput, errorTel, "電話番号は10〜11桁の数字で入力してください");
    isValid = false;
  }

  // --- 日付（過去日） ---
  if (dateInput.value) {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      showError(dateInput, errorDate, "正しい日付を選択してください");
      isValid = false;
    } else if (selectedDate < today) {
      showError(dateInput, errorDate, "過去の日付は選択できません");
      isValid = false;
    }
  }

  // --- 文字数 ---
  if (msgInput.value.length > 300) {
    showError(msgInput, errorMsg, "300文字以内で入力してください");
    isValid = false;
  }

  // --- OK ---
  if (isValid) {
    const params = new URLSearchParams({
      name: nameInput.value,
      email: emailInput.value,
      tel: telInput.value,
      date: dateInput.value,
      message: msgInput.value
    });

    fetch(
      "https://script.google.com/macros/s/AKfycbxpfyNQb7OI2CjhnQXqt423BUPm3KCIP284slz6Yz3yytdN0VsaTDtGsLdzPn9wIaesYQ/exec",
      {
        method: "POST",
        body: params
      }
    )
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
      .catch(() => {
        // 通信エラー・セキュリティソフト等
        alert(
          "送信に失敗しました。\n" +
          "お手数ですが、お電話またはメールでご連絡ください。"
        );
      });
  }
});
