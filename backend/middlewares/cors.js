// const CORS_WHITELIST = ['http://localhost:3001',
//   'http://localhost:3000',
//   'http://katsuroproject15.nomoredomains.work',
//   'http://Katsuroprojectbackend15.nomoredomains.work',
// ];

// const corsOption = {
//   credentials: true,
//   origin: function checkCorsList(origin, callback) {
//     if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// module.exports = corsOption;

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://katsuroproject15.nomoredomains.work',
  'https://katsuroproject15.nomoredomains.work',
  'http://Katsuroprojectbackend15.nomoredomains.work',
  'https://Katsuroprojectbackend15.nomoredomains.work',
];

// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  next();
};

module.exports = cors;






