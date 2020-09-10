import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus : 20,
  duration : '30s'
};

export default function () {
  const BASE_URL = 'http://127.0.0.1:3000'; // make sure this is not production

  const response = http.get(`${BASE_URL}/?id=${Math.floor(Math.random() * 100000000) + 1}`);
  
  check(response, {
    'is status 200': (r) => r.status === 200,
    'is faster than 2sec' : (r) => r.timings.duration < 2000,
  });

  //sleep(1);
}
