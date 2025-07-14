import { formatPrice, formatDate, isValidEmail, isValidPassword } from '../utils';

describe('Тесты утилит', () => {
  it('Тест форматирования цены', () => {
    expect(formatPrice(1000)).toBe('1\u00A0000 ₽');
    expect(formatPrice(1000000)).toBe('1\u00A0000\u00A0000 ₽');
    expect(formatPrice(0)).toBe('0 ₽');
  });

  it('Тест форматирования даты', () => {
    const date = new Date('2024-03-15T12:00:00Z');
    const formattedDate = formatDate(date);
    expect(formattedDate).toContain('15 марта');
    expect(formattedDate).toContain('15:00');
  });

  it('Тест проверки валидности email', () => {
    expect(isValidEmail('test@test.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@test.com')).toBe(false);
  });

  it('Тест проверки валидности пароля', () => {
    expect(isValidPassword('password123')).toBe(true);
    expect(isValidPassword('123')).toBe(false);
    expect(isValidPassword('')).toBe(false);
  });
}); 