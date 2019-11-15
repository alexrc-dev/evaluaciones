const adminId = "29eb1b10-00f6-11ea-acb8-dd871cf880b9";
export default function (req, res, next) {
    if (req.session.userId !== adminId) {
        res.status(401).send("Not Authorized Access");
        return;
    }
    next();
}