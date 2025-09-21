import API_BASE_URL from "./config";

export const getBills = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bills`, { credentials: 'include' });
    return res.ok ? await res.json() : [];
  } catch (err) {
    console.error("Failed to fetch bills:", err);
    return [];
  }
};

export const createBill = async (bill) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(bill),
    });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("Failed to create bill:", err);
    return null;
  }
};
