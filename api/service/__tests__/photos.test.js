const { fetchPhotos } = require("../photos");

// This is more of an integration tests since it tests our data directly
// if this data was in a database somewhere, it would be a good idea to verify
// that we are getting the correct data back from our query by inserting
// test data into a test database
describe("photos service", () => {
  describe("fetchPhotos", () => {
    it("fetches photos by page", async () => {
      const params = {
        page: 1,
      };

      const data = await fetchPhotos(params);

      expect(data.results).toHaveLength(20);
      expect(data.count).toEqual(50);
      expect(data.page).toEqual(1);
      expect(data.totalPages).toEqual(3);
    });

    it("fetches photos by dimensions", async () => {
      const params = {
        width: "100",
        height: "100",
        page: 1,
      };
      const data = await fetchPhotos(params);

      expect(data.page).toEqual(1);
      data.results.forEach((photo) => {
        const { height, width } = photo;

        expect(height).toEqual(params.height);
        expect(width).toEqual(params.width);
      });
    });
  });
});
