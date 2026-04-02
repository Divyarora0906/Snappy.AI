const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getImagesFromPexels = async (keywords = []) => {
  try {
    const requests = keywords.map((keyword) =>
      fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=2`,
        {
          headers: {
            Authorization: "HvwhFjppzjtm8dvsUlCZH1ixWB0UeNIqtV32BS7Tu0SB03ucuirZZG2Z",
          },
        }
      ).then((res) => res.json())
    );

    const responses = await Promise.all(requests);

    const images = responses.flatMap((data) =>
      data.photos.map((photo) => photo.src.medium)
    );

    return images;
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return [];
  }
};

module.exports = { getImagesFromPexels };