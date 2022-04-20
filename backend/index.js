//import express module
var express = require("express");
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require("body-parser");
//require express session
var session = require("express-session");
var cookieParser = require("cookie-parser");
// Express form validations
var alert = require("alert");

var { check, validationResult } = require("express-validator");
var swal = require("sweetalert");
var flush = require("connect-flash");
const { urlencoded } = require("body-parser");
//set the view engine to ejs
app.set("view engine", "ejs");
//set the directory of views
app.set("views", "./views");
//specify the path of static directory
app.use(express.static(__dirname + "/public"));
//var cors = require("cors");
const cors = require("cors");
///////////

const Easypost = require("@easypost/api");
const api = new Easypost(
  "EZTK588de10b773847f1b6f66fc88d1f6f28sZwuf7V0hP5SAALkFDF3UQ"
);

//shp_b55e317127a64b4db5956ac863dabbee
//api.Shipment.retrieve("shp_b55e317127a64b4db5956ac863dabbee").then(console.log);

app.use(flush());
//app.use(swal());

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(
  session({
    secret: "cmpe_273_secure_string",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Only user allowed is admin
var Users = [
  {
    username: "admin",
    password: "admin",
  },
];
//By Default we have 3 books
var books = [
  { BookID: "1", Title: "Book 1", Author: "Author 1" },
  { BookID: "2", Title: "Book 2", Author: "Author 2" },
  { BookID: "3", Title: "Book 3", Author: "Author 3" },
];

const addBook = (book_id, title, author) => {
  return { BookID: book_id, Title: title, Author: author };
};

app.get("/getLabel", function (req, res) {
  const values = JSON.parse(req.query.values);
  console.log(values.parcelLength);
  console.log("Here");
  const toAddress = new api.Address({
    name: values.toAddress_name,
    street1: values.toAddress_address,
    city: values.toAddress_city,
    state: values.toAddress_state,
    zip: values.toAddress_zip,
    country: values.toAddress_country,
    phone: values.toAddress_phone,
    email: values.toAddress_email,
  });
  const fromAddress = new api.Address({
    name: values.fromAddress_name,
    street1: values.fromAddress_address,
    city: values.fromAddress_city,
    state: values.fromAddress_state,
    zip: values.fromAddress_zip,
    country: values.fromAddress_country,
    phone: values.fromAddress_phone,
    email: values.fromAddress_email,
  });
  const parcel = new api.Parcel({
    length: null,
    width: null,
    height: null,
    weight: 11,
    mode: "test",
  });

  const customsInfo = new api.CustomsInfo({
    contents_explanation: "",
    contents_type: "merchandise",
    customs_certify: true,
    customs_signer: "Steve Brule",
    non_delivery_option: "return",
    restriction_comments: null,
    restriction_type: "none",
    mode: "test",
    declaration: null,
  });

  const shipment = new api.Shipment({
    carrier_accounts: null,
    service: null,
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    customs_info: customsInfo,
    tax_identifiers: [
      {
        entity: "SENDER",
        tax_id: "GB123456789",
        tax_id_type: "IOSS",
        issuing_country: "GB",
      },
    ],
  });
  let new_res = {};
  const ship_response = async () => {
    return await shipment.save().catch(console.log);
  };

  const final_label = async () => {
    await ship_response().then((resp) => {
      api.Shipment.retrieve(resp.id)
        .then((s) => {
          s.buy(s.lowestRate(), 249.99)
            .then((resp) => {
              api.Shipment.retrieve(resp.id).then((shipment) => {
                shipment.convertLabelFormat("PDF").then((response) => {
                  console.log(response);
                  res.status(200).send(response).end();
                });
              });
            })
            .catch(console.log());
        })

        .catch(console.log);
    });
  };

  console.log("##########################");

  final_label();
});

var server = app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
