# AI Flow - Platform Pembuatan Model AI

AI Flow adalah platform yang memungkinkan pengguna untuk membuat, melatih, dan mengelola model AI khususnya untuk analisis sentimen melalui antarmuka yang mudah digunakan.

## Fitur Utama

- 🤖 **Pembuatan Model AI**
  - Form yang user-friendly untuk membuat model baru
  - Upload dataset dalam format CSV
  - Konfigurasi model melalui prompt
  - Monitoring proses training secara real-time

- 📊 **Manajemen Model**
  - Daftar semua model dengan status (completed, pending, failed)
  - Filter model berdasarkan status
  - Detail konfigurasi untuk setiap model
  - Download model yang sudah selesai training

- 🔮 **Prediksi Sentimen**
  - Interface untuk testing model
  - Support multiple input text
  - Visualisasi hasil prediksi dengan progress bar
  - Tingkat kepercayaan (confidence level) untuk setiap prediksi

- 📈 **Monitoring**
  - Log detail untuk setiap model
  - Timeline proses training
  - Metrik evaluasi model
  - Status training real-time

## Teknologi yang Digunakan

### Frontend
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Hooks
- Client-side & Server-side Rendering

### Backend
- FastAPI
- PostgreSQL
- MLflow
- Scikit-learn
- Redis & Celery
- Joblib

## Cara Menjalankan Aplikasi

1. Clone repository
```bash
git clone [repository-url]
cd ai-flow
```

2. Install dependencies
```bash
npm install
# atau
yarn install
```

3. Jalankan development server
```bash
npm run dev
# atau
yarn dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser


## API Endpoints

- `POST /api/v1/models/` - Membuat model baru
- `GET /api/v1/models/list` - Mendapatkan daftar model
- `GET /api/v1/models/active` - Mendapatkan model yang sedang aktif
- `GET /api/v1/models/monitoring/summary` - Mendapatkan ringkasan monitoring
- `GET /api/v1/models/{id}/logs` - Mendapatkan log model
- `POST /api/v1/models/{id}/predict` - Melakukan prediksi
- `GET /api/v1/models/{id}/download` - Download model

## Penggunaan

1. **Membuat Model Baru**
   - Klik tombol "Buat Model Baru"
   - Isi form dengan nama, deskripsi, dan prompt
   - Upload dataset CSV
   - Submit dan tunggu proses training

2. **Monitoring Model**
   - Lihat daftar model di halaman utama
   - Klik "Lihat Log" untuk detail training
   - Monitor status dan progress training

3. **Testing Model**
   - Pilih model yang sudah selesai training
   - Klik "Coba Model"
   - Masukkan teks yang ingin dianalisis
   - Lihat hasil prediksi sentimen

## Kontribusi

Silakan berkontribusi dengan membuat pull request atau melaporkan issues.

## Lisensi

[Sesuaikan dengan lisensi yang digunakan]