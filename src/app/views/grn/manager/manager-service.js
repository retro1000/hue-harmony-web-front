const API_URL = "/api/grns";

export const fetchGRNs = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createGRN = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateGRN = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteGRN = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
