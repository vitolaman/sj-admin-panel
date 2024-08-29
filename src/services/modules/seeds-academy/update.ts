import { errorHandler } from "services/errorHandler";

const updateClass = async (
  accessToken: string,
  id: string,
  formData: FormData
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_REST_HOST}/admin-academy/v1/class/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

export default updateClass;
