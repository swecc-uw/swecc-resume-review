import { redirect } from '@sveltejs/kit';
import { LOCAL_API_ENDPOINT, PROD_API_ENDPOINT } from '../../constants';

export async function load({ fetch }) {
  const baseURL = import.meta.env.DEV ? LOCAL_API_ENDPOINT : PROD_API_ENDPOINT;
  const response = await fetch(`${baseURL}/members/profile`);

  if (!response.ok) {
    throw redirect(302, '/login');
  }

  const data = await response.json();
  console.log('User Data: ', data);

  return {
    user: data,
  };
}
