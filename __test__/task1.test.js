import { writeFile } from 'fs/promises'
import { writeFileAsync } from '../main.js'

// Мокуємо fs/promises
jest.mock('fs/promises', () => ({
  writeFile: jest.fn()
}))

describe('writeFileAsync', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('успішно записує вміст у файл', async () => {
    const filename = 'test.txt'
    const content = 'Тестовий контент'
    writeFile.mockResolvedValue()

    await writeFileAsync(filename, content)

    expect(writeFile).toHaveBeenCalledWith(filename, content)
    expect(console.log).toHaveBeenCalledWith('Файл успішно записано')
  })

  it('виводить помилку при виникненні помилок запису', async () => {
    const filename = 'test.txt'
    const content = 'Тестовий контент'
    const error = new Error('Помилка запису')
    writeFile.mockRejectedValue(error)

    const result = await writeFileAsync(filename, content)

    expect(result).toBe(error)
    expect(console.error).toHaveBeenCalledWith('Помилка при записі файлу:', error)
  })
})
