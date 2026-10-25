# Что делать в GitHub руками — пошагово

> **Язык этого файла — русский осознанно:** он написан для владельца репозитория, а не для агентов.
> Остальные документы в `docs/` — английские по конвенции `AGENTS.md`.
>
> Сайт: **https://vudirvp-sketch.github.io/** · Репозиторий: **https://github.com/vudirvp-sketch/vudirvp-sketch.github.io**
> Проверено 2026-10-26 после переезда с `/live-char-guide/`.

---

## 0. Что уже сделано и трогать НЕ надо

| Что | Состояние |
|---|---|
| Контент в HTML (пререндер), `canonical`, `og:*`, JSON-LD, `sitemap.xml`, `robots.txt` | ✅ работает, генерируется сборкой |
| Description + 20 topics репозитория | ✅ заполнены |
| Домен | ✅ корневой `vudirvp-sketch.github.io`, бесплатно, без покупки домена |
| Деплой | ✅ автодеплой на каждый push в `main` (workflow «Build and Deploy to GitHub Pages») |
| Старый адрес `/live-char-guide/` | ✅ редиректит на новый корень |

**Не редактируйте вручную** эти файлы — они перезаписываются сборкой:
`index.html` (корень), `build.hash`, `assets/`, `widgets/`, `interactions/`, `lib/`, `parts/`, `data/`, `dist/`.

---

## 1. Пять настроек, которые есть только в веб-интерфейсе GitHub

Всё ниже — **Settings** в правом верхнем углу репозитория (или вкладка настроек профиля). API для этого нет либо он не покрывает нужное.

### 1.1 Social preview (картинка при шеринге) — 1 минута

1. Откройте репозиторий → **Settings** → блок **General** → прокрутите до **Social preview**.
2. **Edit** → **Upload an image…**
3. Возьмите файл `src/assets/preview-card-1200x630.png` из репозитория (скачайте через кнопку **Download raw file** на странице файла).
4. **Save**.

Зачем: без этого в Telegram / Reddit / Habr ссылка разворачивается без картинки — падает кликабельность.

### 1.2 Discussions — включить

1. **Settings** → **General** → раздел **Features**.
2. Поставьте галочку **Discussions**.
3. Там же: **Wiki** — снимите галочку (пустая вики = дубль-поверхность, поисковики её индексируют как «тонкий» контент).

Зачем Discussions: вопросы вида «как сделать X в карточке» индексируются и приводят длинный хвост трафика. Цена — вам придётся иногда отвечать.

### 1.3 About: описание и топики (уже заполнено — как менять)

Блок **About** справа на главной странице репозитория → шестерёнка **⚙**.

- **Description** — одно-два предложения. Текущий текст уже с ключевыми словами; меняйте только если меняется суть.
- **Website** — должно остаться `https://vudirvp-sketch.github.io/`.
- **Topics** — до 20 штук, только латиница в нижнем регистре и дефисы. Текущие 20 подобраны по категориям (продукт / экосистема / ремесло / техника / язык).

### 1.4 Релизы — завести один на следующую веху

Релиз — это отдельная индексируемая страница на github.com (домен с огромным весом) и то, что читают changelog-агрегаторы. Сейчас релизов 0.

Через сайт: главная репозитория → **Releases** → **Draft a new release** → **Choose a tag** → впишите `v9.3.0` → **Create new tag on publish** → заголовок и описание по-русски + одна строка по-английски → **Publish release**.

Через терминал (если удобнее):

```bash
gh release create v9.3.0 --title "v9.3.0 — что нового" --notes-file notes.md --repo vudirvp-sketch/vudirvp-sketch.github.io
```

Не публикуйте задним числом 9 релизов — начните со следующей вехи.

### 1.5 Если сайт не обновился после пуша

1. Вкладка **Actions** → workflow **Build and Deploy to GitHub Pages** → смотрите последний запуск.
2. Красный — откройте лог, там будет конкретный гейт (validate / build / deploy).
3. **Settings** → **Pages**: **Source** должен быть **GitHub Actions** (не «Deploy from a branch»).
4. Если совсем ничего: **Actions** → нужный запуск → **Re-run all jobs**.

---

## 2. Регистрация в поисковых системах — один раз, дальше само

Это единственное, что нельзя сделать за вас: нужен вход в аккаунты. Порядок важен — начните с Яндекса.

### 2.1 Яндекс.Вебмастер (приоритет: аудитория русская)

1. Откройте <https://webmaster.yandex.ru/> → **Добавить сайт**.
2. Введите `https://vudirvp-sketch.github.io/` (именно корень, со слэшем в конце).
3. Способ подтверждения — **HTML-файл**: Яндекс даст файл вида `yandex_XXXXXXXXXXXXXXXX.html` и попросит положить его в корень сайта.
4. Положите этот файл в папку **`seo-verification/`** в репозитории (имя файла не меняйте!) и закоммитьте:

```bash
git add seo-verification/yandex_XXXXXXXXXXXXXXXX.html
git commit -m "seo: yandex webmaster verification file"
git push origin main
```

5. Через ~2 минуты после деплоя проверьте в браузере: `https://vudirvp-sketch.github.io/yandex_XXXXXXXXXXXXXXXX.html` — должна открыться страница с текстом подтверждения.
6. В Вебмастере нажмите **Проверить**.
7. После подтверждения: **Индексирование → Файлы Sitemap** → добавьте `https://vudirvp-sketch.github.io/sitemap.xml`.
8. Затем: **Индексирование → Переобход страниц** → добавьте `https://vudirvp-sketch.github.io/`.

Дальше смотрите **Индексирование → Страницы в поиске** — это главная метрика успеха.

### 2.2 Google Search Console

1. <https://search.google.com/search-console> → **Добавить ресурс** → **Префикс URL** (не «Домен»).
2. Введите `https://vudirvp-sketch.github.io/`.
3. Подтверждение → **HTML-файл** → файл вида `googleXXXXXXXXXXXXXXXX.html` → та же папка **`seo-verification/`** → коммит → пуш → **Проверить**.
4. После: **Файлы Sitemap** → `sitemap.xml`; **Проверка URL** → вставьте главную → **Запросить индексирование**.

### 2.3 Bing Webmaster Tools

1. <https://www.bing.com/webmasters> → войти.
2. Проще всего — **Import from Google Search Console** (если сайт уже добавлен в GSC). Иначе — тот же HTML-файл в `seo-verification/`.

### 2.4 IndexNow (опционально, ускоряет переобход)

Нужен ключ и одна правка workflow. Правка `.github/workflows/*.yml` — это стоп-условие в `AGENTS.md`, поэтому:

1. Сгенерируйте ключ: любая строка 8–128 символов (например, `openssl rand -hex 16`).
2. Создайте файл `<ключ>.txt` в папке **`seo-verification/`** — его содержимое должно совпадать с именем (без `.txt`).
3. Попросите добавить шаг в деплой-workflow (или сделайте это сами): после успешного деплоя вызвать
   `https://api.indexnow.org/indexnow?url=https://vudirvp-sketch.github.io/&key=<ключ>`.

---

## 3. Если понадобится откатить переезд

Переезд был: переименование репозитория + одна строка в конфиге. Откат — те же два шага назад:

1. **Settings** → **General** → **Repository name** → вернуть `live-char-guide` → **Rename**.
2. В файле `scripts/site-config.mjs` вернуть строку:
   ```js
   url: 'https://vudirvp-sketch.github.io/live-char-guide/',
   ```
3. `pnpm run build && pnpm run qa:seo && pnpm test`, затем коммит и пуш.
4. На сайте `qa:seo` сам проверит, что все абсолютные ссылки соответствуют новому адресу — если что-то забыли, гейт упадёт.

Всё остальное (README, бейджи, ссылки в документации) придётся обновить тем же поиском-заменой: `vudirvp-sketch/vudirvp-sketch.github.io` → `vudirvp-sketch/live-char-guide` и `https://vudirvp-sketch.github.io/` → `https://vudirvp-sketch.github.io/live-char-guide/`.

---

## 4. Чек-лист после любой ручной правки

```bash
pnpm run build        # пересобрать (пререндер + sitemap + футер)
pnpm run qa:seo       # canonical / og / JSON-LD / sitemap / robots
pnpm test             # 76 тестов
pnpm run validate     # артефакт сборки
git status --short    # в диффе должны быть только ваши файлы
```

Затем `git push origin main` → дождитесь зелёного **Actions** → откройте сайт и проверьте глазами.

---

## 5. Чего не делать

- Не включайте «Deploy from a branch» в **Settings → Pages** — сайт собирается workflow'ом, ветка отдаст неполную версию.
- Не редактируйте `dist/`, `parts/`, `index.html` в корне, `assets/` — сборка их перезапишет.
- Не покупайте ссылки и не постите один и тот же текст по каналам — для `github.io` это прямой путь к санкциям.
- Не публикуйте на Habr сгенерированный текст: правилами площадки это запрещено, и канал сгорит навсегда.
- Не меняйте `data/character_schema.json` и `data/anchor-redirects.json` без причины: первый связан с версией, второй — со всеми входящими `#якорями`.
