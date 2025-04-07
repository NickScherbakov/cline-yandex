import { YandexCloudConnector } from "../src"
import * as fs from "fs/promises"
import * as path from "path"

// Проверка наличия аргументов командной строки
if (process.argv.length < 3) {
	console.error("Ошибка: Укажите путь к текстовому файлу для суммаризации")
	console.error("Пример запуска:")
	console.error(
		"YANDEX_CLOUD_API_KEY=ваш_ключ YANDEX_CLOUD_FOLDER_ID=ваш_id ts-node text-summarization.ts path/to/text-file.txt",
	)
	process.exit(1)
}

// Проверка наличия переменных окружения
if (!process.env.YANDEX_CLOUD_API_KEY || !process.env.YANDEX_CLOUD_FOLDER_ID) {
	console.error("Ошибка: Не заданы переменные окружения YANDEX_CLOUD_API_KEY и YANDEX_CLOUD_FOLDER_ID")
	process.exit(1)
}

// Путь к файлу из аргументов командной строки
const filePath = process.argv[2]

// Функция для суммаризации текста
async function summarizeText() {
	try {
		// Проверяем существование файла
		await fs.access(filePath)

		// Читаем содержимое файла
		const fileContent = await fs.readFile(filePath, "utf-8")

		// Если текст слишком короткий, нет смысла суммаризировать
		if (fileContent.length < 500) {
			console.log("Предупреждение: Текст слишком короткий для суммаризации.")
			console.log("Минимальная рекомендуемая длина: 500 символов.")
			console.log(`Ваш текст: ${fileContent.length} символов.`)
		}

		console.log(`Суммаризация текста из файла: ${path.basename(filePath)}`)
		console.log(`Размер текста: ${fileContent.length} символов`)
		console.log("Обработка...")

		// Инициализация коннектора YandexCloud
		const connector = new YandexCloudConnector({
			apiKey: process.env.YANDEX_CLOUD_API_KEY,
			folderId: process.env.YANDEX_CLOUD_FOLDER_ID,
			modelId: "summarization",
		})

		// Засекаем время выполнения
		const startTime = Date.now()

		// Получаем суммаризацию текста
		const summary = await connector.summarize(fileContent)

		// Рассчитываем время выполнения
		const executionTime = (Date.now() - startTime) / 1000

		console.log("\n--- Результат суммаризации ---\n")
		console.log(summary)
		console.log("\n-----------------------------\n")

		// Выводим статистику
		console.log(`Оригинальный текст: ${fileContent.length} символов`)
		console.log(`Суммаризация: ${summary.length} символов`)
		console.log(`Степень сжатия: ${Math.round((1 - summary.length / fileContent.length) * 100)}%`)
		console.log(`Время выполнения: ${executionTime.toFixed(2)} сек.`)

		// Сохраняем результат в файл
		const outputPath = path.join(
			path.dirname(filePath),
			`${path.basename(filePath, path.extname(filePath))}_summary${path.extname(filePath)}`,
		)

		await fs.writeFile(outputPath, summary)
		console.log(`Результат сохранен в файл: ${outputPath}`)
	} catch (error: any) {
		if (error.code === "ENOENT") {
			console.error(`Ошибка: Файл не найден - ${filePath}`)
		} else {
			console.error("Произошла ошибка:", error)
		}
	}
}

// Запускаем суммаризацию
summarizeText()
