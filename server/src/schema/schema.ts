import { pgTable, integer, varchar, timestamp, date, json, text, boolean, serial } from "drizzle-orm/pg-core";

export const productCategory = pgTable("product_categories", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: varchar("description", { length: 191 }),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const product = pgTable("products", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 500 }).notNull(),
  image: json("image").$type<string[]>(),
  description: text("description"),
  price: varchar("price", { length: 191 }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => productCategory.id),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const user = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  userName: varchar("username", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  img: varchar("img", { length: 191 }),
  password: varchar("password", { length: 191 }).notNull(),
  address: varchar("address", { length: 191 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 191 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const cart = pgTable("carts", {
  id: serial("id").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull(),
  totalPrice: text("total_price").notNull(),
  isCheck: boolean("is_check"),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const order = pgTable("orders", {
  id: serial("id").notNull().primaryKey(),
  orderId: varchar("order_id", { length: 191 }).notNull().unique(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  orderDate: date("order_date", { mode: "string" }).notNull(),
  totalAmount: varchar("total_amount", { length: 191 }).notNull(),
  amountDue: varchar("amount_due", { length: 191 }).notNull(),
  currency: varchar("currency", { length: 191 }),
  paymentCapture: varchar("payment_capture", { length: 50 }),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const orderItem = pgTable("order_items", {
  id: serial("id").notNull().primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  quantity: varchar("quantity", { length: 50 }).notNull(),
  price: varchar("price", { length: 191 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const payment = pgTable("payments", {
  id: serial("id").notNull().primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  paymentDate: date("payment_date", { mode: "string" }).notNull(),
  paymentMethod: varchar("payment_method", { length: 191 }).notNull(),
  amount: varchar("amount", { length: 191 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const testCases = pgTable("test_cases", {
  id: serial("id").notNull().primaryKey(),
  description: varchar("description", { length: 191 }).notNull(),
  result: varchar("result", { length: 191 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});
