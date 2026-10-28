const formTugas = document.getElementById("formTugas");

const namaTugas = document.getElementById("namaTugas");
const mataPelajaran = document.getElementById("mataPelajaran");
const tanggalTugas = document.getElementById("tanggalTugas");
const deskripsiTugas = document.getElementById("deskripsiTugas");
const cariTugas = document.getElementById("cariTugas");
const filterTugas = document.getElementById("filterTugas");
const urutTugas = document.getElementById("urutTugas");


const totalTugas = document.getElementById("totalTugas");
const tugasSelesai = document.getElementById("tugasSelesai");
const tugasBelum = document.getElementById("tugasBelum");


let daftarTugas = JSON.parse(
    localStorage.getItem("daftarTugas")
) || [];


// Menangani formulir saat tombol diklik
formTugas.addEventListener("submit", function (event) {
    event.preventDefault();

    const tugasBaru = {
        id: Date.now(),
        nama: namaTugas.value.trim(),
        mapel: mataPelajaran.value.trim(),
        tanggal: tanggalTugas.value,
        deskripsi: deskripsiTugas.value.trim(),
        selesai: false
    };

    if (!tugasBaru.nama || !tugasBaru.mapel || !tugasBaru.tanggal) {
        alert("Mohon lengkapi nama tugas, mata pelajaran, dan tanggal!");
        return;
    }

   daftarTugas.push(tugasBaru);

simpanTugas();
tampilkanTugas();
    formTugas.reset();
});

// Menampilkan daftar tugas
function tampilkanTugas() {
    let daftarContainer = document.getElementById("daftarTugas");

    if (!daftarContainer) {
        daftarContainer = document.createElement("section");
        daftarContainer.id = "daftarTugas";
        daftarContainer.className = "form-section";

        const container = document.querySelector(".container");
        container.appendChild(daftarContainer);
    }

    daftarContainer.innerHTML = `
        <div class="section-heading">
            <h2>Daftar Tugas Saya</h2>
            <p>Berikut tugas sekolah yang sudah kamu catat.</p>
        </div>
    `;

    if (daftarTugas.length === 0) {
        daftarContainer.innerHTML += "<p>Belum ada tugas. Yuk, tambahkan tugas baru!</p>";
    }

    
    const kataKunci = cariTugas.value.toLowerCase().trim();
    const statusFilter = filterTugas.value;

   
let tugasDitampilkan = daftarTugas.filter(function (tugas) {
    const cocokNama = tugas.nama.toLowerCase().includes(kataKunci);
    const cocokMapel = tugas.mapel.toLowerCase().includes(kataKunci);

    const cocokKataKunci = cocokNama || cocokMapel;

    const cocokStatus =
        statusFilter === "semua" ||
        (statusFilter === "selesai" && tugas.selesai) ||
        (statusFilter === "belum" && !tugas.selesai);

    return cocokKataKunci && cocokStatus;
});

if (urutTugas.value === "terbaru") {
    tugasDitampilkan.sort(function (a, b) {
        return new Date(a.tanggal) - new Date(b.tanggal);
    });
} else if (urutTugas.value === "terlama") {
    tugasDitampilkan.sort(function (a, b) {
        return new Date(b.tanggal) - new Date(a.tanggal);
    });
}


    tugasDitampilkan.forEach(function (tugas) {

        const kartu = document.createElement("div");
        kartu.className = "task-card";
        
if (tugas.selesai) {
    kartu.classList.add("task-selesai");
}


        const judul = document.createElement("h3");
        judul.textContent = tugas.nama;

        const mapel = document.createElement("p");
        mapel.textContent = "Mata Pelajaran: " + tugas.mapel;

        const tanggal = document.createElement("p");
        tanggal.textContent = "Batas Pengumpulan: " + tugas.tanggal;

        const deskripsi = document.createElement("p");
        deskripsi.textContent = tugas.deskripsi || "Tidak ada deskripsi.";

        const status = document.createElement("p");
        status.textContent = tugas.selesai ? "Status: Selesai" : "Status: Belum selesai";

        const tombolSelesai = document.createElement("button");
        tombolSelesai.textContent = tugas.selesai
            ? "Batalkan Selesai"
            : "Tandai Selesai";

        tombolSelesai.className = "btn-selesai";
        tombolSelesai.addEventListener("click", function () {
           tugas.selesai = !tugas.selesai;

simpanTugas();
tampilkanTugas();
        });

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.className = "btn-hapus";

        tombolHapus.addEventListener("click", function () {
           daftarTugas = daftarTugas.filter(function (item) {
    return item.id !== tugas.id;
});

simpanTugas();
tampilkanTugas();
        });

        kartu.append(judul, mapel, tanggal, deskripsi, status);
        kartu.append(tombolSelesai, tombolHapus);

        daftarContainer.appendChild(kartu);
    });

    // Memperbarui statistik
    totalTugas.textContent = daftarTugas.length;

    const jumlahSelesai = daftarTugas.filter(function (tugas) {
        return tugas.selesai;
    }).length;

    tugasSelesai.textContent = jumlahSelesai;
    tugasBelum.textContent = daftarTugas.length - jumlahSelesai;
}

function simpanTugas() {
    localStorage.setItem(
        "daftarTugas",
        JSON.stringify(daftarTugas)
    );
}

// Tampilkan tugas yang sudah tersimpan saat halaman dibuka
tampilkanTugas();

cariTugas.addEventListener("input", tampilkanTugas);
filterTugas.addEventListener("change", tampilkanTugas);
urutTugas.addEventListener("change", tampilkanTugas);

const daftarMotivasi = [
    {
        judul: "Langkah kecil, hasil besar!",
        isi: "Selesaikan satu tugas hari ini untuk mendekati tujuanmu."
    },
    {
        judul: "Kamu pasti bisa!",
        isi: "Jangan takut memulai. Kerjakan tugas sedikit demi sedikit."
    },
    {
        judul: "Progress over Perfection",
    isi: "Fokuslah mengatur waktumu, lalu rayakan sekecil apa pun kemajuan yang berhasil kamu buat."
    },
    {
        judul: "Semangat belajar!",
        isi: "Setiap hal yang kamu pelajari adalah langkah menuju masa depan."
    }
];

const motivasiAcak =
    daftarMotivasi[Math.floor(Math.random() * daftarMotivasi.length)];

document.getElementById("judulMotivasi").textContent =
    motivasiAcak.judul;

document.getElementById("isiMotivasi").textContent =
    motivasiAcak.isi;