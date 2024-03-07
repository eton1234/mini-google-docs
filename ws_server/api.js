// Get all people
const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchPeople() {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) {
      throw new Error('Failed to fetch people');
    }
    return response.json();
}

export async function fetchInfo(id) {
  const response = await fetch(`${API_BASE_URL}/basic-info/${id}`);
  if (!response.ok) {
    throw new Error('Failed to information data');
  }
  return response.json();
}