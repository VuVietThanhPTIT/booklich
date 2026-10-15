# 🌸 Date Invitation Web App (Mobile-First)

Trang web mời hẹn hò tương tác lấy cảm hứng từ trào lưu Eazo / Instagram Reel, được tối ưu hoàn hảo cho màn hình cảm ứng điện thoại (Mobile-First).

---

## ✨ Tính Năng Nổi Bật

1. **Màn 1: Lời Mời & Nút "No" Siêu Né (Dodge & Bloom)**:
   - Nút `No` né tránh thông minh ngay khi ngón tay vừa chạm vào màn hình (`touchstart`/`pointerdown`).
   - Đếm số lần né (`1 dodge`, `2 dodges`, `4 dodges`...).
   - Bông hoa nghệ thuật SVG nở thêm cánh sau mỗi lần né.
   - Nút `YES` màu xanh mint to dần đều theo từng lần né.
   - Hiệu ứng âm thanh pop/chime dễ thương tự động tổng hợp (không cần tải file mp3).

2. **Màn 2: Ăn Mừng (Yay — it's a date!)**:
   - Pháo hoa giấy Confetti bung nở ngập tràn màn hình.
   - Hàng trái tim bay lượn trên nút bấm `Now let's plan it → 🗓️`.

3. **Màn 3: Lên Kế Hoạch Hẹn Hò (Pick day, time & plan)**:
   - Chọn ngày (chặn ngày quá khứ), chọn giờ hẹn.
   - Chọn nhanh các hoạt động (Ăn tối, Xem phim, Đồ uống, Cafe, Picnic, Khu vui chơi, Surprise me).
   - Ô ghi chú món ăn/yêu cầu đặc biệt.

4. **Màn 4: Vé Hẹn Hò (Official Date Ticket) & Gửi Thông Báo Ngầm**:
   - Tự động gửi thông tin chốt lịch về **Telegram Bot** của bạn ngay lập tức!
   - Hiển thị chiếc vé hẹn hò Boarding Pass sang xịn (có đường xé vé & mã vạch).
   - Nút **"Add to Google Calendar"** tự động tạo lịch sự kiện vào app Calendar của điện thoại.
   - Nút **"Share / Send"** sao chép hoặc chia sẻ vé hẹn hò.

---

## 🚀 Hướng Dẫn Chạy Thử Cục Bộ (Local Test)

Bạn có thể chạy thử trực tiếp bằng Python hoặc Node.js:

```bash
# Bằng Python (sẵn có trên máy):
python -m http.server 3000

# Hoặc bằng Node / npx:
npx serve .
```

Mở trình duyệt: `http://localhost:3000` (nhấn `F12` và bật chế độ **Toggle Device Toolbar** để trải nghiệm giao diện iPhone/Android).

---

## 🤖 Hướng Dẫn Cấu Hình Telegram Bot (Nhận Tin Nhắn Chốt Lịch)

Chỉ mất khoảng **1 phút** để tạo bot hoàn toàn miễn phí:

1. Mở app **Telegram**, tìm kiếm `@BotFather` và gõ lệnh: `/newbot`
2. Đặt tên cho bot và username (ví dụ: `MyDateBookingBot`).
3. BotFather sẽ gửi cho bạn một đoạn mã **Token** (dạng `123456789:ABCdefGhIJKlmNo...`).
4. Tìm kiếm bot `@userinfobot` trên Telegram và ấn `Start` để lấy **Id** của bạn (dạng số, ví dụ: `1234567890`).
5. **Kích hoạt bot**: Mở cuộc trò chuyện với con bot bạn vừa tạo ở bước 2 và bấm **Start** (để cho phép bot nhắn tin cho bạn).
6. Điền Token và Chat ID vào:
   - Cách 1 (Nếu dùng Vercel): Đặt Environment Variables `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID`.
   - Cách 2: Điền trực tiếp vào file `scripts/config.js` (dòng `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID`).

---

## 🌐 Hướng Dẫn Deploy Lên Vercel (Miễn Phí 100%)

### Cách 1: Deploy Bằng Vercel CLI (Nhanh nhất - 30 giây)
Mở terminal tại thư mục này và chạy:
```bash
npx vercel
```
- Làm theo hướng dẫn (chọn `Y`, giữ nguyên các thiết lập mặc định).
- Sau khi xong, bạn sẽ có ngay đường link dạng: `https://ten-du-an.vercel.app`!
- Để thêm Telegram Bot Token trên Vercel:
  Vào **Vercel Dashboard** ➔ Chọn Project ➔ **Settings** ➔ **Environment Variables**:
  - `TELEGRAM_BOT_TOKEN`: Token của bot
  - `TELEGRAM_CHAT_ID`: Chat ID của bạn
  Sau đó redeploy là xong.

### Cách 2: Đẩy Lên GitHub & Import vào Vercel
1. Đẩy thư mục này lên một repo GitHub cá nhân (Public hoặc Private đều được).
2. Truy cập [vercel.com](https://vercel.com) ➔ Bấm **Add New** ➔ **Project** ➔ Chọn repo GitHub vừa tạo.
3. Điền các biến môi trường (Environment Variables) ở mục cấu hình.
4. Bấm **Deploy**.
