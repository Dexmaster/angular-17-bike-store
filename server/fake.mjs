import { faker } from "@faker-js/faker";
import request from "request";

const database = {
  bikes: [],
  users: [],
};

async function getBikeImage(url) {
  return new Promise((resolve) => {
    request.get(url, function () {
      resolve(this.uri.href);
    });
  });
}

for (var id = 1; id <= 300; id++) {
  // this slows down generation but if we don't do it image will change on page refresh
  const imageUrl = await getBikeImage(
    "https://source.unsplash.com/1600x900/?bicycle"
  );
  const type = faker.vehicle.bicycle();
  const manufacturer = faker.vehicle.manufacturer();
  const model = faker.vehicle.model();
  const color = faker.vehicle.color();
  const title = `${manufacturer} ${model} ${type} ${color}`;
  database.bikes.push({
    id,
    title,
    description: "", //faker.lorem.sentences(),
    type,
    color,
    manufacturer,
    model,
    price: faker.number.float({ min: 5, max: 1000, precision: 0.01 }),
    imageUrl,
    quantity: faker.number.int({ min: 3, max: 1500 }),
    rating: faker.number.float({ min: 1, max: 5, precision: 0.01 }),
  });
}

console.log(JSON.stringify(database));
