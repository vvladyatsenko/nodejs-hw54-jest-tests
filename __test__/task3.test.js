import { unlink } from 'fs/promises'
import { deleteFileAsync } from '../main.js'

// Мокуємо fs/promises
jest.mock('fs/promises', () => ({
  unlink: jest.fn()
}))

describe('deleteFileAsync', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Очищення моків перед кожним тестом
    global.console = { log: jest.fn(), error: jest.fn() } // Мокуємо глобальний console
  })

  it('успішно видаляє файл', async () => {
    const filename = 'existingFile.txt'
    unlink.mockResolvedValue()

    await deleteFileAsync(filename)

    expect(unlink).toHaveBeenCalledWith(filename)
    expect(console.log).toHaveBeenCalledWith('Файл успішно видалено')
  })

  it('виводить помилку, коли файл не існує', async () => {
    const filename = 'nonexistentFile.txt'
    const error = new Error('Файл не існує')
    error.code = 'ENOENT'
    unlink.mockRejectedValue(error)

    await deleteFileAsync(filename)

    expect(unlink).toHaveBeenCalledWith(filename)
    expect(console.error).toHaveBeenCalledWith('Файл не існує:', filename)
  })

  it('виводить помилку при інших помилках видалення', async () => {
    const filename = 'problematicFile.txt'
    const error = new Error('Помилка при видаленні')
    unlink.mockRejectedValue(error)

    await deleteFileAsync(filename)

    expect(unlink).toHaveBeenCalledWith(filename)
    expect(console.error).toHaveBeenCalledWith('Помилка при видаленні файлу:', error)
  })
})
