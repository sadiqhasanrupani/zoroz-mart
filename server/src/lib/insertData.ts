import moment from "moment";

//^ db and schemas
import { db } from "../config/db.config";
import { product, productCategory, user } from "../schema/schema";

export async function insertDummyData() {
  try {
    //^ check if their is any user or not
    const anyUsers = await db.select({ id: user.id }).from(user);

    if (!anyUsers[0]) {
      const insertUserData = await db.insert(user).values([
        {
          userName: "John Doe",
          address: "123 Main St, City, Country",
          email: "johndoe@gmail.com",
          password: "$2b$12$nPYKVxXD3SBEZdSyEBG65e7x0d3wxRtrtmkwOdx9muHr/Al3wWIOC",
          phoneNumber: "+917876765654",
          img: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          userName: "Jane Smith",
          address: "456 Elm St, City, Country",
          email: "janesmith@gmail.com",
          password: "$2b$12$nPYKVxXD3SBEZdSyEBG65e7x0d3wxRtrtmkwOdx9muHr/Al3wWIOC",
          phoneNumber: "+918967656787",
          img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      ]);

      if (insertUserData.rowCount === 0) {
        throw new Error("Unable to insert a user data.");
      }
    }

    //^ check if their is any productCategory
    const anyProductCategory = await db.select({ id: productCategory.id }).from(productCategory);

    if (!anyProductCategory[0]) {
      const insertProductCategory = await db.insert(productCategory).values([
        {
          id: 1,
          name: "Electronics",
          description: "Electronic devices and accessories",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 2,
          name: "Clothing",
          description: "Apparel for men, women, and children",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 3,
          name: "Home & Kitchen",
          description: "Household appliances and utensils",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 4,
          name: "Eyewear",
          description: "",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 5,
          name: "Outdoor and Adventure",
          description: "",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 6,
          name: "Fitness and Health Tracking",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          id: 7,
          name: " Audio Accessories",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      ]);

      if (insertProductCategory.rowCount === 0) {
        throw new Error("Unable to insert a product category data.");
      }
    }

    //^ Check if there are any products present or not.
    const anyProducts = await db.select({ id: product.id }).from(product);

    if (!anyProducts[0]) {
      const insertProducts = await db.insert(product).values([
        {
          categoryId: 1,
          name: "SmartPhone",
          description:
            "Introducing our SmartPhone – your pocket-sized companion for staying connected and organized. With its advanced features and sleek design, it's perfect for multitasking and capturing moments on the go. Stay productive and entertained with our versatile SmartPhone.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "999.980",
          image: [
            "https://images.unsplash.com/photo-1521547116720-6ccf948f63b9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1601972599748-19fe5a7e756f?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 1,
          name: "Laptop",
          description:
            "Introducing our sleek Laptop – your portable powerhouse for work and play. With cutting-edge technology and a lightweight design, it's perfect for staying productive on the go. Elevate your computing experience with our versatile Laptop.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "1499.990",
          image: [
            "https://m.media-amazon.com/images/I/71lYhcc++AL._SX679_.jpg",
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.notebookcheck.net%2Fuploads%2Ftx_nbc2%2F4zu3_Asus_Vivobook_X403FA.jpg&f=1&nofb=1&ipt=7b9fb19e2b4ca6ee0d967d01c938c0d10638ef55f8b904ba7da7fa3df7b1297b&ipo=images",
            "https://news-cdn.softpedia.com/images/news2/asus-vivobook-pro-15-is-a-monster-laptop-with-nvidia-geforce-gtx-1050-516101-4.jpg",
          ],
        },
        {
          categoryId: 2,
          name: "T-shirt",
          description:
            "Introducing our classic T-shirt – the ultimate wardrobe staple for effortless style. With its comfortable fit and timeless design, it's perfect for any casual occasion. Upgrade your look with our versatile T-shirt.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "19.990",
          image: [
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 2,
          name: "Dress",
          description:
            "Introducing our stylish Dress – your go-to choice for effortless elegance. With a flattering silhouette and timeless design, it's perfect for any occasion. Elevate your wardrobe with our versatile Dress.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "49.990",
          image: [
            "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Microwave Oven",
          description:
            "Introducing our Microwave Oven – your kitchen's new best friend. With quick and efficient cooking capabilities, it heats up meals in seconds, making mealtime a breeze. Compact and versatile, it's perfect for busy households and small spaces. Simplify your cooking routine with our Microwave Oven.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "79.990",
          image: [
            "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1596552183299-000ef779e88d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1584269600519-112d071b35e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Coffee Maker",
          description: `Introducing our sleek Coffee Maker – the perfect addition to your morning routine. With customizable settings and advanced brewing technology, it delivers rich, aromatic coffee with every cup. Start your day right with the perfect brew, every time.`,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "39.990",
          image: [
            "https://images.unsplash.com/photo-1608354580875-30bd4168b351?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1515442094343-9a10f85a4b79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1607273177127-47ec33b5be3f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 1,
          name: "Tablet",
          description:
            "Introducing our sleek Tablet – your portable powerhouse for productivity and entertainment. With a vibrant touchscreen display, powerful performance, and long-lasting battery life, it's perfect for work or play on the go. Stay connected, organized, and entertained with ease.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "499.990",
          image: [
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1628815113969-0487917fc6a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1544244015-9c72fd9c866d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 2,
          name: `Jeans`,
          description:
            "Introducing our timeless Jeans – the essential staple for every wardrobe. Crafted from high-quality denim, these jeans offer both style and durability for everyday wear. With a classic five-pocket design and a comfortable mid-rise waist, they provide a flattering fit that never goes out of fashion. Whether you're running errands, meeting friends for coffee, or enjoying a casual night out, our Jeans are the perfect choice. Pair them with a crisp white shirt for a polished look or dress them down with a cozy sweater for effortless style. Versatile, comfortable, and effortlessly cool, our Jeans are the ultimate wardrobe essential for any occasion.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "29.990",
          image: [
            "https://plus.unsplash.com/premium_photo-1665664652383-2308d742943c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1668127212806-0b69765d50b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Toaster",
          description:
            "Introducing our innovative Toaster – the perfect appliance for busy mornings and delicious breakfasts. Designed for efficiency and convenience, this toaster makes it easy to enjoy crispy, golden toast every time. With multiple browning settings, you can customize your toast to your desired level of crunchiness. The extra-wide slots accommodate a variety of bread sizes and types, from thick slices of artisanal bread to bagels and English muffins. The built-in warming rack allows you to heat croissants or pastries while toasting your bread, making breakfast preparation a breeze. Sleek and compact, our toaster fits seamlessly into any kitchen decor, saving space on your countertop. Start your day off right with our reliable and stylish Toaster, and savor the perfect slice of toast with every use.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "34.990",
          image: [
            "https://images.unsplash.com/photo-1583729250536-d5fb10401671?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1667238579781-cb4bd6126ffd?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1686644823126-7ed947386b77?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 1,
          name: `Headphones`,
          description:
            "Introducing our cutting-edge Headphones – your gateway to immersive audio experiences wherever you go. Engineered for exceptional sound quality, these headphones deliver rich, clear audio that brings your music to life. With advanced noise-canceling technology, you can escape into your own world without distractions from the outside. The sleek and ergonomic design ensures a comfortable fit for extended wear, whether you're commuting, working out, or simply relaxing at home. Bluetooth connectivity allows for seamless pairing with your devices, while the long-lasting battery ensures hours of uninterrupted listening enjoyment. Elevate your audio experience with our premium Headphones and indulge in the ultimate sound quality wherever you go.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "80",
          image: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1593359863503-f598684c806f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 2,
          name: "Sweater",
          description: `Introducing our cozy Sweater – your go-to garment for chilly days and stylish comfort. Crafted from soft, luxurious fabrics, this sweater offers warmth and elegance in equal measure. Its classic design and versatile style make it the perfect addition to any wardrobe, effortlessly pairing with jeans for a casual look or dressing up with trousers for a more polished ensemble. Whether you're lounging at home or stepping out for a night on the town, our Sweater promises to keep you snug and stylish all season long. Treat yourself to the ultimate in comfort and sophistication with our must-have Sweater.`,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "3,237.90",
          image: [
            "https://images.unsplash.com/photo-1610901157620-340856d0a50f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1623197326553-ef361f80e894?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1669688174636-28529c1b76c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1584670747295-a5dd1f3125c9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1545552352-6eb1ab0862a4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Blender",
          description: `Introducing the Blender Mixer - your versatile kitchen companion for effortless meal preparation. With its powerful motor and sharp blades, this appliance effortlessly blends, chops, and purees ingredients to perfection in seconds. Whether you're whipping up smoothies, sauces, or soups, the Blender Mixer delivers smooth and consistent results every time. Its sleek design and compact size make it a stylish addition to any kitchen countertop, while its easy-to-use features make meal prep a breeze. Upgrade your culinary experience with the Blender Mixer and enjoy delicious homemade creations with ease.`,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "4,898.36",
          image: [
            "https://plus.unsplash.com/premium_photo-1664647903436-15d1f17b1162?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1664648063464-dc068706bc67?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          name: "Stars and You Women Midi Skirt",
          description: `Introducing the "Aurora Borealis Women's Maxi Dress" – a stunning blend of comfort and style. With its flowing silhouette, captivating print inspired by the northern lights, and adjustable fit, this dress effortlessly transitions from day to night. Whether you're strolling along the beach or attending a summer soirée, embrace elegance and charm with this versatile wardrobe essential.`,
          categoryId: 2,
          price: "330",
          image: [
            "https://m.media-amazon.com/images/I/61Qv6q9GJoL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61KUv+p3paL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61ZCrm49euL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/51TMTLhYLgL._SL1100_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 3,
          name: "Vacuum Cleaner",
          description:
            "Vacuum Cleaner: Keep your home sparkling clean with our powerful and efficient vacuum cleaner. Designed to effortlessly remove dirt, dust, and debris from carpets, hardwood floors, and upholstery, our vacuum cleaner makes cleaning a breeze. With its advanced features and sleek design, it's the perfect solution for maintaining a healthy and hygienic living environment. Say goodbye to dust and allergens and hello to a fresh, spotless home with our top-of-the-line vacuum cleaner.",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "149.990",
          image: [
            "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1600322305530-45714a0bc945?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1681824939699-ff7154f01136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 6,
          name: "Smartwatch",
          description: "Feature-rich smartwatch for tracking your fitness and activities",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "199.990",
          image: [
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1434494343833-76b479733705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1669021454166-c68562603897?q=80&w=2005&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1619037961428-e6410a7afd38?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1632794716789-42d9995fb5b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 2,
          name: "Jacket",
          description: "Stylish jacket for staying warm in chilly weather",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "79.990",
          image: [
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1661645929465-dff3f6e7041e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Rice Cooker",
          description: "Efficient rice cooker for perfectly cooked rice every time",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "49.990",
          image: [
            "https://images.unsplash.com/photo-1556910633-5099dc3971e8?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1599182345361-9542815e73f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "",
          ],
        },
        {
          categoryId: 6,
          name: "Fitness Tracker",
          description: "Activity tracker for monitoring your daily exercise and health metrics",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "59.990",
          image: [
            "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1683147839051-02e2d132796f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1620213391117-0d169a917221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 4,
          name: "Sunglasses",
          description: "Fashionable sunglasses for protecting your eyes in style",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "29.990",
          image: [
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1552337557-45792b252a2e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1556015048-4d3aa10df74c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1548306530-3ece53b754b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Air Fryer",
          description: "Healthy cooking appliance for frying foods with little to no oil",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "89.990",
          image: [
            "https://m.media-amazon.com/images/I/71+8uTMDRFL._AC_SY300_SX300_.jpg",
            "https://m.media-amazon.com/images/I/81IFXxclpbL._AC_SX679_.jpg",
            "https://m.media-amazon.com/images/I/911LxsOy5gL._AC_SX679_.jpg",
            "https://m.media-amazon.com/images/I/91Gdn1R8CfL._AC_SX679_.jpg",
            "https://m.media-amazon.com/images/I/71vMsFfbCHL._AC_SX679_.jpg",
            "https://m.media-amazon.com/images/I/91zhz9c1x+L._AC_SX679_.jpg",
          ],
        },
        {
          categoryId: 7,
          name: "Wireless Earbuds",
          description: "Compact and wireless earbuds for listening to music on the go",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "99.990",
          image: [
            "https://m.media-amazon.com/images/I/411NxOSWI5L._AC_SY450_.jpg",
            "https://m.media-amazon.com/images/I/612ayXw-rlL._AC_SY450_.jpg",
            "https://m.media-amazon.com/images/I/71ARULrls-L._AC_SY450_.jpg",
            "https://m.media-amazon.com/images/I/511jS3UQbsL._AC_SY450_.jpg",
          ],
        },
        {
          categoryId: 5,
          name: "Backpack",
          description: "Durable backpack for carrying your essentials with ease",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "49.990",
          image: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1670444333487-0064c6399f88?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1499803270242-467f7311582d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1577733975197-3b950ca5cabe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 3,
          name: "Electric Toothbrush",
          description: "Advanced electric toothbrush for thorough cleaning and gum care",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          price: "39.990",
          image: [
            "https://images.unsplash.com/photo-1593010997571-7ebe6c593d8e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1559671216-bda69517c47f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1559591937-abc5678da6ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1559591937-c78f24c3d8be?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1664544673673-842a5019123c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          categoryId: 1,
          name: "SmartWatch",
          description:
            "Stay connected and track your fitness with our latest SmartWatch. With its sleek design and advanced features, it's the perfect companion for your active lifestyle.",
          price: "199.99",
          image: [
            "https://m.media-amazon.com/images/I/71iSHugswGL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/71r1VAMgCEL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61CT0FrntyL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/714maZzLBxL._AC_SL1500_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 1,
          name: "Tablet",
          description:
            "Experience entertainment and productivity like never before with our high-performance Tablet. Whether you're streaming movies or working on the go, it's designed to keep up with your lifestyle.",
          price: "299.99",
          image: [
            "https://m.media-amazon.com/images/I/61EobGaoeaL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/71qK7KLjITL._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/61cFm5eRcdL._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/61h1KyNKFwL._AC_SX466_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 2,
          name: "Jeans",
          description:
            "Discover the perfect fit with our premium Jeans collection. Crafted from high-quality denim, these jeans offer both style and comfort for everyday wear.",
          price: "59.99",
          image: [
            "https://m.media-amazon.com/images/I/71xLxpAetiL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/61TkW3T9oDL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/71cb1Tly2WL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/91oSHxy-xpL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/91xDjLhH4UL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/51SWA-g+noL._AC_SX679_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 2,
          name: "Dress",
          description:
            "Make a statement with our elegant Dress collection. From casual day dresses to glamorous evening gowns, we have the perfect option for every occasion.",
          price: "79.99",
          image: [
            "https://m.media-amazon.com/images/I/41MG+sMkaLL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/61GhNFlOZBL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/61m+J-MgcYL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/617KY2EgnaL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/61zcbJGJOVL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/61kREW8saHL._AC_SY550_.jpg",
            "https://m.media-amazon.com/images/I/61S2hNmuCHL._AC_SY550_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 3,
          name: "Running Shoes",
          description:
            "Step up your fitness game with our lightweight and durable Running Shoes. Designed for comfort and performance, they'll help you reach new milestones with every stride.",
          price: "89.99",
          image: [
            "https://m.media-amazon.com/images/I/61RFlIUeaIL._SL1110_.jpg",
            "https://m.media-amazon.com/images/I/71zoQu-f+6L._SL1280_.jpg",
            "https://m.media-amazon.com/images/I/51AmOlt2uNL._SL1110_.jpg",
            "https://m.media-amazon.com/images/I/51fFRkf63LL._SL1110_.jpg",
            "https://m.media-amazon.com/images/I/51U9x-0TQbL._SL1110_.jpg",
            "https://m.media-amazon.com/images/I/51Tp+j1MjPL._SL1110_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 3,
          name: "Sneakers",
          description:
            "Complete your casual look with our stylish Sneakers. Whether you're hitting the gym or exploring the city streets, these sneakers offer both comfort and versatility.",
          price: "69.99",
          image: [
            "https://m.media-amazon.com/images/I/51h2rFFmswL._AC_SY695_.jpg",
            "https://m.media-amazon.com/images/I/51Fs+IbIZvL._AC_SY695_.jpg",
            "https://m.media-amazon.com/images/I/71VxBR2sNEL._AC_SY695_.jpg",
            "https://m.media-amazon.com/images/I/518ml-kXQ5L._AC_SY695_.jpg",
            "https://m.media-amazon.com/images/I/61rzleGgzHL._AC_SY695_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 4,
          name: "Headphones",
          description:
            "Immerse yourself in music with our premium Headphones. With crystal-clear sound and comfortable design, they're perfect for long listening sessions at home or on the go.",
          price: "129.99",
          image: [
            "https://m.media-amazon.com/images/I/71A2MkKuuWL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/71hRAKSQaQL._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/71Ch0TAa2xL._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/81BsWiGz5xL._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/71BzmWx2tdL._AC_SX466_.jpghttps://m.media-amazon.com/images/I/713REgh0++L._AC_SX466_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          categoryId: 4,
          name: "Bluetooth Speaker",
          description:
            "Take your music anywhere with our portable Bluetooth Speaker. With its compact size and powerful sound, it's the ultimate accessory for outdoor adventures and indoor gatherings.",
          price: "79.99",
          image: [
            "https://m.media-amazon.com/images/I/811N1pHc8PL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/71nJIRV6lZL._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/71BZNyl3k0L._AC_SX466_.jpg",
            "https://m.media-amazon.com/images/I/71IDlsRoZPL._AC_SX466_.jpg",
          ],
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      ]);

      if (insertProducts.rowCount === 0) {
        throw new Error("Unable to insert any products.");
      }
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(String(error));
  }
}
