const request = require("supertest");
const photoRoutes = require("../photos");
const photoService = require("../../service/photos");
const app = require("../../app");

describe("/photos api routes", () => {
  beforeEach(() => {
    photoService.fetchPhotos = jest.fn();
  });

  describe("GET /", () => {
    let photoTestData;
    beforeEach(() => {
      const photos = [
        {
          id: 130,
          height: "100",
          width: "100",
          url: "https://picsum.photos/id/130/100/100",
        },
        {
          id: 150,
          height: "100",
          width: "200",
          url: "https://picsum.photos/id/150/200/100",
        },
      ];
      photoTestData = {
        page: 2,
        totalPages: 2,
        count: 22,
        results: photos,
      };
      photoService.fetchPhotos.mockReturnValue(photoTestData);
    });

    it("fetches list of photos by page", () => {
      return request(app)
        .get("/api/photos")
        .query({ page: 2 })
        .expect(200)
        .then((res) => {
          expect(photoService.fetchPhotos).toHaveBeenCalledWith({
            page: 2,
            grayscale: false,
            height: null,
            width: null,
          });
          expect(res.body).toEqual(photoTestData);
        });
    });

    it("returns first page of results when page is not a valid number", () => {
      return request(app)
        .get("/api/photos")
        .query({ page: "kjfkef" })
        .expect(200)
        .then((res) => {
          expect(photoService.fetchPhotos).toHaveBeenCalledWith({
            page: 1,
            grayscale: false,
            height: null,
            width: null,
          });
        });
    });

    it("fetches list of photos based on query params", () => {
      return request(app)
        .get("/api/photos")
        .query({ page: 2, grayscale: "true", width: "100" })
        .expect(200)
        .then((res) => {
          expect(photoService.fetchPhotos).toHaveBeenCalledWith({
            page: 2,
            grayscale: true,
            height: null,
            width: "100",
          });
          expect(res.body).toEqual(photoTestData);
        });
    });
  });
});
