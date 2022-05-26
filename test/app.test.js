const axios = require("axios");
const {
  url,
  accessToken,
  userAccessToken,
} = require("../configs/configs.json");

let firstPoliceStation;

test("GET /v1/my-guard-police/police-stations", async () => {
  await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      firstPoliceStation = res.data[0];
      expect(Array.isArray(res.data)).toBeTruthy();
    });
});

test("POST /v1/my-guard-police/police-stations", async () => {
  await axios
    .post(url, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
    .catch((err) => {
      expect(err.response.data.message).toEqual("User is not authorized");
    });
});

test("GET /v1/my-guard-police/police-stations/:id", async () => {
  await axios
    .get(`${url}/${firstPoliceStation.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      expect(res.data[0].id).toBeTruthy();
      expect(res.data[0].location).toBeTruthy();
    });
});

test("DELETE /v1/my-guard-police/police-stations/:id", async () => {
  await axios
    .get(`${url}/${firstPoliceStation.id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
    .catch((err) => {
      expect(err.response.data.message).toEqual(
        "You don't have sufficient rights"
      );
    });
});

test("GET /v1/my-guard-police/police-stations/:id/crimes", async () => {
  await axios
    .get(`${url}/${firstPoliceStation.id}/crimes`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      expect(Array.isArray(res.data)).toBeTruthy();
    });
});

test("GET /v1/my-guard-police/police-stations/:id/check-crimes", async () => {
  await axios
    .get(`${url}/${firstPoliceStation.id}/check-crimes`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      expect(res.data).toBeTruthy();
    });
});
