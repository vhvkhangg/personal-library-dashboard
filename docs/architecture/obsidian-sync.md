# Obsidian Sync Architecture

```txt
C:\Users\VU KHANG\OneDrive\IDEAVERSE
\-- .obsidian
|   \-- plugins
|   |   \-- custom-sort
|   |   |   \-- data.json
|   |   |   \-- main.js
|   |   |   +-- manifest.json
|   |   \-- obsidian-minimal-settings
|   |   |   \-- data.json
|   |   |   \-- main.js
|   |   |   +-- manifest.json
|   |   \-- table-editor-obsidian
|   |   |   \-- data.json
|   |   |   \-- main.js
|   |   |   \-- manifest.json
|   |   |   +-- styles.css
|   |   +-- waypoint
|   |       \-- main.js
|   |       \-- manifest.json
|   |       +-- styles.css
|   \-- snippets
|   |   +-- custom_font.css
|   \-- themes
|   |   +-- Minimal
|   |       \-- manifest.json
|   |       +-- theme.css
|   \-- app.json
|   \-- appearance.json
|   \-- bookmarks.json
|   \-- community-plugins.json
|   \-- core-plugins.json
|   \-- core-plugins-migration.json
|   +-- graph.json
\-- CORE
|   \-- Cảnh Giới
|   \-- Công Pháp
|   |   \-- Luyện Hồn
|   |   \-- Luyện Khí
|   |   +-- Luyện Thể
|   \-- Cốt Truyện
|   \-- Kỹ Năng
|   |   +-- ⚛️ HỆ THỐNG KỸ NĂNG.md
|   \-- Lãnh Địa
|   |   \-- ⚙️ Quản Lý
|   |   |   \-- Đảng
|   |   |   \-- Mặt Trận Tổ Quốc
|   |   |   \-- Quốc Hội
|   |   |   |   \-- Chính Phủ
|   |   |   |   |   \-- Các Bộ Chuyên Trách
|   |   |   |   |   \-- Cơ Quan (Ngang Bộ)
|   |   |   |   |   |   +-- 🏛️ Phủ Tổng Quản Nội Các
|   |   |   |   |   |       +-- 🏛️ HỆ THỐNG PHỦ TỔNG QUẢN NỘI CÁC.md
|   |   |   |   |   +-- HỆ THỐNG CHÍNH PHỦ.md
|   |   |   |   +-- Nhà Nước
|   |   |   +-- ⚙️ HỆ THỐNG QUẢN LÝ.md
|   |   \-- Anh Hùng
|   |   |   +-- 🧛‍♀️ Shalltear Bloodfallen.md
|   |   \-- Công Trình Kiến Trúc
|   |   |   \-- Bản Mệnh
|   |   |   |   +-- 💠 Lĩnh Chủ Chi Tâm.md
|   |   |   \-- Chiến Tranh
|   |   |   \-- Hạch Tâm
|   |   |   \-- Sản Xuất
|   |   |   \-- Tháp Phòng Vệ
|   |   |   +-- Tường Thành
|   |   \-- Quân Đội
|   |   |   +-- Quân Đoàn
|   |   \-- Sơ Đồ Lãnh Địa.canvas
|   |   +-- 🏰 LÃNH ĐỊA.md
|   \-- Nhân Vật Chính
|   |   \-- Chủng Tộc
|   |   |   +-- Chủng Tộc1.md
|   |   \-- Công Pháp
|   |   |   \-- Hô Hấp Pháp.md
|   |   |   \-- Luyện Hồn Pháp.md
|   |   |   \-- Luyện Khí Pháp.md
|   |   |   +-- Luyện Thể Pháp.md
|   |   \-- Huyết Mạch
|   |   |   +-- Huyết Mạch1.md
|   |   \-- Kiến Thức
|   |   \-- Kỹ Năng
|   |   |   \-- Hạch Tâm
|   |   |   |   \-- Nguyên Hoá Vạn Pháp.md
|   |   |   |   +-- Vạn Tượng Nguyên Hạch.md
|   |   |   \-- ⚛️ HỆ THỐNG KỸ NĂNG.md
|   |   |   +-- Bản Mệnh.md
|   |   \-- Nghề Nghiệp
|   |   |   \-- Bản Mệnh
|   |   |   |   +-- Vạn Tượng Giả.md
|   |   |   +-- Hạch Tâm
|   |   |       \-- Đấu Tuyệt Giả.md
|   |   |       \-- Huỷ Diệt Giả.md
|   |   |       \-- Mệnh Vận Giả.md
|   |   |       \-- Phòng Vệ Giả.md
|   |   |       \-- Sáng Tạo Giả.md
|   |   |       \-- Tai Ương Giả.md
|   |   |       \-- Thánh Tâm Giả.md
|   |   |       \-- Thống Ngự Giả.md
|   |   |       +-- Thông Tuệ Giả.md
|   |   \-- Thiên Phú
|   |   |   \-- Bản Mệnh.md
|   |   |   +-- Hạch Tâm.md
|   |   \-- Trang Bị
|   |   |   +-- Vạn Tượng Lập Phương.md
|   |   \-- Linh Căn.md
|   |   \-- Linh Tướng.md
|   |   \-- NHÂN VẬT CHÍNH.md
|   |   +-- Thể Chất.md
|   \-- Phản Diện
|   |   +-- Quái Vật
|   \-- Templates
|   \-- Thể Chất
|   \-- Thế Giới Quan & Thế Lực
|   \-- Vật Phẩm
|   |   +-- Quyển Trục
|   \-- Vũ Khí Trang Bị
|   |   \-- Trang Bị
|   |   +-- Vũ Khí
|   \-- 🐾 Sủng Thú
|   |   +-- 🐾 HỆ THỐNG SỦNG THÚ.md
|   \-- 📚 Thiết Lập
|   |   \-- Thuộc Tính
|   |   |   \-- Ẩn
|   |   |   \-- Đặc Biệt
|   |   |   |   \-- 🍀 Vận Khí.md
|   |   |   |   +-- 👑 Thống Soái.md
|   |   |   +-- Thường
|   |   |       \-- 🏹 Khéo Léo.md
|   |   |       \-- 💨 Nhanh Nhẹn.md
|   |   |       \-- 🔴 Sức Mạnh.md
|   |   |       \-- 🔵 Trí Tuệ.md
|   |   |       \-- 🟢 Thể Chất.md
|   |   |       +-- 🧠 Tinh Thần.md
|   |   +-- 📚 HỆ THỐNG THIẾT LẬP.md
|   +-- CORE.md
\-- Backend RAG Learning Notes.md
\-- Coding Style.md
\-- Common Patterns.md
\-- E T E R N I T Y.md
\-- GUIDE.md
\-- Hooks System.md
\-- Java Build Resolver.md
\-- Java Coding Standards.md
\-- Java Reviewer.md
\-- JPA Patterns.md
\-- Security Guidelines.md
\-- Sorting_Specification.md
\-- TEST.md
\-- Testing Requirements.md
+-- Yêu cầu của tôi.md
```
## Decision

The external Obsidian vault is the source of truth for Ideaverse content.

The app reads and writes Markdown files in the vault.

The database stores index/cache/search metadata.

## Why Not Put Vault in App Repo

The vault should stay outside the code repo because it is personal content, may become large, may contain private/NSFW content, and should not be accidentally committed.

## Config

Use environment variable:

```txt
OBSIDIAN_VAULT_PATH=D:/Obsidian/Ideaverse
```

Docker Compose should mount it into the relevant container as read/write:

```txt
/data/obsidian-vault
```

## File Model

Each indexed note should have:

```txt
id
vault_relative_path
title
type
tags
frontmatter jsonb
content_hash
last_indexed_at
last_modified_at
sync_status
```

## Frontmatter

Introduce frontmatter gradually.

Example:

```md
---
id: ideaverse-character-001
type: ideaverse.character
title: "Tên nhân vật"
status: draft
tags:
  - ideaverse
  - main-character
rating: 9.2
createdAt: 2026-04-29
updatedAt: 2026-04-29
---

# Tên nhân vật
```

## Editor UX

Use Markdown editor + preview split view.

Meaning:

- left or top pane: raw Markdown text
- right or bottom pane: rendered preview
- user can keep writing normal Markdown
- app shows the final rendered look

This is safer and simpler than a Notion-like WYSIWYG editor.

## Sync Modes

### MVP: Manual Sync

User clicks:

```txt
Sync Obsidian
```

App then:

1. scans vault files
2. parses frontmatter
3. extracts title/type/tags
4. computes content hash
5. updates database index

### Later: File Watcher

Automatically detect changed files.

Do not implement before manual sync is reliable.

## Conflict Policy

Never silently overwrite.

If the app opens a file and the file changes externally before save:

- detect changed hash
- show conflict warning
- let user choose:
  - reload from disk
  - overwrite
  - save copy

## RAG Integration

Ideaverse notes can be indexed for RAG.

RAG should store:

- vault path
- chunk source
- heading context
- modified time
- embedding version

```md id="h91cje"
## Vault Ignore Rules

The user's vault may contain Obsidian configuration, plugins, themes, snippets, and OneDrive-synced files.

Index by default:

- `*.md`

Ignore by default:

- `.obsidian/**`
- `.trash/**`
- plugin folders
- theme folders
- snippet folders
- temporary OneDrive files
- generated cache files

Handle later:

- `*.canvas`

Canvas files may be indexed as metadata later, but Markdown indexing is the MVP.
```