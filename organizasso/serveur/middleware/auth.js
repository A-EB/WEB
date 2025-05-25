
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  next();
};

export default requireLogin;
