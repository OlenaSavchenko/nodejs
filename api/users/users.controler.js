const User = require("./users.model");
const { verifyToken } = require("../../services/token.service");

const getCurrentUserController = async (res, req, next) => {
  try {
    // 1. витягнути токен користувача з заголовка Authorization
    const authorizationHeader = req.get("Authorization") || "";
    const token = authorizationHeader.replace("Bearer ", "");

    // 2. витягнути id користувача з пейлоада або повернути користувачу
    // помилку зі статус кодом 401
    let userId;
    try {
      verifyToken(token).id;
    } catch (e) {
      //   return res.status(401).send("Not authorized");
      console.log(e);
    }

    // 3. витягнути відповідного користувача. Якщо такого немає - викинути
    // помилку зі статус кодом 401
    // User - модель користувача в нашій системі
    const user = await User.findUserById(userId);

    if (!user || user.token !== token) {
      return res.status(401).send("Not authorized");
    }

    res.status(200).json({
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUserController,
};
