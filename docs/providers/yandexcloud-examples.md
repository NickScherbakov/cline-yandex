# Примеры запросов к YandexGPT в Cline

В этом руководстве представлены примеры эффективных запросов к моделям YandexGPT через расширение Cline. Использование правильно структурированных запросов значительно повышает качество и полезность ответов.

## Основные принципы формулирования запросов

1. **Будьте конкретны** - чем точнее запрос, тем более полезный ответ вы получите
2. **Указывайте контекст** - добавляйте необходимую информацию о проекте или задаче
3. **Уточняйте формат ответа** - если вам нужен конкретный формат, укажите это в запросе

## Примеры запросов для разработки

### Анализ и объяснение кода

```
Объясни, что делает следующая функция:

```javascript
function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs, savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Объясни принцип работы и возможные сценарии использования.
```

### Рефакторинг кода

```
Помоги рефакторить следующий код, чтобы он был более читаемым и следовал принципам SOLID:

```python
def process_data(data):
    result = []
    for item in data:
        if item['status'] == 'active':
            if item['type'] == 'user':
                result.append({'name': item['name'], 'email': item['email']})
            elif item['type'] == 'admin':
                result.append({'name': item['name'], 'email': item['email'], 'access_level': item['access_level']})
            elif item['type'] == 'guest':
                result.append({'name': item['name']})
    
    processed = []
    for item in result:
        if 'email' in item:
            processed.append({**item, 'notification': True})
        else:
            processed.append({**item, 'notification': False})
    
    return processed
```
```

### Написание тестов

```
Напиши юнит-тесты для следующего класса на Python, используя pytest:

```python
class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Деление на ноль невозможно")
        return a / b
```

Покрой все методы тестами, включая проверку исключений.
```

### Генерация документации к API

```
Сгенерируй документацию в формате Markdown для следующего REST API:

Эндпоинт: /api/users
Методы: GET, POST, PUT, DELETE

GET /api/users - возвращает список пользователей
GET /api/users/{id} - возвращает пользователя по ID
POST /api/users - создает нового пользователя
PUT /api/users/{id} - обновляет данные пользователя
DELETE /api/users/{id} - удаляет пользователя

Поля пользователя:
- id (int): уникальный идентификатор
- username (string): имя пользователя
- email (string): email пользователя
- role (string): роль (admin, user, guest)
- created_at (datetime): дата создания
```

## Примеры запросов для работы с текстом

### Реферирование текста (модель summarization)

```
Сделай краткое резюме следующего текста в трех абзацах:

[Вставьте здесь большой текст для сокращения]
```

### Исправление грамматики и стиля

```
Проверь следующий текст на грамматические и стилистические ошибки, исправь их и перепиши текст в более формальном стиле:

"Короче говоря, мы проанализировали данные и в принципе, можно сказать что результаты впечатляют! За последний квартал наши продажи подскочили аж на 25%, это просто супер. Но есть одно но - расходы тоже выросли, и не мало - почти на 15%, и это конечно печалит нас всех. В следующем квартале надо как-то порешать эту проблему."
```

### Перевод технических текстов

```
Переведи следующую документацию с английского на русский, сохраняя технические термины в оригинале где это уместно:

"Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker's methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production."
```

## Примеры для работы с данными и алгоритмами

### Анализ алгоритма

```
Оцени временную и пространственную сложность следующего алгоритма и предложи оптимизации:

```python
def find_duplicates(arr):
    duplicates = []
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in duplicates:
                duplicates.append(arr[i])
    return duplicates
```
```

### Помощь с SQL запросами

```
Помоги написать SQL запрос для следующей задачи:

У меня есть таблицы:
- users (id, name, email, created_at)
- orders (id, user_id, amount, status, created_at)
- order_items (id, order_id, product_id, quantity, price)
- products (id, name, category_id, price)
- categories (id, name)

Мне нужно получить список топ-5 категорий по общей сумме продаж за последний месяц, с указанием количества проданных товаров и общей суммы.
```

## Комплексные технические запросы

### Архитектурные решения

```
Я разрабатываю веб-приложение для учета личных финансов. Помоги мне спроектировать архитектуру приложения, учитывая следующие требования:

1. Пользователи должны иметь возможность добавлять, редактировать и удалять транзакции
2. Транзакции должны категоризироваться
3. Пользователи могут создавать собственные категории
4. Система должна генерировать отчеты и графики
5. Необходима поддержка нескольких валют
6. Должна быть возможность импорта/экспорта данных в CSV

Предложи:
1. Структуру базы данных
2. Технологический стек
3. Основные компоненты архитектуры
4. API эндпоинты
```

### Учебный разбор технологии

```
Объясни принципы работы React Hooks как для начинающего разработчика. Включи в объяснение:

1. Что такое хуки и для чего они нужны
2. Объяснение основных хуков (useState, useEffect, useContext)
3. Правила использования хуков
4. Примеры использования каждого хука
5. Распространенные ошибки при работе с хуками и как их избежать
```

## Советы для улучшения работы с YandexGPT

1. **Итеративный подход** - уточняйте и развивайте свои запросы на основе полученных ответов
2. **Контекст важен** - начинайте с контекста задачи или проблемы
3. **Используйте родной язык** - YandexGPT отлично работает с русским языком
4. **Указывайте роль** - например, "Выступи в роли опытного DevOps-инженера и помоги с настройкой..."
5. **Задавайте уточняющие вопросы** - если ответ неполный или неясный

## Специфика работы с моделями YandexGPT

- **yandexgpt** подходит для сложных задач и генерации кода
- **yandexgpt-lite** эффективен для быстрых запросов и диалогов
- **summarization** оптимальна для работы с большими объемами текста и создания резюме