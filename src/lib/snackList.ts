export interface Snack {
  id: string;
  name: string;
  link?: string | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | unknown
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export function getSnacks(): Promise<Snack[]> {
  return _fetch(`${BASE_URL}/snacks`, { method: 'GET' });
}

export function addSnack(name: string) {
  return _fetch(
    `${BASE_URL}/snacks`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    { name }
  );
}

export function updateSnack(id: string, link: string) {
  return _fetch(
    `${BASE_URL}/snacks/${id}/link`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    },
    { link }
  );
}

export const removeSnack = (id: string) => {
  return _fetch(`${BASE_URL}/snacks/${id}`, { method: 'DELETE' });
};
