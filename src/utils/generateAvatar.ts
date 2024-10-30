export const generateAvatar = async (displayName: string | null) => {
  try {
    const resp = await fetch(
      `https://api.multiavatar.com/${displayName}.svg?apikey=${import.meta.env.VITE_MULTIAVATAR_ACCESS_KEY}`
    );
    const svgText = await resp.text();
    return svgText;
  } catch (error) {
    console.error("Error generating avatar:", error);
    return null;
  }
};