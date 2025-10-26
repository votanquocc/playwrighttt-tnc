# 📁 Project/

│
├── 🧪 tests/                          # Các file test chính
│   ├── 📄 login.test.ts
│   └── 📄 dashboard.test.ts
│
├── 📦 src/                            # Mã nguồn chính
│   │
│   ├── 📘 pages/                      # Các Page Object
│   │   ├── 📄 LoginPage.ts
│   │   └── 📄 DashboardPage.ts
│   │
│   ├── 📊 data/                       # Dữ liệu test (user, config, v.v.)
│   │   └── 📄 users.ts
│   │
│   └── 🧩 model/                      # Các model (định nghĩa cấu trúc dữ liệu)
│       └── 📄 UserModel.ts
│
├── 🔁 mappers/                        # Mapper ánh xạ dữ liệu giữa các tầng
│   └── 📄 userMapper.ts
│
├── 👂 listener/                       # Listener (log, sự kiện test, lifecycle)
│   └── 📄 testListener.ts
│
├── 🛠️ utils/                          # Hàm tiện ích (helper, logger, v.v.)
│   └── 📄 wait.ts
│
├── 🔧 fixtures/                       # Tùy chỉnh fixture (quản lý tài nguyên giữa các test)
│   └── 📄 custom-fixtures.ts
│
└── ⚙️ playwright.config.ts            # Cấu hình toàn cục
