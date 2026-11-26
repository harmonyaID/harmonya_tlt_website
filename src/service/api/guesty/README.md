# Guesty — Alur Booking & Payment

Dokumentasi alur **cek harga (quote) → booking (reservation) → bayar (payment)**
menggunakan Guesty Open API di website The Lembongan Traveller.

- Docs Guesty Open API : https://open-api-docs.guesty.com/reference
- Docs GuestyPay SDK   : https://github.com/guestyorg/tokenization-js/wiki/v3-Integration

---

## 1. Ringkasan

| Tahap | Halaman | Apa yang terjadi |
|---|---|---|
| 1. Quote | Property detail / Property variant detail | Tamu pilih property, tanggal, jumlah tamu → klik **Check Availability** → Guesty membuat **quote** (cek ketersediaan + harga) |
| 2. Book Now | Property detail / variant | Quote disimpan ke `sessionStorage` → pindah ke halaman `/payment` |
| 3. Payment | `/payment` | Tamu isi data diri + pilih metode bayar (**Credit Card** / **Bank Transfer**) |
| 4. Selesai | `/success/guesty` | Menampilkan hasil (confirmation code, tanggal, total, status) |

**Quote** = penawaran harga sementara (berlaku ±24 jam, sekali pakai). Belum ada booking.
**Reservation** = booking di Guesty, dibuat dari quote.
**Payment** = penagihan kartu untuk reservation tersebut.

---

## 2. Dari mana ke mana (arsitektur request)

### 2.1 Kenapa tidak langsung ke `https://open-api.guesty.com` dari browser?

Guesty Open API **tidak mengizinkan CORS** dari browser.

```
Browser ──OPTIONS (preflight, tanpa token)──▶ open-api.guesty.com
        ◀── 401 Unauthorized, TANPA header Access-Control-Allow-Origin
Browser membatalkan POST  →  error CORS
```

- Sebelum `POST` dengan header `Authorization` + `Content-Type: application/json`,
  browser selalu mengirim **preflight `OPTIONS`** — dan preflight **tidak membawa token**.
- Guesty menjawab `401` tanpa header CORS → browser memblokir request asli.
- Ciri di DevTools → Network: **"Provisional headers are shown"** dan **Response headers (0)**.
- **Postman berhasil** karena Postman bukan browser → tidak ada aturan CORS / preflight.

### 2.2 Solusi: rewrite Next.js `/guesty-open-api`

Di `next.config.ts`:

```ts
async rewrites() {
    return [
        {
            source: '/guesty-open-api/:path*',
            destination: 'https://open-api.guesty.com/:path*',
        },
    ]
}
```

Alur request sekarang:

```
Browser (localhost:6800 / domain website)
   │  POST /guesty-open-api/v1/quotes
   │  Authorization: Bearer <token>          ← token dinamis
   │  Content-Type : application/json
   ▼
Server Next.js (domain yang sama → bukan cross-origin → TIDAK ada CORS)
   │  diteruskan apa adanya (header + body)
   ▼
https://open-api.guesty.com/v1/quotes      ← server ke server, tidak ada CORS
```

### 2.3 Token (Authorization: Bearer Token)

Sama seperti Postman → tab **Authorization** → Auth type **Bearer Token** → Token `{{access_token}}`.
Postman (dan kode ini) mengirim header: `Authorization: Bearer <access_token>`.

> Kata `Token` **tidak** ikut dikirim. `Authorization: Bearer Token <token>` → ditolak Guesty (403).

Asal token:

```
getToken()  (_guestyConfigAPI.ts)
  1. cek cookie COOKIE_TOKEN_GUESTY → masih berlaku (> 5 menit sebelum exp)? pakai
  2. jika tidak → GET {NEXT_PUBLIC_CRM_BASE_API}/guesty/token → result.accessToken
  3. simpan ke cookie (expired mengikuti klaim `exp` JWT)
```

Config dinamis ada di `server/_guestyServerV2ConfigAPI.ts`:

```ts
export const GUESTY_AUTH_CONFIG = {
    authType: 'Bearer Token', // 'Bearer Token' | 'No Auth'
    getToken,                 // diambil ulang setiap request
}
```

Setiap request (`guestyDirectGet` / `guestyDirectPost`):
- `Authorization: Bearer <token>` (request dibatalkan bila token kosong)
- `Content-Type: application/json`, `Accept: application/json`
- response `401` → cookie token dihapus → request berikutnya ambil token baru

---

## 3. File di folder ini

| File | Fungsi | Status |
|---|---|---|
| `_guestyConfigAPI.ts` | axios langsung ke `https://open-api.guesty.com` + `getToken()` / `clearCookie()` (token dari CRM, cache cookie) | dipakai (`getToken` juga dipakai config V2) |
| `guesty.api.ts` | listings, calendar, quote, guest, reservation (via `_guestyConfigAPI`) | dipakai fitur lain (mis. `getDetailListingGuesty`) |
| `guestyv2.api.ts` | listings, calendar, quote Bookeasy (via `_guestyConfigAPI`) | dipakai accommodation, availability calendar, Bookeasy |
| `_guestyPaymentConfigAPI.ts` | axios langsung ke `https://open-api.guesty.com/v1` | **belum dipakai alur payment** (langsung dari browser → kena CORS) |
| `guestyPayment.api.ts` | `/payment-methods`, `/payments`, `/payments/{id}/pay` | **belum dipakai alur payment** (lihat bagian 7) |
| `server/_guestyServerV2ConfigAPI.ts` | **config yang dipakai alur booking & payment** → `guestyDirectGet/Post` (Bearer Token dinamis via `/guesty-open-api`) | dipakai |
| `server/guestyServerV2.api.ts` | fungsi quote, guest, reservation, payment (akhiran `ServerV2`) | dipakai |
| `server/_guestyServerV2.config.ts` | request Guesty dari server (dipakai route `/api/v2/guesty`) | hanya untuk fungsi listing V2 |

Di luar folder ini:

| File | Fungsi |
|---|---|
| `next.config.ts` → `rewrites()` | `/guesty-open-api/*` → `https://open-api.guesty.com/*` |
| `src/app/api/v2/guesty/[...path]/route.ts` | proxy server dengan whitelist (dipakai `getListing/getDetailListing/getCalendar...ServerV2`) |
| `src/helper/guestyBooking.helper.ts` | `parseQuote`, `saveBooking`, `clearBooking`, `isQuoteExpired`, `saveBookingResult`, `loadBookingResult` |
| `src/page/propertyVariant/hook/usePropertyVariantBooking.hook.ts` | logic Check Availability (quote) & Book Now |
| `src/page/payment/hook/usePaymentBook.ts` | logic halaman payment |
| `src/page/payment/component/GuestyBookingConfirmation.tsx` | tampilan halaman `/success/guesty` |

---

## 4. Tahap 1 — Quote (Check Availability)

Hook: `usePropertyVariantBooking.hook.ts`
Fungsi: `addQuoteGuestyServerV2` (`server/guestyServerV2.api.ts`)

```
POST /guesty-open-api/v1/quotes   →   https://open-api.guesty.com/v1/quotes
Authorization: Bearer <token>
Content-Type: application/json

{
  "listingId": "<guestyId listing / variant>",
  "checkInDateLocalized": "YYYY-MM-DD",
  "checkOutDateLocalized": "YYYY-MM-DD",
  "guestsCount": 2,
  "source": "Website",      ← selalu statik "Website"
  "couponCode": ""
}
```

Alur:
1. **Property detail**: tamu wajib pilih property (variant) dulu. **Variant detail**: listing langsung dari `guestyId`.
2. Validasi: property dipilih, tanggal & tamu terisi, jumlah tamu ≤ kapasitas.
3. Kirim quote → response `201`, `status: "valid"`.
4. `parseQuote()` membaca harga dari `rates.ratePlans[]` (plan pertama yang berlaku):
   total = `subTotalPrice + totalTaxes`.
5. Preview harga ditampilkan. Klik **Book Now** → `saveBooking()` ke `sessionStorage`
   (`BOOKING_STORAGE_KEY`) → `router.push('/payment')`.

---

## 5. Tahap 2 — Halaman Payment

Hook: `usePaymentBook.ts`. Booking dibaca dari `sessionStorage`.
Jika quote sudah lewat `expiresAt` → tampil pesan expired (harus cari tanggal lagi).

Saat halaman dibuka:

```
GET /guesty-open-api/v1/listings/{listingId}?fields=paymentProviderId paymentProvider
```

- Guesty mengembalikan `paymentProvider._id` → disalin ke `paymentProviderId`
  (`getPaymentProviderListingGuestyServerV2`).
- `paymentProviderId` dipakai untuk menampilkan **form kartu GuestyPay** (iframe dari
  `https://pay.guesty.com/tokenization/v3/init.js`). Data kartu **tidak lewat kode kita** (PCI).

### 5.1 Pilihan: Bank Transfer → **hanya booking, TIDAK ada pembayaran online**

Guesty tidak punya API untuk menerima transfer bank. Uang dibayar di luar website.

```
1. GET  /v1/quotes/{quoteId}               ambil ulang quote (harga terbaru)
2. POST /v1/guests-crud                    buat / pakai guest (nama, email, phone)
3. POST /v1/reservations-v3/quote          status "reserved", reservedUntil: 48 (jam)
4. → /success/guesty  (status: reserved)
```

- Tanggal **ditahan 48 jam**. Tim mengirim instruksi transfer ke tamu, lalu menandai lunas
  / confirm di dashboard Guesty.
- Jika tidak dibayar/di-confirm dalam 48 jam → Guesty melepas reservasi.
- Tombol: **"Book Now"**.

### 5.2 Pilihan: Credit Card → **booking + bayar**

Tombol: **"Pay A$xxx"** (aktif setelah form kartu valid).

```
1. GET  /v1/quotes/{quoteId}               ambil ulang quote, harga terbaru → amount
2. SDK  guestyTokenization.submit(...)     verifikasi kartu + 3DS (di iframe GuestyPay)
                                           → cardToken (_id)
3. POST /v1/guests-crud                    → guestId
4. POST /v1/reservations-v3/quote          status "confirmed" → reservationId, confirmationCode
5. POST /v1/payment-methods                simpan kartu ke guest/reservasi
     { guestId, paymentProviderId, confirmationCode, _id: cardToken, reuse: false }
     → paymentMethodId (status harus "ACTIVE")
6. POST /v1/payments                       CHARGE kartu (tanpa shouldBePaidAt = langsung)
     { reservationId, paymentMethodId, amount, note: "Website booking" }
     (503 "not ready" → retry otomatis 1s, 2s, 4s)
7. hasil payment.status:
     SUCCEEDED                 → /success/guesty (status: paid)
     PENDING_AUTH              → buka authenticationUrl (3DS bank) di tab baru
                                 → /success/guesty (status: pending_auth)
     PENDING / PROCESSING      → /success/guesty (status: processing)
     FAILED / ERROR / CANCELLED→ tetap di /payment, pesan error,
                                 tamu bisa coba kartu lain (reservasi TIDAK dibuat ulang)
```

Semua request di atas melalui `/guesty-open-api/...` dengan `Authorization: Bearer <token>`.

### 5.3 Retry kartu lain

Jika reservasi sudah dibuat tapi kartu gagal (langkah 5–7), `reservationId` &
`confirmationCode` disimpan di state (`pendingReservation`). Submit berikutnya
**melewati pembuatan reservasi** dan langsung menyimpan kartu baru + charge.
Tombol berubah menjadi **"Try Payment Again"**.

---

## 6. Tahap 3 — Halaman `/success/guesty`

- Hasil disimpan dengan `saveBookingResult()` sebelum redirect, lalu `clearBooking()`.
- Halaman membaca `loadBookingResult()` dan menampilkan: confirmation code, nama property,
  tanggal, total, dan pesan sesuai status:

| status | Arti |
|---|---|
| `paid` | Kartu berhasil di-charge |
| `reserved` | Bank transfer — ditahan 48 jam, belum dibayar |
| `pending_auth` | Bank minta verifikasi 3DS tambahan |
| `processing` | Pembayaran sedang diproses Guesty |

---

## 7. Kenapa `guestyPayment.api.ts` belum dipakai?

Endpoint-nya **sama persis** dengan versi `ServerV2`. Bedanya hanya config:

| | `guestyPayment.api.ts` | `server/guestyServerV2.api.ts` (dipakai) |
|---|---|---|
| Endpoint | `/payment-methods`, `/payments`, `/payments/{id}/pay` | sama |
| Config | `_guestyPaymentConfigAPI.ts` → langsung `https://open-api.guesty.com/v1` dari browser | `guestyDirect` → `/guesty-open-api` (rewrite) |
| Di browser | **kena CORS** | aman |

Agar `guestyPayment.api.ts` bisa dipakai: ganti `baseURL` di `_guestyPaymentConfigAPI.ts`
menjadi `/guesty-open-api/v1` (Bearer Token dinamis + `Content-Type: application/json`),
lalu import fungsi payment di `usePaymentBook.ts` dari `guestyPayment.api.ts`.

---

## 8. Troubleshooting — kalau error, kenapa?

| Gejala | Penyebab | Solusi |
|---|---|---|
| Error **CORS**, Network: "Provisional headers are shown", Response headers (0) | Request langsung dari browser ke `open-api.guesty.com` | Pakai config `guestyDirect` (`/guesty-open-api`), bukan `_guestyConfigAPI` / `_guestyPaymentConfigAPI` |
| `404` di `/guesty-open-api/...` | Rewrite belum aktif | Restart `npm run dev` setelah ubah `next.config.ts` |
| Header hanya `Authorization: Bearer` (tanpa token) | `getToken()` gagal / CRM `/guesty/token` tidak mengembalikan `accessToken` | Cek endpoint CRM token; sekarang request dibatalkan ("Token Guesty kosong") |
| `401 Unauthorized` | Token expired / dicabut | Otomatis: cookie dihapus, request berikutnya ambil token baru. Jika terus terjadi → cek token di CRM |
| `403 Forbidden` | Format header salah (mis. `Bearer Token <token>`) atau token tanpa akses | Header harus `Authorization: Bearer <token>` |
| `400` saat quote (`listingId must be a mongodb id`, `guestsCount must not be less than 1`, dst.) | Body tidak lengkap / salah | Pastikan property dipilih, tanggal & tamu terisi |
| "These dates are not available for booking." | Quote tidak punya rate plan yang berlaku (tanggal penuh / minimum stay / dll.) | Coba tanggal lain |
| "Your price quote has expired…" | Quote lewat `expiresAt` (±24 jam) | Cari tanggal lagi di halaman property |
| "Online card payment is not available for this property…" | Listing tidak punya payment provider aktif di Guesty | Aktifkan GuestyPay di listing, atau pakai Bank Transfer |
| Form kartu tidak muncul | `paymentProviderId` kosong / script `pay.guesty.com` gagal dimuat | Cek payment provider listing & koneksi ke `pay.guesty.com` |
| "Please complete your card details." | Form kartu belum valid | Lengkapi nomor kartu, expiry, CVC |
| "Card could not be verified." | Tokenisasi / 3DS di SDK gagal | Coba kartu lain |
| "Reservation created, but online payment could not be started…" | Reservation tidak mengembalikan `confirmationCode` (wajib untuk `/payment-methods`) | Reservasi sudah ada di Guesty → tim proses manual |
| "Your card could not be saved…" | `/payment-methods` gagal / status bukan `ACTIVE` | Coba kartu lain (reservasi tidak dibuat ulang) |
| "Your card was declined…" / "Payment failed…" | `/payments` → `FAILED` / `ERROR` / `CANCELLED` | Coba kartu lain |
| `503` saat `/payments` | Reservasi belum siap dibayar | Otomatis retry 1s, 2s, 4s |

Cara cek: DevTools → **Network** → filter `guesty-open-api` → lihat **Request Headers**
(`Authorization`, `Content-Type`) dan tab **Response** (pesan error dari Guesty
ada di `error.message` / `message`).

---

## 9. Catatan penting

- **Tes = data sungguhan.** Setiap Book Now membuat reservasi nyata di Guesty
  (mis. bank transfer → `reserved` 48 jam). Batalkan reservasi tes di dashboard Guesty.
- **Credit card** belum diuji sampai charge — gunakan kartu tes **sandbox GuestyPay**.
- **Token terlihat di browser** (Network → `Authorization`) dan berpermission admin.
  Rewrite hanya mengatasi CORS, tidak menyembunyikan token. Agar aman, header
  `Authorization` harus dipasang di server.
- **Harga dihitung di browser** (`parseQuote`), lalu dikirim sebagai `amount` ke `/payments`.
- **Auto-payment Guesty**: jika aturan auto-payment aktif di Guesty, pastikan tidak terjadi
  charge ganda dengan charge dari website.
- `specialRequest` di form payment belum dikirim ke Guesty.
