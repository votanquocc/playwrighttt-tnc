## 📦 Đường dẫn tương đối trong TypeScript

- 📄 `./` → **Cùng thư mục**
- 📁 `../` → **Lùi lên 1 cấp thư mục**
- 📂 `../../` → **Lùi lên 2 cấp thư mục**

---

## 🔧 Giải thích về Fixture

Fixture là cơ chế quản lý tài nguyên giữa các test, có thể là:

- **Browser**
- **Page**
- **Context**
- **Đối tượng tùy chỉnh** như `LoginPage`, `APIClient`, v.v.

Tương tự như `@BeforeMethod` và `@BeforeClass` trong **TestNG**, nhưng **mạnh mẽ và linh hoạt hơn**.

### ✨ Chức năng chính của Fixture:

- ♻️ **Tái sử dụng** tài nguyên giữa các test
- 🔄 **Quản lý vòng đời** của đối tượng test
- 💉 **Inject trực tiếp** vào test thông qua tham số
- 🧩 **Tổ chức test tốt hơn**, dễ bảo trì

### 📌 Khi nào nên dùng Fixture?

- Dùng lại các Page Object như `LoginPage`, `DashboardPage`
- Setup dữ liệu test qua API hoặc Database
- Chia test theo module lớn để dễ quản lý

> ⚠️ **Lưu ý quan trọng**: Fixture nên dùng để quản lý tài nguyên **tĩnh**, không thay đổi theo điều kiện, và có thể **dự đoán được**.

---

🧠 Lý thuyết về use trong Playwright

Trong Playwright Test, **use** là nơi bạn cấu hình môi trường mặc định cho các bài kiểm thử.Nó cho phép bạn thiết lập các **Giá trị mặc định** cho các fixture — tức là **Các biến được inject** vào test như page, browser, context, v.v.

## 🔍 Mục đích của `use`

- **Thiết lập môi trường test mặc định**: như trình duyệt, kích thước màn hình, `baseURL`, chế độ `headless`, v.v.
- **Tùy chỉnh hành vi test**: như chụp ảnh màn hình khi lỗi, quay video, bật trace để debug.
- **Ghi đè cấu hình theo từng test hoặc từng project**: giúp chạy test trên nhiều môi trường khác nhau.

---

## 🧩 Các fixture mặc định có thể cấu hình qua `use`

| Tên fixture    | Kiểu dữ liệu / Giá trị hợp lệ         |
| --------------- | -------------------------------------------- |
| `browserName` | `'chromium'`, `'firefox'`, `'webkit'`  |
| `headless`    | `true` hoặc `false`                     |
| `viewport`    | `{ width: number, height: number }`        |
| `baseURL`     | `string`                                   |
| `screenshot`  | `'on'`, `'only-on-failure'`, `'off'`   |
| `video`       | `'on'`, `'retain-on-failure'`, `'off'` |
| `trace`       | `'on'`, `'retain-on-failure'`, `'off'` |

---

## 🧠 Quy tắc đặt tên trong dự án

### 📁 Folder (Thư mục)

- **Quy tắc:** `kebab-case`
- **Mô tả:** Viết thường toàn bộ, nối bằng dấu gạch ngang `-`

### 🧱 Class (Lớp)

- **Quy tắc:** `PascalCase`
- **Mô tả:** Viết hoa chữ cái đầu mỗi từ

### 🧮 Variable (Biến)

- **Quy tắc:** `camelCase`
- **Mô tả:** Viết thường những danh từ phụ, viết hoa danh từ chính

### 🔒 Global Variable or Constant Variable (Biến toàn cục hoặc hằng số)

- **Quy tắc:** `UPPER_CASE`
- **Mô tả:** Viết Viết hoa toàn bộ và nối bằng dấu gạch chân

### 🧪 Simulation variable or used in testing/mocking (Biến giả lập hoặc dùng trong test/mock)

- **Quy tắc:** `_mockUser`
- **Mô tả:** Dấu chân đầu tiên và viết hoa danh từ chính

### 🔁 Mapping variables from the backend or used in the backend (Biến ánh xạ từ backend hoặc dùng ở backend)

- **Quy tắc:** `snake_case`
- **Mô tả:** Viết thường toàn bộ và nối bằng dấu gạch chân
