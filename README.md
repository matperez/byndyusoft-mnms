# frontenders-and-designers-work-together

Шаблон репозитория для фронтово-дизайнерского хакатона в Челябинске.

![Дизайн-завтрак №39](cover.jpg)

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Запуск Storybook
npm run storybook

# Сборка проекта
npm run build
```

## Деплой на GitHub Pages

Проект автоматически деплоится на GitHub Pages при пуше в ветки `main`, `master` или `develop`.

### Настройка GitHub Pages

1. Перейдите в настройки репозитория: **Settings** → **Pages**
2. В разделе **Source** выберите:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` (будет создана автоматически) или выберите другую ветку
   - **Folder**: `/ (root)`
3. Сохраните изменения

После первого деплоя проект будет доступен по адресу:
`https://matperez.github.io/byndyusoft-mnms/`

### Ручной запуск деплоя

В разделе **Actions** → **Deploy to GitHub Pages** можно запустить деплой вручную через кнопку **Run workflow**.
