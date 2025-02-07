import { http, delay, HttpResponse } from 'msw';

import { API_RESOURCE } from '../../app/shared/constant';
import { PEOPLE } from '../fixtures';

const BASE_URL = `http://localhost:8080/mock-api/${API_RESOURCE.PEOPLE}`;

export const getPeople = http.get(BASE_URL, () => {
  delay(500);
  return HttpResponse.json(PEOPLE);
});

export const handlers = [getPeople];
