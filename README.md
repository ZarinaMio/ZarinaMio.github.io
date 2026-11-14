# ZarinaMio.github.io — локальный клон

Это git-клон репозитория <https://github.com/ZarinaMio/ZarinaMio.github.io>
(ветка `main`, upstream `origin/main`). Рабочая папка целиком является клоном.

Права на тексты, фото и видео принадлежат автору — Анастасии Зарубиной.

## Структура

```
index.html                 — единственная страница сайта
styles.css                 — стили
main.js                    — раскрытие проектов и переходы по якорям (#ozemy и т. п.)
media/                     — фото, постеры, видео (mp4/mov)
media/signal-book/         — журнал «Нулевой день»: PDF, видео-листание, страницы
media/Цветы.Изменения/     — фотосерия «Цветы. Изменения», 8 кадров
media/Полюса/              — чертежи павильона «Полюса»: PDF и превью
media/documentation/       — видео «Документация» и постер
media/flowers-pattern.png  — бесшовный узор из рисунка для фона сайта
media/texture-paper.jpg    — тёплая бумажная текстура под узором
vercel.json                — настройки деплоя на Vercel
.github/workflows/pages.yml — автодеплой на GitHub Pages при пуше в main
```

Шрифт Golos Text подключается с Google Fonts, как в оригинале.

## Как открыть

```sh
python3 -m http.server 8000
```

Затем <http://localhost:8000/>. Проект «Оземъ»: <http://localhost:8000/#ozemy>.

## Обновление и публикация

```sh
git pull                 # забрать изменения с GitHub
git add -A
git commit -m "..."      # закоммитить правки
git push                 # пуш в main запускает деплой на GitHub Pages
```

`main.js`, `styles.css` и `media/` попадают в сборку Pages; `vercel.json`
используется при деплое на Vercel.

`README.md` не отслеживается git — это локальная заметка, её можно удалить
или закоммитить при желании.
