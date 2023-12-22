import { getCookie } from "../utils/setCokie";

function parseData(data) {
  const formData = new FormData();

  for (let [key, values] of Object.entries(data)) {
    formData.append(key, values);
  }
  return formData;
}

export const sendRequest = async (
  url,
  method = "GET",
  tokenState = false,
  data = null,
  type = "JSON"
) => {
  try {
    const options = {
      method,
    };

    const token = getCookie("token");

    if ((method === "GET" && tokenState) || method === "DELETE") {
      options.headers = {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      };
    }

    if ((data && method === "POST") || method === "PUT") {
      if (tokenState) {
        options.headers = {
          Authorization: `Bearer ${token}`,
        };
      }

      if (type === "FORM_DATA") {
        options.body = parseData(data);
      } else {
        options.headers = {
          ...options.headers,
          "Content-type": "application/json; charset=UTF-8",
        };

        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (response.status === 401 && result.message === "Token is wrong") {
      return response;
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
