export const getToken = () => {
  return document.cookie.includes("token")
    ? document.cookie
        .split("; ")
        .filter((value) => value.startsWith("token"))[0]
        .split("=")[1]
    : null;
};
