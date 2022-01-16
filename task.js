//Задача №1. Усовершенствуйте кэширующий декоратор

function cachingDecoratorNew(func) {
  let cache = [];

function wrapper(...args) {
    const hash = args.join(','); // получаем правильный хэш
    let idx = cache.findIndex((item)=> item.hash === hash ); // ищем элемент, хэш которого равен нашему хэшу
    if (idx !== -1 ) { // если элемент не найден
        console.log("Из кэша: " + cache[idx].result); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
        return "Из кэша: " + cache[idx].result;
    }

    let result = func(...args); // в кэше результата нет - придётся считать
    cache.push({hash, result}) ; // добавляем элемент с правильной структурой
    if (cache.length > 5) { 
      cache.shift() // если слишком много элементов в кэше надо удалить самый старый (первый) 
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;  
}
return wrapper;
}

//Задача №2. Debounce декоратор с моментальным вызовом

function debounceDecoratorNew(func, ms) {  
  let timeout;
  let flag = false;

  return function wrapper(...rest) {
    clearTimeout(timeout);
    if (!flag) {
      func.apply(this, rest);
    };
    flag = true;
    timeout = setTimeout(() => {       
      flag = false;
      func.apply(this, rest);
    }, ms);
  }
} 

//Задача №3. Усовершенствуйте debounceDecoratorNew

function debounceDecorator2(func, ms) {
  let timeout;
  let flag = false;
  
  function wrapper(...rest) {
    clearTimeout(timeout);
    if (!flag) {
      func.apply(this, rest);
      wrapper.count ++;
    };
    flag = true;
    timeout = setTimeout(() => {  
      flag = false;
      func.apply(this, rest);      
      wrapper.count ++;
    }, ms);
  }
  wrapper.count = 0;

  return wrapper;
} 
