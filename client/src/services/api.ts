export const fetchUserData = async (
  userId: string
): Promise<{ id: string; name: string }> => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};
