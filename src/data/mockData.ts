import type { DepartureEntry, WaitingEntry } from '../types';

const base = new Date();
base.setSeconds(0, 0);

const addMinutes = (d: Date, m: number): Date =>
  new Date(d.getTime() + m * 60_000);

export const initialDepartureData: DepartureEntry[] = [
  {
    id: 'd1',
    vehicleNumber: '7810',
    routeName: 'Маршрут 23',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Сокращенная трасса', variant: 'yellow' },
    ],
    modifiedRoute: 'Ст. метро «Старая Деревня» — ПТО «Шаврова»',
    modifiedRouteCode: 'С',
    departureTime: addMinutes(base, 1),
  },
  {
    id: 'd2',
    vehicleNumber: '7756',
    routeName: 'Маршрут 23',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Основная трасса', variant: 'gray' },
    ],
    departureTime: addMinutes(base, 2),
  },
  {
    id: 'd3',
    vehicleNumber: '7762',
    routeName: 'Маршрут 23',
    badges: [
      { label: 'Маршрут', variant: 'gray' },
      { label: 'Измененная трасса', variant: 'blue' },
    ],
    departureTime: addMinutes(base, 3),
  },
  {
    id: 'd4',
    vehicleNumber: '7801',
    routeName: 'Маршрут 10',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Основная трасса', variant: 'gray' },
    ],
    departureTime: addMinutes(base, 5),
  },
  {
    id: 'd5',
    vehicleNumber: '7744',
    routeName: 'Маршрут 10',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Сокращенная трасса', variant: 'yellow' },
    ],
    modifiedRoute: 'ПТО «Шаврова» — пр. Испытателей',
    modifiedRouteCode: 'Б',
    departureTime: addMinutes(base, 7),
  },
  {
    id: 'd6',
    vehicleNumber: '7833',
    routeName: 'Маршрут 45',
    badges: [
      { label: 'Маршрут', variant: 'gray' },
      { label: 'Основная трасса', variant: 'gray' },
    ],
    departureTime: addMinutes(base, 9),
  },
  {
    id: 'd7',
    vehicleNumber: '7791',
    routeName: 'Маршрут 45',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Измененная трасса', variant: 'blue' },
    ],
    modifiedRoute: 'Ст. метро «Старая Деревня» — ул. Савушкина',
    modifiedRouteCode: 'С',
    departureTime: addMinutes(base, 11),
  },
  {
    id: 'd8',
    vehicleNumber: '7762',
    routeName: 'Маршрут 23',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Основная трасса', variant: 'gray' },
    ],
    departureTime: addMinutes(base, 13),
  },
  {
    id: 'd9',
    vehicleNumber: '7820',
    routeName: 'Маршрут 10',
    badges: [
      { label: 'Маршрут', variant: 'gray' },
      { label: 'Измененная трасса', variant: 'blue' },
    ],
    modifiedRoute: 'пр. Декабристов — ст. метро «Нарвская»',
    modifiedRouteCode: 'И',
    departureTime: addMinutes(base, 17),
  },
  {
    id: 'd10',
    vehicleNumber: '7778',
    routeName: 'Маршрут 45',
    badges: [
      { label: 'В парк', variant: 'green' },
      { label: 'Сокращенная трасса', variant: 'yellow' },
    ],
    modifiedRoute: 'пр. Испытателей — ПТО «Шаврова»',
    modifiedRouteCode: 'Б',
    departureTime: addMinutes(base, 22),
  },
];

export const initialWaitingData: WaitingEntry[] = [
  {
    id: 'w1',
    vehicleNumber: '7814',
    routeName: 'Маршрут 23',
    badges: [
      { label: 'Не в очереди выезда', variant: 'gray' },
      { label: 'Маршрут 23', variant: 'gray' },
    ],
    returnTime: addMinutes(base, 25),
  },
  {
    id: 'w2',
    vehicleNumber: '7749',
    routeName: 'Обед',
    badges: [
      { label: 'Низкий приоритет', variant: 'gray' },
      { label: 'Маршрут 10', variant: 'gray' },
    ],
    returnTime: addMinutes(base, 32),
  },
  {
    id: 'w3',
    vehicleNumber: '7803',
    routeName: 'Маршрут 45',
    badges: [
      { label: 'Не в очереди выезда', variant: 'gray' },
      { label: 'Маршрут 45', variant: 'gray' },
    ],
    returnTime: addMinutes(base, 40),
  },
];
