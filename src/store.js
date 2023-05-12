/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.getNewCode(this.state.list), title: 'Новая запись', count: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          // Проверяет выделен ли объект чтобы вести счет и отменить выделение предыдущего объекта
          if(item.selected){
            this.state.list.map(i => {
              if(i.code !== code && i.selected){
                i.selected = false
              }
            })
            item.count++;
          }
        }
        return item;
      })
    })
  }
  // Для уникальности кода
  getNewCode(list){
    let max = 0
    for(let item of list){
        if(item.code > max){
            max = item.code
        }
    }
    return max + 1
  }

  // Для правильного написания раз или раза
  getRazOrRaza(num){
    if (num % 10 === 1 && num % 100 !== 11) {
      return num + ' раз';
    } else if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && 
              !(num % 100 >= 12 && num % 100 <= 14)) {
      return num + ' раза';
    } else {
      return num + ' раз';
    }
  }
}

export default Store;
