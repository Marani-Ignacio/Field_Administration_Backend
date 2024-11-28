// import { User, Field, Seed } from "./models";

// const user = new User({
//   name: "Ignacio",
//   lastName: "Marani",
//   birthDate: new Date("2001-03-09"),
//   email: "ignaciomarani.71@gmail.com",
//   isAdmin: false,
// });

// const field = new Field({
//   name: "Campo01",
//   hectare: 12.5,
//   location: "Casilda",
//   latitude: -33.04417,
//   longitude: -61.16806,
//   isActive: true,
//   image: "field.jpg",
//   ownerId: "",
// });

// const seed = new Seed({
//   name: "Soja",
//   description: "",
//   fields: [],
// });

// export const syncDatabase = async () => {
//   try {
//     const newUser = await user.save()
//     field.ownerId = newUser.id;
//     await field.save()
//     await seed.save()
//     console.log("Database synchronized");
//   } catch (error) {
//     console.error(error);
//   }
// };
