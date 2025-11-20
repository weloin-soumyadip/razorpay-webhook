import { defineMongooseModel } from "#nuxt/mongoose";

export default defineMongooseModel({
  name: "Product",
  schema: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
  },
  options: {
    timestamps: true
  }
});
