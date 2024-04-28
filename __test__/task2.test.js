import { readFile } from 'fs/promises'
import { readFileAsync } from '../main.js'

// Мокуємо fs/promises
jest.mock('fs/promises', () => ({
  readFile: jest.fn()
}))

describe('readFileAsync', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Очищення стану моків перед кожним тестом
  })

  it('успішно читає вміст файлу', async () => {
    const filename = 'test.txt'
    const expectedContent = 'Вміст файлу'
    readFile.mockResolvedValue(expectedContent)

    const content = await readFileAsync(filename)

    expect(readFile).toHaveBeenCalledWith(filename, 'utf8')
    expect(console.log).toHaveBeenCalledWith('Файл успішно прочитано:', expectedContent)
    expect(content).toBe(expectedContent)
  })

  it('виводить помилку при виникненні помилок читання файлу', async () => {
    const filename = 'nonexistent.txt'
    const error = new Error('Файл не існує')
    error.code = 'ENOENT'
    readFile.mockRejectedValue(error)

    const content = await readFileAsync(filename)

    expect(readFile).toHaveBeenCalledWith(filename, 'utf8')
    expect(console.error).toHaveBeenCalledWith('Файл не існує:', filename)
    expect(content).toBeNull()
  })

  it('виводить загальну помилку при інших помилках', async () => {
    const filename = 'test.txt'
    const error = new Error('Неочікувана помилка')
    readFile.mockRejectedValue(error)

    const content = await readFileAsync(filename)

    expect(readFile).toHaveBeenCalledWith(filename, 'utf8')
    expect(console.error).toHaveBeenCalledWith('Помилка при читанні файлу:', error)
    expect(content).toBeNull()
  })
})
