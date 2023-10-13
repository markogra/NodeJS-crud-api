import { Router } from "express";
import { body, validationResult, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  getProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import {
  getOneUpdate,
  getUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./handlers/update";
const router = Router();

// Product
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Update

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["In_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// Update Points

router.get("/updatepoint", function () {});
router.get("/updatepoint/:id", function () {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  function (req, res) {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  function (req, res) {}
);
router.delete("/updatepoint/:id", function () {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "Error in router handler" });
});

export default router;
