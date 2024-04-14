const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewRecord = async () => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
let isUpdating = false;

export const updateRecord = async (id: string, content: string) => {
  if (isUpdating) {
    return; // Abort if update is already in progress
  }

  isUpdating = true;

  try {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content }),
      }),
    );

    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } finally {
    isUpdating = false;
  }
};

export const askQuestion = async (question: string) => {
  if (isUpdating) {
    return; // Abort if update is already in progress
  }

  isUpdating = true;

  try {
    const res = await fetch(
      new Request(createURL(`/api/question`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      }),
    );

    if (res.ok) {
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      return json.data;
    }
  } catch (err) {
    throw err;
  } finally {
    isUpdating = false;
  }
};
