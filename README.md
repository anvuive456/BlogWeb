# Đồ án môn thực hành lập trình web

## Hướng dẫn cài đặt

1. Cài đặt node và npm: [https://nodejs.org/en]() (Yêu cầu node 20.5.0 trở lên)
2. Cài đặt posgresql: [https://www.postgresql.org/download]()
3. Mở source code và chạy lệnh để cài những dependencies
` npm install `
4. Thay đổi những thông số trong file .env để kết nối đến database:
* POSTGRES_URL,POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING: Đường dẫn kết nối tới database
* POSTGRES_USER: tên tài khoản người dùng postgre
* POSTGRES_HOST: host đang sử dụng postgre
* POSTGRES_PASSWORD: mật khẩu tài khoản postgre
* POSTGRES_DATABASE: tên database
5. Chạy lệnh để sinh các table: ` npx prisma migrate dev `
6. Chạy lệnh để sinh dữ liệu database: ` npx prisma seed`

## Hướng dẫn chạy
Chạy lệnh `npm run dev` để chạy source
