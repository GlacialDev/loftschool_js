/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array)
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArray = []

  for (let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i], i, array))
  }

  return newArray
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let previousValue

  if (initial) {
    previousValue = initial
    for (let i = 0; i < array.length; i++) {
      previousValue = fn(previousValue, array[i], i, array)
    }
  } else {
    previousValue = array[0]
    for (let i = 1; i < array.length; i++) {
      previousValue = fn(previousValue, array[i], i, array)
    }
  }

  return previousValue
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let array = []

  for (let key in obj) {
    array.push(key.toUpperCase())
  }

  return array
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  let newArray = []

  // это печально, но ничего лучше я придумать не сумел
  // очень странный метод слайс
  if (from < 0) {
    from = array.length + from
  }
  if (to < 0) {
    to = array.length + to
  }
  if (to <= from) {
    return newArray
  }
  if (!from || from < 0) {
    from = 0
  }
  if (!to || to > array.length) {
    to = array.length
  }

  for (let i = from; i < to; i++) {
    newArray.push(array[i])
  }

  return newArray
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  let proxy

  proxy = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value * value

      return true
    }
  })

  return proxy
}

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};
