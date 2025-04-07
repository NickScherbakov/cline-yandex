#!/bin/bash

# Скрипт для автоматизации рабочего процесса разработки расширения Cline для VS Code
# Создан: $(date '+%Y-%m-%d')

set -e  # Прерывать выполнение при ошибках

# Цвета для красивого вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Функция для красивого вывода сообщений
print_message() {
    echo -e "${BLUE}[Cline Workflow]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Функция для запуска команды и возврата PID
run_command_bg() {
    local cmd="$1"
    local log_file="$2"
    
    # Запуск команды в фоновом режиме
    eval "$cmd" > "$log_file" 2>&1 &
    echo $!  # Вернуть PID запущенного процесса
}

# Функция для проверки наличия исполняемых файлов
check_dependencies() {
    print_message "Проверка зависимостей..."
    
    # Проверка Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js не найден. Пожалуйста, установите Node.js."
        exit 1
    else
        node_version=$(node -v)
        print_success "Node.js установлен, версия: $node_version"
    fi
    
    # Проверка npm
    if ! command -v npm &> /dev/null; then
        print_error "npm не найден. Пожалуйста, установите npm."
        exit 1
    else
        npm_version=$(npm -v)
        print_success "npm установлен, версия: $npm_version"
    fi
    
    # Проверка VS Code CLI
    if ! command -v code &> /dev/null; then
        print_warning "VS Code CLI не найден. Автоматический запуск отладки будет невозможен."
    else
        print_success "VS Code CLI найден."
    fi
}

# Функция для установки зависимостей
install_dependencies() {
    print_message "Установка зависимостей..."
    
    if [ "$SKIP_INSTALL" = "true" ]; then
        print_warning "Пропуск установки зависимостей (--skip-install)"
        return 0
    fi
    
    # Установка зависимостей для основного проекта и webview-ui
    npm run install:all
    
    if [ $? -eq 0 ]; then
        print_success "Зависимости успешно установлены!"
    else
        print_error "Ошибка при установке зависимостей!"
        exit 1
    fi
}

# Функция для запуска watch процессов
start_watch_processes() {
    print_message "Запуск процессов watch для автоматической пересборки..."
    
    # Создаем директорию для логов
    mkdir -p .logs
    
    # Запускаем watch процессы в фоне
    print_message "Запуск esbuild watch..."
    esbuild_pid=$(run_command_bg "npm run watch:esbuild" ".logs/esbuild-watch.log")
    print_success "esbuild watch запущен (PID: $esbuild_pid)"
    
    print_message "Запуск TypeScript watch..."
    tsc_pid=$(run_command_bg "npm run watch:tsc" ".logs/tsc-watch.log")
    print_success "TypeScript watch запущен (PID: $tsc_pid)"
    
    # Сохраняем PID процессов в файл
    echo "$esbuild_pid $tsc_pid" > .dev-workflow-pids
}

# Функция для запуска webview-ui dev сервера
start_webview_dev() {
    print_message "Запуск сервера разработки webview-ui..."
    
    # Запускаем webview dev сервер в фоне
    webview_pid=$(run_command_bg "npm run dev:webview" ".logs/webview-dev.log")
    print_success "Webview dev сервер запущен (PID: $webview_pid)"
    
    # Добавляем PID в файл
    echo "$webview_pid" >> .dev-workflow-pids
}

# Функция для запуска VS Code в режиме отладки
launch_vscode_debug() {
    print_message "Запуск VS Code в режиме отладки..."
    
    if ! command -v code &> /dev/null; then
        print_error "VS Code CLI не найден. Невозможно запустить отладку автоматически."
        print_message "Пожалуйста, запустите отладку вручную из VS Code, нажав F5."
        return 1
    fi
    
    # Запуск VS Code с режимом отладки
    code --extensionDevelopmentPath="$(pwd)" .
    
    print_success "VS Code запущен в режиме отладки."
}

# Функция для создания продакшн-сборки
create_production_build() {
    print_message "Создание продакшн-сборки расширения..."
    
    # Запускаем сборку
    npm run package
    
    if [ $? -eq 0 ]; then
        print_success "Продакшн-сборка успешно создана в директории dist/!"
    else
        print_error "Ошибка при создании продакшн-сборки!"
        exit 1
    fi
}

# Функция для остановки всех запущенных процессов
cleanup() {
    print_message "Завершение работы скрипта..."
    
    if [ -f .dev-workflow-pids ]; then
        # Чтение PID процессов из файла
        pids=$(cat .dev-workflow-pids)
        
        # Остановка каждого процесса
        for pid in $pids; do
            if ps -p $pid > /dev/null; then
                print_message "Останавливаю процесс с PID: $pid"
                kill $pid 2>/dev/null || true
            fi
        done
        
        # Удаление файла с PID
        rm -f .dev-workflow-pids
    else
        print_warning "Файл с PID не найден, нет процессов для остановки."
    fi
    
    print_success "Все процессы остановлены."
}

# Функция для отображения помощи
show_help() {
    echo "Использование: $0 [ОПЦИИ]"
    echo ""
    echo "Автоматизация рабочего процесса разработки расширения Cline для VS Code."
    echo ""
    echo "Опции:"
    echo "  --help            Вывод этой справки"
    echo "  --skip-install    Пропустить установку зависимостей"
    echo "  --watch-only      Запустить только watch-процессы (без webview-dev)"
    echo "  --webview-only    Запустить только webview-dev (без watch)"
    echo "  --no-debug        Не запускать VS Code в режиме отладки"
    echo "  --production      Создать только production-сборку"
    echo "  --stop            Остановить все запущенные процессы"
    echo ""
    echo "По умолчанию скрипт выполняет полный цикл разработки:"
    echo "1. Установка зависимостей"
    echo "2. Запуск watch-процессов"
    echo "3. Запуск webview-dev сервера"
    echo "4. Запуск VS Code в режиме отладки"
    echo ""
}

# Регистрация обработчика сигналов (для корректного завершения)
trap cleanup EXIT

# Разбор параметров командной строки
SKIP_INSTALL=false
WATCH_ONLY=false
WEBVIEW_ONLY=false
NO_DEBUG=false
PRODUCTION=false
STOP=false

for arg in "$@"; do
    case $arg in
        --help)
            show_help
            exit 0
            ;;
        --skip-install)
            SKIP_INSTALL=true
            ;;
        --watch-only)
            WATCH_ONLY=true
            ;;
        --webview-only)
            WEBVIEW_ONLY=true
            ;;
        --no-debug)
            NO_DEBUG=true
            ;;
        --production)
            PRODUCTION=true
            ;;
        --stop)
            STOP=true
            ;;
    esac
done

# Остановить процессы, если указан флаг --stop
if [ "$STOP" = "true" ]; then
    cleanup
    exit 0
fi

# Вывод приветствия
echo -e "${BLUE}=======================================================${NC}"
echo -e "${BLUE}     Cline VS Code Extension - Автоматизация рабочего процесса    ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo ""

# Проверка зависимостей
check_dependencies

# Выполнение только продакшн-сборки, если указан флаг
if [ "$PRODUCTION" = "true" ]; then
    install_dependencies
    create_production_build
    exit 0
fi

# Установка зависимостей
install_dependencies

# Запуск watch процессов
if [ "$WEBVIEW_ONLY" != "true" ]; then
    start_watch_processes
fi

# Запуск webview-ui dev сервера
if [ "$WATCH_ONLY" != "true" ]; then
    start_webview_dev
fi

# Запуск VS Code в режиме отладки
if [ "$NO_DEBUG" != "true" ] && [ "$WATCH_ONLY" != "true" ] && [ "$WEBVIEW_ONLY" != "true" ]; then
    launch_vscode_debug
fi

# Если запущены фоновые процессы, ждём нажатия CTRL+C
if [ "$WATCH_ONLY" = "true" ] || [ "$WEBVIEW_ONLY" = "true" ] || [ "$NO_DEBUG" = "true" ]; then
    print_message "Скрипт успешно запустил необходимые процессы!"
    print_message "Нажмите CTRL+C для завершения..."
    
    # Держим скрипт запущенным, пока не нажмут CTRL+C
    while true; do
        sleep 1
    done
fi

exit 0