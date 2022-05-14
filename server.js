const express = require("express");
const cors = require("cors");

const app = express();

let userRoutes = require('./routers/user.routes');
let productRoutes = require('./routers/product.routes')
var corsOptions = {
    origin: "http://localhost:8080"
};

// Habilitar cros
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});


app.use('/api',
    userRoutes,
    productRoutes
)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});