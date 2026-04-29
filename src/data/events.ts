import eventPlantation from '../image/event_plantation.png';
import eventBeach from '../image/event_beach.png';
import eventCycling from '../image/event_cycling_city.png';

export const EVENT_IMAGE_BY_TAG: Record<string, string> = {
  Cleanup: eventBeach,
  Plantation: eventPlantation,
  Cycling: eventCycling,
};

export const STATIC_EVENTS = [
  {
    id: 'static-1',
    date: '03',
    month: 'May',
    img: eventCycling,
    title: 'Green City Cycling Rally',
    tag: 'Cycling',
    location: 'Connaught Place, Delhi',
    time: '6:00 AM',
    isStatic: true,
  },
  {
    id: 'static-2',
    date: '08',
    month: 'May',
    img: eventPlantation,
    title: 'Yamuna Riverbank Plantation',
    tag: 'Plantation',
    location: 'Yamuna Ghat, Delhi',
    time: '7:00 AM',
    isStatic: true,
  },
  {
    id: 'static-3',
    date: '15',
    month: 'May',
    img: eventBeach,
    title: 'Juhu Beach Cleanup Drive',
    tag: 'Cleanup',
    location: 'Juhu Beach, Mumbai',
    time: '8:00 AM',
    isStatic: true,
  },
];
