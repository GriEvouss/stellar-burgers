import { deleteCookie, getCookie, setCookie } from '../../../src/utils/cookie';
import { formatPrice, formatDate, isValidEmail, isValidPassword } from '../../../src/utils/utils';

describe('Тесты утилит', () => {
  it('Тест работы с cookie', () => {
    setCookie('test', 'value');
    expect(getCookie('test')).to.equal('value');
    deleteCookie('test');
    expect(getCookie('test')).to.be.undefined;
  });

  it('Тест форматирования цены', () => {
    const price = formatPrice(1000);
    expect(price).to.equal('1 000 ₽');
  });

  it('Тест форматирования даты', () => {
    const date = new Date('2024-03-15T12:00:00Z');
    const formattedDate = formatDate(date);
    expect(formattedDate).to.include('15 марта');
  });

  it('Тест проверки валидности email', () => {
    expect(isValidEmail('test@test.com')).to.be.true;
    expect(isValidEmail('invalid-email')).to.be.false;
  });

  it('Тест проверки валидности пароля', () => {
    expect(isValidPassword('password123')).to.be.true;
    expect(isValidPassword('123')).to.be.false;
  });
}); 