import ky from "ky";

const generateNewAccessToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.NEXT_PUBLIC_AMADEUS_API_KEY ?? "");
  params.append("client_secret", process.env.NEXT_PUBLIC_AMADEUS_SECRET ?? "");

  const options = {
    method: "POST",
    url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: params.toString(),
  };
  try {
    // const response = await axios(options);
    const kyResponse = await ky
      .post("https://test.api.amadeus.com/v1/security/oauth2/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
      .json();
    return kyResponse;
    // return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export default generateNewAccessToken;
