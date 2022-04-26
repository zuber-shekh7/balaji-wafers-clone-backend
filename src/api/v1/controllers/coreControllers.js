export const sayHello = (req, res) => {
  return res.status(200).json({
    message: "🙋🏻‍♂️ Hello Developers!",
  });
};
