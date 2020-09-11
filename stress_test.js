import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus : 2,
  iterations : 2
};

export default function () {
  const BASE_URL = 'http://127.0.0.1:3000'; // make sure this is not production

  for (let i = 50000; i < 55000; i++) {
    http.get(`${BASE_URL}/?id=${i}`, {
      tags: { name : 'examplegrp1' },
    })
  }
  sleep(1);
}
