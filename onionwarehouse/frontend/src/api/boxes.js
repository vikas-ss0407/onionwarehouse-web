import API_BASE_URL from "./config";

export const getBoxes = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/boxes`, { credentials: 'include' });
    return res.ok ? await res.json() : [];
  } catch (err) {
    console.error("Failed to fetch boxes:", err);
    return [];
  }
};

export const createBox = async (box) => {
  try {
    const res = await fetch(`${API_BASE_URL}/boxes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(box),
    });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("Failed to create box:", err);
    return null;
  }
};

export const updateBox = async (id, box) => {
  try {
    const res = await fetch(`${API_BASE_URL}/boxes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(box),
    });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("Failed to update box:", err);
    return null;
  }
};

export const deleteBox = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/boxes/${id}`, {
      method: "DELETE",
      credentials: 'include',
    });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("Failed to delete box:", err);
    return null;
  }
};
