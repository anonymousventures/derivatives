var jsdom = require("jsdom");
 var window = jsdom.jsdom().createWindow();
 var $ = require('./node_modules/jquery/dist/jquery')(window);
 var crypto = require('crypto');
 var fs = require('fs');
 var binary = require('binary');

 var mongoose = require('mongoose');

bitcoin = require('bitcoin');
var moment = require('moment');



//packages for website
var express = require('express'),
    socketio = require('socket.io'),
    app = express();
var csrf = express.csrf();
http = require('http');
var fs = require('fs');
var https = require('https');
var server = http.createServer(app);
var engines = require('consolidate');
var https = require('https');
var MongoStore = require('connect-mongo')(express);
var sendgrid  = require('sendgrid')('anonymousventures', 'mogulskier');
var Bitfinex = require('bitfinex');
var bitfinex = new Bitfinex('0ZBJrWbWZ8UHJxsV2iR82RB9ISnbwXJNdLMLSf5JIFv', 'RM1RWQcO8H3K1mWOYhIQSgmpVnExznYuYqwH0zPg2FE');
var Bitstamp = require('bitstamp');
var bitstamp = new Bitstamp;


    app.configure(function() {
        app.set('views', __dirname + '/views');
        app.set('port', process.env.PORT || 8080);
        app.set('view engine', 'html');

        app.set('view options', {
            layout: false
        });

        app.engine('.html', engines.handlebars);
        app.use(express.json());
            app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser('asdfsecret'));
        app.use(express.cookieSession());


        var conditionalCSRF = function (req, res, next) {
          //compute needCSRF here as appropriate based on req.path or whatever
          if ( req.path.indexOf('buy_order')!= -1  || req.path.indexOf('ask')!= -1 || req.path.indexOf('change_password')!= -1 || req.path.indexOf('exercise')!= -1 || req.path.indexOf('cancel_order')!= -1) {
            csrf(req, res, next);
          } else {
            next();
          }
        }

        app.use(conditionalCSRF);

        //app.use(express.csrf());
        // changed app.use(express.session({ secret: 'asdfsecret'}));
        //var db = mongoose.createConnection("mongodb://localhost/helloExpress");
        var testMongooseDb = mongoose.createConnection('mongodb://localhost/helloExpress');
        //var options_with_mongoose_connection = { mongoose_connection: testMongooseDb.connections[0] };
        app.use(express.session({
            secret: 'secretdawg',
            store: new MongoStore({
                mongoose_connection: testMongooseDb
            })
        }));

        //app.use(express.favicon());
        app.use(express.static(__dirname + "/public"));
        //app.use(express.static(__dirname + "/public/withdraw"));
        app.use(app.router);
        //app.use(express.static(__dirname + "/views"));

    });




TRANSACTION_FEE = 1;
LOOSER_BACK = 1;


mongoose.connect("mongodb://localhost/helloExpress");



var Contract = new mongoose.Schema({
    expiration_time: Number,
    start_time: Number,
    option_type: String,
    strike_price: Number,
    initial_margin: Number,
    maintenance_margin: Number,
    variation_margin: Number,
    max_price_change: Number,
    full_symbol: String,
    short_symbol: String,
    fees: Number,
    balance: { type: Number, default: 0},
});

var ContractRef = new mongoose.Schema({
    contract_number: Number,
    expiration_group: Number,
    expiration_time: Number,
    start_time: Number,
    option_type: String,
    strike_price: Number,
    initial_margin: Number,
    maintenance_margin: Number,
    variation_margin: Number,
    max_price_change: Number,
    full_symbol: String,
    short_symbol: String,
    fees: Number,
    balance: { type: Number, default: 0},
});


var User = new mongoose.Schema({
    email: String,
    password: String,
    full_name: String,
    hash: String,
    activated: { type: Boolean, default: false},
    deposits: [{ type: mongoose.Schema.ObjectId, ref: 'Deposit' }],
    withdrawals: [{ type: mongoose.Schema.ObjectId, ref: 'Withdrawal' }],
    orders: [{ type: mongoose.Schema.ObjectId, ref: 'Order' }],
    deposit_address: String,
    balance: { type: Number, default: 0},
    available_balance: { type: Number, default: 0},
    pending_deposits: { type: Number, default: 0},
    pending_withdrawals: { type: Number, default: 0},
    current_margin: { type: Number, default: 0},
    maintenance_margin: { type: Number, default: 0},
    in_positions: { type: Number, default: 0},
    in_orders: { type: Number, default: 0},
    in_orders_non_margin: { type: Number, default: 0},
    login_attempts: [Number],
    BUSD1: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD2: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD3: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD4: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD5: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD6: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD7: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD8: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD9: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD10: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD11: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD12: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD13: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD14: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD15: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD16: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD17: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD18: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD19: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD20: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD21: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD22: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD23: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD24: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD25: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD26: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD27: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD28: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD29: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD30: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD31: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD32: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD33: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD34: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD35: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD36: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD37: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD38: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD39: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD40: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD41: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD42: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD43: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD44: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD45: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD46: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD47: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD48: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD49: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD50: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD51: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD52: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD53: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD54: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD55: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD56: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD57: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD58: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD59: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD60: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD61: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD62: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD63: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD64: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD65: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD66: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD67: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD68: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD69: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD70: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD71: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD72: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD73: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD74: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD75: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD76: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD77: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD78: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
BUSD79: { type: mongoose.Schema.ObjectId, ref: 'Contract' },
});


for (i=0; i<80; i++){

    //console.log('BUSD' + i + ': { type: mongoose.Schema.ObjectId, ref: \'Contract\' },')

}


var Deposit = new mongoose.Schema({
    time: Number,
    amount: Number,
    deposit_address: String,
    status: String,
    pending: { type: Boolean, default: true},
    txid: String,
});

var Withdrawal = new mongoose.Schema({
    time: Number,
    txid: String,
    amount: Number,
    fee: Number,
    receiving_address: String,
    status: String,
    pending: { type: Boolean, default: true},
    hash: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});


var VariationMargin = new mongoose.Schema({
    time: Number,
    order:  { type: mongoose.Schema.ObjectId, ref: 'Order' },
    amount: Number
});

var Order = new mongoose.Schema({
    time: Number,
    last_trade_time: Number,
    expiration_time: Number,
    start_time: Number,
    order_number: Number,
    option_type: String,
    side: String,
    price: Number,
    strike_price: Number,
    quantity_original: Number,
    quantity: Number,
    quantity_left: Number,
    initial_margin: Number,
    maintenance_margin: Number,
    variation_margin: [{ type: mongoose.Schema.ObjectId, ref: 'VariationMargin' }],
    btc_prices: [Number],
    max_price_change: Number,
    full_symbol: String,
    short_symbol: String,
    fees: String,
    pending: String,
    net_variation:  { type: Number, default: 0},
    buyer:  { type: mongoose.Schema.ObjectId, ref: 'User' },
    seller: { type: mongoose.Schema.ObjectId, ref: 'User' },
    opposing_orders: [{ type: mongoose.Schema.ObjectId, ref: 'Order' }]
});

var OrderData = new mongoose.Schema({
    time: Number,
    full_symbol: String,
    short_symbol: String,
    price: Number,
    quantity: Number
    });

VariationMargin = mongoose.model('VariationMargin', VariationMargin);
Contract = mongoose.model('Contract', Contract);
User = mongoose.model('User', User);
Deposit = mongoose.model('Deposit', Deposit);
Withdrawal = mongoose.model('Withdrawal', Withdrawal);
Order = mongoose.model('Order', Order);
OrderData = mongoose.model('OrderData', OrderData);
ContractRef = mongoose.model('ContractRef', ContractRef);




var bitcoin_client = new bitcoin.Client({
  host: '127.0.0.1',
  port: 12341,
  user: 'dogecoinrpc',
  pass: '8FZDgUAy81XtZbERtPW37G9AUG89ShgLJQTcpuHFhCrN'
});



prefix = 'http://localhost:8080/';
//prefix = 'http://ec2-54-186-16-187.us-west-2.compute.amazonaws.com/';

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log('ugh ' + data);
  });
});

var ip = require("ip");
console.dir ( ip.address() );



app.get('/register', function(req,res){

res.render('register.html');

});

app.get('/login', function(req,res){

res.render('login.html');

});

app.get('/forgot', function(req,res){

res.render('forgot.html');

});


app.get('/market/:short_symbol', csrf, function(req,res){

if (req.session.activated ){

short_symbol = req.params.short_symbol

//csrf = req.session._csrf;
console.log('csrf ' + req.session._csrf);

current_time = new Date().getTime()/1000;
one_day_ago = current_time - (60 * 60 * 24 * 1000);

bitstamp.ticker(function(err, ticker) {
Order.find({$and:[{short_symbol: short_symbol}, {pending: 'pending'}, {side: 'ask'}, {pending: {'$ne': 'cancelled' }}]}).sort({price: 1}).exec( function(err, pending_asks){
Order.find({$and:[{short_symbol: short_symbol}, {pending: 'pending'}, {side: 'bid'}, {pending: {'$ne': 'cancelled' }}]}).sort({price: -1}).exec(function(err, pending_bids){
//find all orders within past day
Order.find({$and:[{short_symbol: short_symbol}, {time: {$gte: one_day_ago}}, {pending: {'$ne': 'cancelled' }}]}, function(err, orders_within_day){
//find last order
OrderData.findOne({$and:[{short_symbol: short_symbol, time: {$gte: one_day_ago }}]}).sort('-last_trade_time').limit(1).exec(function(err, last_order){
//find lowest price in 24 hours
OrderData.findOne({$and:[{short_symbol: short_symbol, time: {$gte: one_day_ago }}]}).sort({price: 1}).limit(1).exec(function(err, lowest_order){
//find highest price in 24 hours
OrderData.findOne({$and:[{short_symbol: short_symbol, time: {$gte: one_day_ago }}]}).sort({price: -1}).limit(1).exec(function(err, highest_order){

Contract.findOne({short_symbol: short_symbol}, function(err, contract){
User.findOne({email: req.session.user.email}, function (err, user) {
available_balance = user.available_balance;
maintenance_margin = user.maintenance_margin;


if (last_order == null){
last_price = null;
low_price = null;
high_price = null;
volume = 0;
}
else{
last_price = last_order.price;
low_price = lowest_order.price;
high_price = highest_order.price;

volume = 0;
$.each(orders_within_day, function(key,val){

volume += (val.quantity - val.quantity_left);

});

volume = volume/2;
console.log('volume ' + volume);
console.log('pending asks ' + pending_asks);
console.log('pending bids ' + pending_bids);

}


OrderData.find({short_symbol: short_symbol}).sort({time: 1}).exec(function(err, order_data){
//console.log('fucked ' + order_data);
object = new Object();

$.each(order_data, function(key,val){
minute_grouping = Math.floor(new Date(val.time).getTime()/ (1000 * 60));


if (object[minute_grouping] === undefined){
    subarray = new Array();
    subarray.push(val);
    object[minute_grouping] = subarray;
}
else{
    subarray = object[minute_grouping];
    subarray.push(val);
    object[minute_grouping] = subarray;
}


});

console.log('sharray ' + JSON.stringify(object));

chart_array = new Array();

$.each(object, function(key,val){

volume = 0;
$.each(val, function(keyb,valb){

volume += valb.quantity;
if (keyb == 0){
lowest_price = valb.price;
highest_price = valb.price;
open_price = valb.price;
}
else{
if (valb.price > highest_price)
    highest_price = valb.price;
if (valb.price < lowest_price)
    lowest_price = valb.price;
}

if (keyb == val.length -1){
close_price = valb.price;
}
});
subobject = new Object();
subobject.low = lowest_price;
subobject.high = highest_price;
subobject.open = open_price;
subobject.close = close_price;
subobject.volume = volume;
subobject.date = key * 1000 * 60;

chart_array.push(subobject);


});
if (pending_asks.length == 0)
    pending_asks = null;
if (pending_bids.length == 0 )
    pending_bids = null;

console.log('\r\n');
console.log(JSON.stringify(chart_array));
console.log(volume);
console.log(last_price);
console.log(low_price);
console.log(high_price);
console.log(pending_asks);
console.log(pending_bids);
console.log('available balance ' + available_balance);
console.log(' contract ' + JSON.stringify(contract));
console.log('chart info ' + JSON.stringify(chart_array));

if (last_price == null)
    last_price = 0;
if (low_price == null)
    low_price = 0;
if (high_price == null)
    high_price = 0;



res.render('trade.html', {user: JSON.stringify(user),last_bitstamp: ticker.last, maintenance_margin: maintenance_margin, available_balance: available_balance, contract: JSON.stringify(contract), chart_info: JSON.stringify(chart_array), csrf: JSON.stringify(req.session._csrf), volume: volume, last_price: last_price, low_price: low_price, high_price: high_price, pending_asks: JSON.stringify(pending_asks), pending_bids: JSON.stringify(pending_bids)});




});


});

});
});
});
});


});
});
});

});

}
else{

res.redirect(prefix + 'login');

}



});



function process_variation(){

//get all orders that have some amount in positions
Order.find({pending: {'$ne': 'cancelled' }}).populate('buyer seller').exec(function(err, orders){

$.each(orders, function(key,val){
in_positions = val.quantity - val.quantity_left;
if (in_positions > 0){

console.log("the order ");
//console.log(val);

//calculate variation margin
bitstamp.ticker(function(err, trades) {
current_price = parseFloat(trades.last);
last_index = val.btc_prices.length -1;
last_price = val.btc_prices[last_index];
current_price = 800;
variation = 10/ (current_price - last_price) * in_positions;
console.log('the val ' + key + ' ' + val);
console.log('variation ' + key + variation); 

//if it is the buyer
if (val.side == 'bid'){
function callback(){}

variation_margin = new VariationMargin({
    time: new Date().getTime(),
    order: val,
    amount: variation
});

val.buyer.update({$inc: {balance: variation, available_balance: variation}}, { w: 1 }, callback);
Order.findByIdAndUpdate(val._id, {$push: {variation_margin: variation_margin}}, function(err,  order){
    console.log(order);
});
//val.variation_margin.push(variation_margin);


}
//if it is the seller
else{

function callback(){}

variation_margin = new VariationMargin({
    time: new Date().getTime(),
    order: val,
    amount: -1 * variation
});

val.seller.update({$inc: {balance: -1 * variation, available_balance: -1 * variation}}, { w: 1 }, callback);
Order.findByIdAndUpdate(val._id, {$push: {variation_margin: variation_margin}});


}

});


}



});



});





}


app.get('/process_variation', function(req,res){

console.log('ugh');

//get all orders that have some amount in positions
Order.find({$and: [{pending: {'$ne': 'cancelled' }}, {pending: {'$ne': 'expired' }}, {pending: {'$ne': 'exercised' }} ]}).populate('buyer seller').exec(function(err, orders){

$.each(orders, function(key,val){
in_positions = val.quantity - val.quantity_left;
if (in_positions > 0){

//console.log("the order ");
//console.log(val);

//calculate variation margin
(function(val, in_positions){
bitstamp.ticker(function(err, trades) {
current_price = parseFloat(trades.last);
last_index = val.btc_prices.length -1;
last_price = val.btc_prices[last_index];

console.log("current priceb " + current_price);
//current_price = 800;
variation = 10/ ((current_price - last_price)* last_price ) * in_positions;
console.log('the val ' + key + ' ' + last_price);
console.log('current price ' + key + ' ' + current_price); 
console.log('last price ' + key + ' ' + last_price); 
yolo = current_price - last_price;
console.log('current price - last price ' + yolo);
console.log('variation ' + key + ' ' +  variation); 


//if it is the buyer
if (val.side == 'bid'){
function callback(){}

variation_margin = new VariationMargin({
    time: new Date().getTime(),
    order: val,
    amount: variation
});

variation_margin.save(function(err){

//console.log(err);

});

//console.log(variation_margin);

val.buyer.update({$inc: {balance: variation, available_balance: variation}}, { w: 1 }, callback);
Order.findByIdAndUpdate(val._id, {$push: {variation_margin: variation_margin}, $inc: {net_variation: variation}}, function(err,order){

    //console.log(order);

});
//val.variation_margin.push(variation_margin);


}
//if it is the seller
else{

console.log('ask');
function callback(){}

variation_margin = new VariationMargin({
    time: new Date().getTime(),
    order: val,
    amount: -1 * variation
});

variation_margin.save(function(err){

//console.log(err);

});

val.seller.update({$inc: {balance: -1 * variation, available_balance: -1 * variation}}, { w: 1 }, callback);
Order.findByIdAndUpdate(val._id, {$push: {variation_margin: variation_margin, $inc: {net_variation: -1 * variation}}}, function(err,order){

    //console.log(order);

});


}

});
}(val, in_positions));


}



});



});




console.log("processed");

});

//for call options only



app.get('/generate_data', function(req,res){


for (var i=0; i<7800; i++){
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

current_time = new Date().getTime();
low_limit = current_time - (60000 * 60 * 24 * 60);

random = getRandomArbitrary(low_limit, current_time);

bid_quantity = getRandomArbitrary(1,15);
bid_price = getRandomArbitrary(.05, .25);


        order_data = new OrderData({
                            time: random,
                            short_symbol: 'BUSD' + (i%78 + 1),
                            price: bid_price,
                            quantity: bid_quantity,
                            initial_margin: .3
        });

        order_data.save(function(err){
            console.log('saveed');

        });
    }

   // });

});

app.get('/make_buy_orders', function(req,res){


var counter = 1;
var i = setInterval(function(){
    // do your thing

    counter++;
    if(counter === 780) {
        clearInterval(i);
    }




req.session.processing = false;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


//maintenance_margin: buy_margin, bid_quantity: bid_quantity, bid_price: bid_price, short_symbol: contract.short_symbol
req.body.maintenance_margin = .3;

req.body.bid_quantity = getRandomArbitrary(1,15);

req.body.bid_price = getRandomArbitrary(.0001, .0005);

req.body.short_symbol = 'BUSD' + (counter%77 + 1);


console.log(req.body.short_symbol);

//req.session.processing = false;
console.log('overhere' + req.session._csrf);
console.log(req.session.processing);

if (req.session.processing == undefined)
    req.session.processing = false;

if (req.session.processing == false){



quantity = req.body.bid_quantity;
price = req.body.bid_price;
bid_price = parseFloat(price);
bid_quantity = parseFloat(quantity);
// maintenance_margin = parseFloat(req.body.maintenance_margin);
// maintenance_margin = bid_price * bid_quantity;
// maintenance_margin_multiplier = 1
//console.log("maintenance margin " + maintenance_margin);

current_price = 660;
maintenance_margin = .4 * (bid_quantity * 10 / current_price);


short_symbol = req.body.short_symbol;


Order.find({$and: [{short_symbol: short_symbol}, {side: 'ask'}, {pending: 'pending'}, {price: {$lte: bid_price}}]}).populate('user').sort({price: 1}).exec(function(err, ask){

console.log('ask ' + ask)
//console.log('sell ordera ' + sell_order);
//console.log('sell orderb ' + sell_order['user']);
//coin_name_one = coin_one_ticker + 'coin';

//gets info for user that submitted the post request, and info on the relevant coins he owns
req.session.user.email = 'i';
User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function (err, user) {


min_order = .00001;

bid_value = bid_price * bid_quantity;

console.log('bid ' + bid_price);
console.log('quantity ' + bid_quantity);
console.log('buyvalue ' + bid_value);

user_balance = user.available_balance;

//formula for intiail margin
initial_margin = 1;
fees = 0;
//total cost

if (user_balance >= fees * bid_quantity + bid_value + maintenance_margin ){

if (ask.length == 0 && quantity > min_order){

console.log("it is in here lol");


function callback(){}
user[short_symbol].update({$inc: {balance: bid_quantity}}, { w: 1 }, callback);
console.log('why user no show  '+ JSON.stringify(user));


console.log("maintenance margin " + maintenance_margin);
console.log('is it a ' + isNaN(maintenance_margin));
console.log(" down ");


//inc_available = parseFloat(fees) * parseFloat(bid_quantity) + parseFloat(bid_value) + parseFloat(maintenance_margin);
inc_available = -1 * (fees * bid_quantity + bid_value + maintenance_margin);
console.log(inc_available);

req.session.user.email = 'i';
User.findOneAndUpdate({email: req.session.user.email}, {$inc: {balance: -1 * fees * bid_quantity, available_balance: inc_available, maintenance_margin: maintenance_margin, in_orders: maintenance_margin, in_orders_non_margin: -1 * bid_value}},function(err, user){

order = new Order({
                time: new Date().getTime(),
                option_type: 'call',
                short_symbol: short_symbol,
                side: 'bid',
                price: price,
                quantity: quantity,
                quantity_original: quantity,
                quantity_left: quantity,
                initial_margin: maintenance_margin,
                buyer: user, 
                pending: 'pending'
});


order.btc_prices.push(current_price);

user.orders.push(order);


user.save(function(err){

});


order.save(function(err){

console.log('order saved');

});



req.session.processing = false;
res.end(JSON.stringify('done'));

//console.log(req.session.processing);





});


}




}
});


//});

  //console.log(trades.last);  
});

}

    
}, 100);

//}



});



app.get('/make_ask', function(req,res){

var counter = 1;
var i = setInterval(function(){
    // do your thing

    counter++;
    if(counter === 780) {
        clearInterval(i);
    }




req.session.processing = false;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


//maintenance_margin: buy_margin, bid_quantity: bid_quantity, bid_price: bid_price, short_symbol: contract.short_symbol
req.body.maintenance_margin = .3;

req.body.ask_quantity = getRandomArbitrary(.001,.005);

req.body.ask_price = getRandomArbitrary(1, 3);

req.body.short_symbol = 'BUSD' + (counter%77 + 1);




//req.session.processing = false;
console.log('overhere' + req.session._csrf);
console.log(req.session.processing_sell);

if (req.session.processing_sell == undefined)
    req.session.processing_sell = false;

if (req.session.processing_sell== false){
req.session.processing_sell = true;


quantity = req.body.ask_quantity;
price = req.body.ask_price;
ask_price = parseFloat(price);
ask_quantity = parseFloat(quantity);
// maintenance_margin = parseFloat(req.body.maintenance_margin);
// maintenance_margin = ask_price * ask_quantity;

//bitstamp.ticker(function(err, trades) {
 maintenance_margin_multiplier = .4
current_price = 650;
maintenance_margin = .4 * (ask_quantity * 10 / current_price);

console.log("maintenance margin " + maintenance_margin);

short_symbol = req.body.short_symbol;


Order.find({$and: [{short_symbol: short_symbol}, {side: 'bid'}, {pending: 'pending'}, {price: {$gte: ask_price}}]}).populate('user').sort({price: -1}).exec(function(err, bid){

console.log('bid ' + bid)
//console.log('sell ordera ' + sell_order);
//console.log('sell orderb ' + sell_order['user']);
//coin_name_one = coin_one_ticker + 'coin';

//gets info for user that submitted the post request, and info on the relevant coins he owns
User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function (err, user) {


min_order = .00001;

contract_balance = user[short_symbol].balance;
initial_margin = user[short_symbol].initial_margin;
ask_value = ask_price * ask_quantity;

console.log('bid ' + ask_price);
console.log('quantity ' + ask_quantity);
console.log('buyvalue ' + ask_value);

user_balance = user.available_balance;

//formula for intiail margin
initial_margin = 1;
fees = .001;
fees = 0;

//total cost

if (user_balance >= fees * ask_quantity + ask_value + maintenance_margin){

if (bid.length == 0 && quantity > min_order){

console.log("it is in here lol");

function callback(){}
user[short_symbol].update({$inc: {balance: -1 * ask_quantity}}, { w: 1 }, callback);

//User.findOneAndUpdate({email: req.session.user.email}, {$inc: {balance: -1 * fees * bid_quantity, available_balance: inc_available, maintenance_margin: maintenance_margin, in_orders: bid_value}},function(err, user){
// inc_available = -1 * (fees * bid_quantity + maintenance_margin);
// console.log(inc_available);


User.findOneAndUpdate({email: req.session.user.email}, {$inc: {in_orders_non_margin: ask_value, in_orders: maintenance_margin, balance: -1 * fees * ask_quantity, available_balance: -1 * (fees * ask_quantity + maintenance_margin), maintenance_margin: maintenance_margin}},function(err, user){

order = new Order({
                time: new Date().getTime(),
                option_type: 'call',
                short_symbol: short_symbol,
                side: 'ask',
                price: price,
                quantity_original: quantity,
                quantity: quantity,
                quantity_left: quantity,
                seller: user,
                pending: 'pending',
                initial_margin: maintenance_margin
});
order.btc_prices.push(current_price);

user.orders.push(order);


user.save(function(err){

});


order.save(function(err){

console.log('order saved');

});



req.session.processing_sell = false;
res.end(JSON.stringify('done'));

//console.log(req.session.processing);





});


}




}
});


});

//});

}

}, 100);


});





app.post('/buy_order',  csrf, function(req,res){
//req.session.processing = false;
console.log('overhere' + req.session._csrf);
console.log(req.session.processing);

if (req.session.processing == undefined)
    req.session.processing = false;

if (req.session.processing == false){
req.session.processing = true;


quantity = req.body.bid_quantity;
price = req.body.bid_price;
bid_price = parseFloat(price);
bid_quantity = parseFloat(quantity);
// maintenance_margin = parseFloat(req.body.maintenance_margin);
// maintenance_margin = bid_price * bid_quantity;
// maintenance_margin_multiplier = 1
//console.log("maintenance margin " + maintenance_margin);

short_symbol = req.body.short_symbol;

ContractRef.findOne({short_symbol: short_symbol}, function(err, contractref){
bitstamp.ticker(function(err, trades) {
current_price = trades.last;
strike_price = contractref.strike_price;

if (current_price < strike_price)
maintenance_margin = .4 * (bid_quantity * 10 / current_price);


short_symbol = req.body.short_symbol;


Order.find({$and: [{short_symbol: short_symbol}, {side: 'ask'}, {pending: 'pending'}, {price: {$lte: bid_price}}]}).populate('user').sort({price: 1}).exec(function(err, ask){

console.log('ask ' + ask)
//console.log('sell ordera ' + sell_order);
//console.log('sell orderb ' + sell_order['user']);
//coin_name_one = coin_one_ticker + 'coin';

//gets info for user that submitted the post request, and info on the relevant coins he owns
User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function (err, user) {


min_order = .00001;

contract_balance = user[short_symbol].balance;
initial_margin = user[short_symbol].initial_margin;
bid_value = bid_price * bid_quantity;

console.log('bid ' + bid_price);
console.log('quantity ' + bid_quantity);
console.log('buyvalue ' + bid_value);

user_balance = user.available_balance;

//formula for intiail margin
initial_margin = 1;
fees = .001;
fees = 0;
//total cost

if (user_balance >= fees * bid_quantity + bid_value + maintenance_margin ){

if (ask.length == 0 && quantity > min_order){

console.log("it is in here lol");


function callback(){}
user[short_symbol].update({$inc: {balance: bid_quantity}}, { w: 1 }, callback);

console.log("maintenance margin " + maintenance_margin);
console.log('is it a ' + isNaN(maintenance_margin));
console.log(" down ");


//inc_available = parseFloat(fees) * parseFloat(bid_quantity) + parseFloat(bid_value) + parseFloat(maintenance_margin);
inc_available = -1 * (fees * bid_quantity + bid_value + maintenance_margin);
console.log(inc_available);

User.findOneAndUpdate({email: req.session.user.email}, {$inc: {balance: -1 * fees * bid_quantity, available_balance: inc_available, maintenance_margin: maintenance_margin, in_orders: maintenance_margin, in_orders_non_margin: -1 * bid_value}},function(err, user){

order = new Order({
                time: new Date().getTime(),
                option_type: 'call',
                short_symbol: short_symbol,
                side: 'bid',
                price: price,
                quantity: quantity,
                quantity_original: quantity,
                quantity_left: quantity,
                initial_margin: maintenance_margin,
                buyer: user, 
                pending: 'pending'
});


order.btc_prices.push(current_price);

user.orders.push(order);


user.save(function(err){

});


order.save(function(err){

console.log('order saved');

});



req.session.processing = false;
res.end(JSON.stringify('done'));

//console.log(req.session.processing);





});


}
else{

//console.log(coin_one_name);
//console.log('coinfucker '  + coin);
//console.log('fucker ' + coin[coin_two_name].balance);

//balance = coin[coin_one_name].balance;
bid_value = bid_price * bid_quantity
bid_value_left = bid_value;
bid_quantity_left = bid_quantity;
user_balance = user.available_balance;

console.log('buy quantity lefta ' + bid_quantity_left);

complete = false;

total = 0;



$.each(ask, function(key,val){
ask_value = val.price * val.quantity_left;
ask_order_id = val._id;
ask_price = val.price;
ask_quantity_left = val.quantity_left;
purchase_cost = bid_quantity_left * val.price;
partial_maintenance_margin = .4 * (bid_quantity_left * 10 / current_price);
ask_maintenance_margin = .4 * (ask_quantity_left * 10 / current_price);
maintenance_margin_multiplier = .4;

(function(ask_value, ask_order_id, ask_price, ask_quantity_left, key, purchase_cost, partial_maintenance_margin, ask_maintenance_margin, maintenance_margin_multiplier){
if (!complete ){
    if (ask_quantity_left >= bid_quantity_left){
        console.log('figure 1 ' + ask_quantity_left); 
        console.log('figure 1 ' + bid_quantity_left);

        quantity_left = ask_quantity_left - bid_quantity_left;
        //update sell order

        if (ask_quantity_left == bid_quantity_left)
            Order.findByIdAndUpdate(ask_order_id, {$set: {quantity_left: quantity_left, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){

            });
        else
            Order.findByIdAndUpdate(ask_order_id, {$set: {quantity_left: quantity_left, last_trade_time: new Date().getTime()}}, function(err, order){

            });

        //create buy order record and update balance
        User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function(err, user){

        //buy_quantity_left = buy_value_left / buy_price;
        //update buyer balance

        console.log('buy quantity left ' + key + ' ' + bid_quantity_left);
        console.log('purchase cost ' + key + ' ' + ask_value);
        fee_total = fees * bid_quantity;

        //User.findById(val['seller']).populate(short_symbol).exec(function(err, seller){
        user[short_symbol].update({$inc: {balance: bid_quantity_left}}, { w: 1 }, callback);
        user.update({$inc: {in_positions: partial_maintenance_margin, maintenance_margin: maintenance_margin, balance: -1 * (purchase_cost + fee_total) , available_balance: -1 * ( purchase_cost + fee_total)}}, { w: 1 }, callback);


        function callback(){}
        //done updating buyer balance
        User.findById(val['seller']).populate(short_symbol).exec(function(err, seller){

        time = new Date().getTime();
        order = new Order({
                        time: time,
                        //last_trade_time: new Date().getTime(),
                        short_symbol: short_symbol,
                        side: 'bid',
                        price: bid_price,
                        quantity_original: bid_quantity,
                        quantity: bid_quantity,
                        quantity_left: 0,
                        seller: seller,
                        buyer: user,
                        pending: 'complete',
                        initial_margin: maintenance_margin
        });


        console.log('point 1  ' + key + ' ' + val);

        $.each(ask, function(keyb, valb){
        if (keyb <= key)
        order.opposing_orders.push(valb);
        });

        console.log('test 1 ' + order);
        order.btc_prices.push(current_price);

        order_data = new OrderData({
                            time: time,
                            short_symbol: short_symbol,
                            price: ask_price,
                            quantity: bid_quantity_left,
        });

        order_data.save(function(err){

        });

        user.orders.push(order);


        user.save(function(err){

        });


        order.save(function(err){

        console.log('order saved');

        });



        //update balance on seller

        //console.log('sell order user ' + sell_order);

            //console.log('dasell ' + seller);
            console.log('buy quantity left ' + bid_quantity_left);
            console.log('buy value left ' + bid_value_left);

            purchase_cost = bid_quantity_left * val.price;

            seller.update({$inc: { in_positions: partial_maintenance_margin, in_orders: -1 * partial_maintenance_margin, balance: purchase_cost, available_balance: purchase_cost, in_orders_non_margin: -1 * purchase_cost}}, { w: 1 }, function(err){

                seller[short_symbol].update({$inc: {balance: -1 * bid_quantity_left}}, { w: 1 }, function(err){

                    console.log('right here dude');
                    req.session.processing = false;
                    res.end('done');

                });

            });

                    });

        });


        complete = true;
    }
    else{
        console.log('figure 2 ' + ask_quantity_left); 
        console.log('figure 2 ' + bid_quantity_left);
        //if sell quantity is less than the buy quantity
        console.log('shit is in elseb');

        //quantity_left = (sell_value - buy_value_left)/sell_price;
        //update sell order
        bid_quantity_left -= ask_quantity_left;

        Order.findByIdAndUpdate(ask_order_id, {$set: {quantity_left: 0, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){


        });

        //create buy order record and update balance
        User.findById(val['seller']).populate(short_symbol).exec(function(err, seller){
        User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function(err, user){

        function callback(){}

        console.log('sell quantity left ' + key + ' ' + ask_quantity_left);
        console.log('sell value ' + key + ' ' + ask_value);
        //update buyer balance
        User.findById(val['seller']).populate(short_symbol).exec(function(err, seller){
        user[short_symbol].update({$inc: {balance: ask_quantity_left}}, { w: 1 }, callback);
        user.update({$set: {seller: seller}, $inc: {in_positions: ask_maintenance_margin, balance: -1 * ask_value, available_balance: -1 * ask_value}}, { w: 1 }, callback);
        //done updating buyer balance
        });

        time = new Date().getTime();

        order_data = new OrderData({
                            time: time,
                            short_symbol: short_symbol,
                            price: ask_price,
                            quantity: ask_quantity_left
        });

        order_data.save(function(err){

        });




        if (key == ask.length -1 ){

            in_orders_non_margin = -1 * bid_quantity_left * bid_price;
            in_orders = maintenance_margin_multiplier * (bid_quantity_left * 10 / current_price);
            user.update({$inc: {in_orders_non_margin: in_orders_non_margin, in_orders: in_orders}}, { w: 1 }, callback);

            order = new Order({
                    time: time,
                    last_trade_time: new Date().getTime(),
                    short_symbol: short_symbol,
                    side: 'bid',
                    price: bid_price,
                    quantity: bid_quantity,
                    quantity_left: bid_quantity_left,
                    buyer: user,
                    pending: 'pending',
                    initial_margin: maintenance_margin
            });

            console.log('point 2 ' + key + ' ' + val);

            $.each(ask, function(keyb, valb){
            if (keyb <= key)
            order.opposing_orders.push(valb);
            });

            console.log('test 2 ' + order);
            order.btc_prices.push(current_price);
            user.orders.push(order);


            user.save(function(err){

            });


            order.save(function(err){

            console.log('order saved');

            });


        }




        });

        //update balance on seller

            seller[short_symbol].update({$inc: {balance: -1 * ask_quantity_left}}, { w: 1 }, function(err){

                seller.update({$inc: {in_positions: ask_maintenance_margin, in_orders: -1 * ask_maintenance_margin, balance: ask_value, available_balance: ask_value, in_orders_non_margin: -1 * ask_value}}, { w: 1 }, function(err){

                    req.session.processing = false;
                    res.end('done');
                });

            });


        });


    }






}
}(ask_value, ask_order_id, ask_price, ask_quantity_left, key, purchase_cost, partial_maintenance_margin, ask_maintenance_margin, maintenance_margin_multiplier));


});



}




}
});


});

  console.log(trades.last);  
});
});


}



});




app.post('/ask',  csrf, function(req,res){
//req.session.processing = false;
console.log('overhere' + req.session._csrf);
console.log(req.session.processing_sell);

if (req.session.processing_sell == undefined)
    req.session.processing_sell = false;

if (req.session.processing_sell== false){
req.session.processing_sell = true;


quantity = req.body.ask_quantity;
price = req.body.ask_price;
ask_price = parseFloat(price);
ask_quantity = parseFloat(quantity);
// maintenance_margin = parseFloat(req.body.maintenance_margin);
// maintenance_margin = ask_price * ask_quantity;
ContractRef.findOne({short_symbol: short_symbol}, function(err, contractref){
bitstamp.ticker(function(err, trades) {
maintenance_margin_multiplier = .4
current_price = trades.last;

strike_price = contractref.strike_price;

if (current_price < strike_price)
maintenance_margin = .4 * (ask_quantity * 10 / current_price);
else{
in_the_money = 10/ (current_price - strike_price) * ask_quantity;
fourty_percent_change = .4 * (ask_quantity * 10 / current_price);
maintenance_margin = in_the_money + fourty_percent_change;


}



console.log("maintenance margin " + maintenance_margin);

short_symbol = req.body.short_symbol;


Order.find({$and: [{short_symbol: short_symbol}, {side: 'bid'}, {pending: 'pending'}, {price: {$gte: ask_price}}]}).populate('user').sort({price: -1}).exec(function(err, bid){

console.log('bid ' + bid)
//console.log('sell ordera ' + sell_order);
//console.log('sell orderb ' + sell_order['user']);
//coin_name_one = coin_one_ticker + 'coin';

//gets info for user that submitted the post request, and info on the relevant coins he owns
User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function (err, user) {


min_order = .00001;

contract_balance = user[short_symbol].balance;
initial_margin = user[short_symbol].initial_margin;
ask_value = ask_price * ask_quantity;

console.log('bid ' + ask_price);
console.log('quantity ' + ask_quantity);
console.log('buyvalue ' + ask_value);

user_balance = user.available_balance;

//formula for intiail margin
initial_margin = 1;
fees = .001;
fees = 0;

//total cost

if (user_balance >= fees * ask_quantity + ask_value + maintenance_margin){

if (bid.length == 0 && quantity > min_order){

console.log("it is in here lol");

function callback(){}
user[short_symbol].update({$inc: {balance: -1 * ask_quantity}}, { w: 1 }, callback);

//User.findOneAndUpdate({email: req.session.user.email}, {$inc: {balance: -1 * fees * bid_quantity, available_balance: inc_available, maintenance_margin: maintenance_margin, in_orders: bid_value}},function(err, user){
// inc_available = -1 * (fees * bid_quantity + maintenance_margin);
// console.log(inc_available);


User.findOneAndUpdate({email: req.session.user.email}, {$inc: {in_orders_non_margin: ask_value, in_orders: maintenance_margin, balance: -1 * fees * ask_quantity, available_balance: -1 * (fees * ask_quantity + maintenance_margin), maintenance_margin: maintenance_margin}},function(err, user){

order = new Order({
                time: new Date().getTime(),
                option_type: 'call',
                short_symbol: short_symbol,
                side: 'ask',
                price: price,
                quantity_original: quantity,
                quantity: quantity,
                quantity_left: quantity,
                seller: user,
                pending: 'pending',
                initial_margin: maintenance_margin
});
order.btc_prices.push(current_price);

user.orders.push(order);


user.save(function(err){

});


order.save(function(err){

console.log('order saved');

});



req.session.processing_sell = false;
res.end(JSON.stringify('done'));

//console.log(req.session.processing);





});


}
else{


//console.log(coin_one_name);
//console.log('coinfucker '  + coin);
//console.log('fucker ' + coin[coin_two_name].balance);

//balance = coin[coin_one_name].balance;
ask_value = ask_price * ask_quantity
ask_value_left = ask_value;
ask_quantity_left = ask_quantity;
user_balance = user.available_balance;

console.log('sell quantity lefta ' + ask_quantity_left);

complete = false;

total = 0;


$.each(bid, function(key,val){
bid_value = val.price * val.quantity_left;
bid_order_id = val._id;
bid_price = val.price;
bid_quantity_left = val.quantity_left;
purchase_cost = ask_quantity_left * val.price;
// partial_maintenance_margin = purchase_cost;
// bid_maintenance_margin = bid_value;

partial_maintenance_margin = .4 * (ask_quantity_left * 10 / current_price);
bid_maintenance_margin = .4 * (bid_quantity_left * 10 / current_price);


(function(bid_value, bid_order_id, bid_price, bid_quantity_left, key, purchase_cost, partial_maintenance_margin, bid_maintenance_margin, maintenance_margin_multiplier){
if (!complete ){
    if (bid_quantity_left >= ask_quantity_left){
        quantity_left = bid_quantity_left - ask_quantity_left;
        //update sell order

        if (bid_quantity_left == ask_quantity_left)
            Order.findByIdAndUpdate(bid_order_id, {$set: {quantity_left: quantity_left, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){

            });
        else
            Order.findByIdAndUpdate(bid_order_id, {$set: {quantity_left: quantity_left, last_trade_time: new Date().getTime()}}, function(err, order){

            });

        //create buy order record and update balance
        User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function(err, user){

        //buy_quantity_left = buy_value_left / buy_price;


        //update buyer balance


        console.log('buy quantity left ' + key + ' ' + ask_quantity_left);
        console.log('purchase cost ' + key + ' ' + bid_value);
        fee_total = fees * ask_quantity;

        user[short_symbol].update({$inc: {balance: ask_quantity_left}}, { w: 1 }, callback);
        user.update({$inc: {in_positions: partial_maintenance_margin, maintenance_margin: maintenance_margin, balance: purchase_cost - fee_total , available_balance: purchase_cost - fee_total - maintenance_margin}}, { w: 1 }, callback);

        function callback(){}
        //done updating buyer balance

        time = new Date().getTime();
        order = new Order({
                        time: time,
                        //last_trade_time: new Date().getTime(),
                        short_symbol: short_symbol,
                        side: 'ask',
                        price: ask_price,
                        quantity_original: ask_quantity,
                        quantity: ask_quantity,
                        quantity_left: 0,
                        seller: user,
                        pending: 'complete',
                        initial_margin: maintenance_margin
        });

        order.btc_prices.push(current_price);

        order_data = new OrderData({
                            time: time,
                            short_symbol: short_symbol,
                            price: bid_price,
                            quantity: ask_quantity_left,
                            initial_margin: maintenance_margin
        });

        order_data.save(function(err){

        });

        user.orders.push(order);


        user.save(function(err){

        });


        order.save(function(err){

        console.log('order saved');

        });

        });

        //update balance on buyer

        //console.log('sell order user ' + sell_order);
        User.findById(val['buyer']).populate(short_symbol).exec(function(err, buyer){
            //console.log('dasell ' + seller);
            console.log('sell quantity left ' + ask_quantity_left);
            console.log('sell value left ' + ask_value_left);

            purchase_cost = ask_quantity_left * val.price;

            buyer.update({$inc: {in_orders_non_margin: purchase_cost, in_positions: partial_maintenance_margin, in_orders: -1 * partial_maintenance_margin, balance: -1 * purchase_cost}}, { w: 1 }, function(err){

                buyer[short_symbol].update({$set:{seller: user}, $inc: {balance: ask_quantity_left}}, { w: 1 }, function(err){

                    console.log('right here dude');
                    req.session.processing_sell = false;
                    res.end('done');

                });

            });



        });


        complete = true;
    }
    else{
        //if sell quantity is less than the buy quantity
        console.log('shit is in elseb');

        //quantity_left = (sell_value - buy_value_left)/sell_price;
        //update sell order
        ask_quantity_left -= bid_quantity_left;

        //ended here

        Order.findByIdAndUpdate(bid_order_id, {$set: {quantity_left: 0, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){

        });

        //create buy order record and update balance
        User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function(err, user){

        function callback(){}

        console.log('bid quantity left ' + key + ' ' + bid_quantity_left);
        console.log('bid value ' + key + ' ' + bid_value);
        //update seller balance
        user[short_symbol].update({$inc: {balance: -1 * bid_quantity_left}}, { w: 1 }, callback);
        user.update({$inc: {in_positions: bid_maintenance_margin, balance: bid_value, available_balance: bid_value}}, { w: 1 }, callback);
        //done updating seller ballance

        time = new Date().getTime();

        order_data = new OrderData({
                            time: time,
                            short_symbol: short_symbol,
                            price: bid_price,
                            quantity: bid_quantity_left
        });

        order_data.save(function(err){

        });


        if (key == bid.length -1 ){

            fees = .001;
            fees = 0;
            fee_total = fees * ask_quantity;
            in_orders_non_margin = ask_quantity_left * ask_price;
            in_orders =  maintenance_margin_multiplier *  (ask_quantity_left * 10 / current_price);;
            user.update({$inc: {in_orders: in_orders, available_balance: -1 * ( maintenance_margin + fee_total)}}, { w: 1 }, callback);

            order = new Order({
                    time: time,
                    last_trade_time: new Date().getTime(),
                    short_symbol: short_symbol,
                    side: 'ask',
                    price: ask_price,
                    quantity_original: ask_quantity,
                    quantity: ask_quantity,
                    quantity_left: ask_quantity_left,
                    seller: user,
                    pending: 'pending',
                    initial_margin: maintenance_margin
            });

            order.btc_prices.push(current_price);

            user.orders.push(order);


            user.save(function(err){

            });


            order.save(function(err){

            console.log('order saved');

            });


        }



        });

        //update balance on buyer
        User.findById(val['buyer']).populate(short_symbol).exec(function(err, buyer){
            buyer[short_symbol].update({$inc: {balance: ask_quantity_left}}, { w: 1 }, function(err){

                buyer.update({$set:{seller: user}, $inc: {in_positions: bid_maintenance_margin, in_orders: -1 * bid_maintenance_margin, in_orders_non_margin: bid_value, balance: -1 * bid_value}}, { w: 1 }, function(err){

                    req.session.processing_sell = false;
                    res.end('done');
                });

            });


        });


    }






}
}(bid_value, bid_order_id, bid_price, bid_quantity_left, key, purchase_cost, partial_maintenance_margin, bid_maintenance_margin, maintenance_margin_multiplier));


});



}




}
});


});

});
});


}

});




app.post('/ask_prior', csrf, function(req,res){



console.log( 'ask + \r\n')

if (req.session.processing_sell == undefined)
    req.session.processing_sell = false;

if (req.session.processing_sell == false){
req.session.processing_sell = true;

ask_quantity = req.body.ask_quantity;
ask_price = req.body.ask_price;
console.log(' ap ' + ask_price);

coin_one_name = req.body.coin_name_one;
coin_two_name = req.body.coin_name_two;
coin_one_ticker = req.body.coin_ticker_one
coin_two_ticker = req.body.coin_ticker_two;

console.log('coinone' + coin_one_name);

console.log('coin one ticker ' + coin_one_ticker);
console.log(coin_two_ticker);
//coin_one_ticker = 'doge';
//coin_two_ticker = 'btc';
//price = 100;

Order.find({$and: [{coin_one_ticker: coin_one_ticker}, {coin_two_ticker: coin_two_ticker}, {side: 'bid'}, {pending: 'pending'}, {price: {$gte: ask_price}}]}).populate('user').sort({time: 1}).exec(function(err, bid){

//console.log('sell ordera ' + sell_order);
//console.log('sell orderb ' + sell_order['user']);
//coin_name_one = coin_one_ticker + 'coin';

//gets info for user that submitted the post request, and info on the relevant coins he owns
User.findOne({email: req.session.user.email}).populate(coin_one_name + ' ' + coin_two_name).exec(function (err, coin) {

//console.log('dacoin ' + coin);

//Coin.findOne({code: coin_one_ticker}, function(err, coin){
min_order = .00001;

balance = coin[coin_one_name].balance;
ask_value = ask_price * ask_quantity;

console.log('bid ' + ask_price);
console.log('quantity ' + ask_quantity);
console.log('dabalance ' + balance);
console.log('buyvalue ' + ask_value);


if (balance >= ask_value){
console.log('inside');

if (bid.length == 0 && ask_quantity > min_order){

function callback(){}
coin[coin_one_name].update({$inc: {balance: -1 * ask_quantity * ask_price, held_for_orders: ask_quantity * ask_price}}, { w: 1 }, callback);



console.log("it is in here lol");

User.findOne({email: req.session.user.email}, function(err, user){



order = new Order({
                time: new Date().getTime(),
                coin_one_ticker: coin_one_ticker,
                coin_two_ticker: coin_two_ticker,
                side: 'ask',
                price: ask_price,
                quantity_original: ask_quantity,
                quantity: ask_quantity,
                quantity_left: ask_quantity,
                user: user,
                initial_margin: maintenance_margin
});
order.btc_prices.push(current_price);

user.orders.push(order);


user.save(function(err){

});


order.save(function(err){

console.log('order saved');

});

req.session.processing_sell = false;
res.end('done');

});

}
else{

console.log(coin_one_name);
//console.log('coinfucker '  + coin);
console.log('fucker ' + coin[coin_two_name].balance);



ask_value_left = ask_value;
ask_quantity_left = ask_quantity;

//console.log('sell quantity lefta ' + key + ' ' + ask_quantity_left);

complete = false;

total = 0;

console.log('orignal ask quantity left ' + ask_quantity_left);

$.each(bid, function(key,val){
bid_value = val.price * val.quantity_left;
bid_order_id = val._id;
bid_price = val.price;
bid_quantity_left = val.quantity_left;


(function(bid_value, bid_order_id, bid_price, bid_quantity_left, key){

console.log('here ask quantity left ' + key + ' ' + ask_quantity_left);


if (!complete ){
console.log("fuckingtest" + bid_quantity_left + ' ' + ask_quantity_left);
    if (bid_quantity_left >= ask_quantity_left){
        quantity_left = bid_quantity_left - ask_quantity_left;
        console.log('bid quantity leftb ' + key + ' ' + bid_quantity_left);
        //update bid order
        console.log('yoloa '  + key + ' ' + ask_quantity_left);
        if (bid_quantity_left == ask_quantity_left)
            Order.findByIdAndUpdate(bid_order_id, {$set: {quantity_left: quantity_left, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){

            });
        else
            Order.findByIdAndUpdate(bid_order_id, {$set: {quantity_left: quantity_left, last_trade_time: new Date().getTime()}}, function(err, order){

            });

        //create ask order record and update balance
        User.findOne({email: req.session.user.email}).populate(coin_one_name + ' ' + coin_two_name).exec(function(err, user){

        //buy_quantity_left = buy_value_left / buy_price;


        //update askers balance
        sell_price = ask_quantity_left * bid_price;

        console.log('bid price ' + bid_price);
        console.log('bid quantity leftb ' + bid_quantity_left );
        console.log('yolob '  + key + ' ' + sell_price);
        //console.log('sell price ' + key + ' ' + sell _price);

        user[coin_one_name].update({$inc: {balance: -1 * ask_quantity_left}}, { w: 1 }, callback);
        user[coin_two_name].update({$inc: {balance: sell_price}}, { w: 1 }, callback);

        function callback(){}
        //done updating buyer balance

        time = new Date().getTime();

        order = new Order({
                        time: time,
                        coin_one_ticker: coin_one_ticker,
                        coin_two_ticker: coin_two_ticker,
                        side: 'ask',
                        price: ask_price,
                        quantity: ask_quantity,
                        quantity_left: 0,
                        user: user,
                        pending: 'complete',
                        initial_margin: maintenance_margin
        });
        order.btc_prices.push(current_price);

        order_data = new OrderData({
                            time: time,
                            coin_ticker_one: coin_one_ticker,
                            coin_ticker_two: coin_two_ticker,
                            price: bid_price,
                            quantity: ask_quantity
        });

        order_data.save(function(err){

        });


        user.orders.push(order);


        user.save(function(err){

        });

        order.save(function(err){

        console.log('order saved');

        });

        });

        //update balance on buyer

        //console.log('sell order user ' + sell_order);
        User.findById(val['user']).populate(coin_one_name + ' ' + coin_two_name).exec(function(err, buyer){
            //console.log('dabuy ' + buyer);
            //console.log('buy quantity left ' + bid_quantity_left);
            //console.log('buy value left ' + ask_value_left);

            buyer[coin_one_name].update({$inc: {balance: ask_quantity_left}}, { w: 1 }, function(err){

                buy_price = ask_quantity_left * bid_price;
                buyer[coin_two_name].update({$inc: {balance: -1 * buy_price}}, { w: 1 }, function(err){
                    req.session.processing_sell = false;
                    res.end('done');
                });

            });



        });


        complete = true;
    }
    else{
        //if bid quantity is less than the ask quantity
        console.log('shit is in elseb');

        //quantity_left = (sell_value - buy_value_left)/sell_price;
        //update bid order
        //console.log('bid quantity lefta ' + key + ' ' + bid_quantity_left);

        ask_quantity_left -= bid_quantity_left;
        console.log('elsea ask quantity left ' + key + ' ' + ask_quantity_left);

        Order.findByIdAndUpdate(bid_order_id, {$set: {quantity_left: 0, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){

        });

        //update balance for user that submitted ask order
        User.findOne({email: req.session.user.email}).populate(coin_one_name + ' ' + coin_two_name).exec(function(err, user){

        function callback(){}



        console.log('elseb ask quantity left ' + key + ' ' + ask_quantity_left);

        sell_price = bid_quantity_left * bid_price;


        console.log('bid quantity leftai ' + key + ' ' + bid_quantity_left);

        console.log('bid quantity left ' + bid_quantity_left);
        console.log('bid price ' + bid_price);
        console.log('sell price ' + sell_price);

        //update asker's balance
        user[coin_one_name].update({$inc: {balance: -1 * bid_quantity_left}}, { w: 1 }, callback);
        user[coin_two_name].update({$inc: {balance: sell_price}}, { w: 1 }, callback);
        //done updating  asker's balance

        time = new Date().getTime();


        order_data = new OrderData({
                            time: time,
                            coin_ticker_one: coin_one_ticker,
                            coin_ticker_two: coin_two_ticker,
                            price: bid_price,
                            quantity: bid_quantity_left
        });

        order_data.save(function(err){

        });


        //create ask order after processing last bid
        if (key == bid.length -1 ){


            order = new Order({
                    time: time,
                    coin_one_ticker: coin_one_ticker,
                    coin_two_ticker: coin_two_ticker,
                    side: 'ask',
                    price: ask_price,
                    quantity: ask_quantity,
                    quantity_left: ask_quantity_left,
                    user: user,
                    pending: 'pending',
                    initial_margin: maintenance_margin
            });

            order.btc_prices.push(current_price);
            user.orders.push(order);

            user.save(function(err){

            });


            order.save(function(err){

            console.log('order saved');

            });


        }



        });

        //update balance on bidder
        User.findById(val['user']).populate(coin_one_name + ' ' + coin_two_name).exec(function(err, buyer){
            buyer[coin_one_name].update({$inc: {balance: bid_quantity_left}}, { w: 1 }, function(err){

                //sell_price = bid_quantity_left * bid_price;
                buyer[coin_two_name].update({$inc: {balance: -1 * sell_price}}, { w: 1 }, function(err){
                    req.session.processing_sell = false;
                    res.end('done');
                });

            });


        });


    }





}
}(bid_value, bid_order_id, bid_price, bid_quantity_left, key));

});



}




}
});


});

}




});





app.get('/chart', function(req,res){

res.render("samples/stockMultiplePanels.html");

});

app.get('/chart2', function(req,res){

res.render("samples/chart2.html");

});

app.get('/chart3', function(req,res){

res.render("samples/chart3.html");

});


app.get('/activate/:token', function(req,res){
token = req.params.token;

User.findOneAndUpdate({hash: token},  { $set: { activated: true }}, function(err, user){
if (user != null && user != undefined){

object = new Object();
object.email = user.email;
object.full_name = user.full_name;
object.user_id = user._id;

req.session.activated = true;
req.session.user = object;

res.redirect('/');



}


else{



}

});

});


app.post('/logout', function(req,res){


delete req.session;

res.end('done');


});



app.post('/forgot', function(req,res){

email = req.body.email;

User.findOne({email: email}, function(err, user){
if (user == null)
res.end('incorrect');


else if (user.activated){
console.log('b');
object = new Object();
object.email = user.email;
object.full_name = user.full_name;
object.user_id = user._id;

string = 'Hello! \r\n Your password is: \r\n\r\n ' + user.password;

html = '<p>Hello,<br/>\
    Your password is:<br/>\
    <strong>' + user.password + '</strong></p>';


sendgrid.send({
  to:       req.body.email,
  from:     'info@GenesisBlock.io',
  subject:  'GenesisBlock - Password Reminder',
  text:     string,
  html: html
}, function(err, json) {

  if (err) { return console.error(err); }
});



res.end(JSON.stringify(user));

}

else {
console.log('c');
    res.end('unactivated');
}


});

});


app.post('/change_password', csrf, function(req,res){
new_pass = req.body.password;



if (req.session.activated && req.session.user.email == req.body.email){

User.findOneAndUpdate({email: email},{$set: {password: new_pass}},function(err, user){

console.log("password updated");
res.end('done');

});


}

});

app.post('/login', function(req,res){

email = req.body.email;
password = req.body.password;

User.findOne({email: email}, function(err, user){

if (user.activated == false){

    res.end('Not activated yet. Please search both inbox and spam for activation email');

}
else{

current_time = new Date().getTime();
count = 0;

if (user.login_attempts.length > 7 ){

index = user.login_attempts.length - 6;
subarray = user.login_attempts.slice(index);

$.each(subarray, function(key,val){

if (current_time - val < 120000)
    count++;

});


}



if (count < 5  && user.password == req.body.password){

object = new Object();
object.email = user.email;
object.full_name = user.full_name;
object.user_id = user._id;

req.session.activated = true;
req.session.user = object;

res.end('correct');

}
else if (count < 5 && user.password != req.body.password){

user.login_attempts.push(current_time);
user.save(function(err){
console.log("updated");
});

res.end('Incorrect Password!');

}
else if (count >= 5 && user.password == req.body.password){

res.end('You tried to login more than 5 times in the past 2 minutes. Please wait 2 minutes and try again.');

}
else if (count >= 5 && user.password != req.body.password){

res.end('You tried to login more than 5 times in the past 2 minutes. Please wait 2 minutes and try again.');

}


}



});


});


app.post('/register', function(req,res){
body = req.body;

console.log(body);

User.findOne({email: body.email}, function(err, user){

console.log(user);
if (user != null){

if (user.activated == false)
res.end('1');
else
res.end('2');

}
else{
require('crypto').randomBytes(48, function(ex, buf) {
    token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');

    activation_url = prefix + 'activate/' + token;


    console.log(token);
    user = new User({
                full_name: body.full_name,
                email: body.email,
                password: body.password,
                hash: token
    });
    user.save(function(err){
        console.log('user has been saved');

string = 'Welcome! \r\n Please activate your account by clicking the\
             link below: \r\n\r\n ' + prefix + 'activate/' + token;

html = '<p>Hello,<br />\
    Welcome to GenesisBlock. The following is your activation link:<br/><br/>\
    <strong>' + prefix + 'activate/' + token + '</strong></p>';


sendgrid.send({
  to:       body.email,
  from:     'info@GenesisBlock.io',
  subject:  'GenesisBlock - cryptocurrency exchange account activation',
  text:     string,
  html: html
}, function(err, json) {

  if (err) { return console.error(err); }
});

  res.end("done"); 





bitcoin_client.getNewAddress(function(err, address) {


expiration_times = new Array(1404259200000, 1404950400000, 1407628800000, 1410307200000, 1412899200000, 1418169600000, 1425945600000, 1436486400000)

counter = 0;
$.each(expiration_times, function(key,val){


for (i = 5; i<15; i++){
counter++;
strike_price = i * 100;    
date = new Date(val);
day = date.getDate();
month = date.getMonth() +1;
year = date.getYear().toString();
year = year.substr(1, year.length);

short_symbol = 'BUSD' + counter;
contract = new Contract({
    contract_number: counter,
    expiration_group: key,
    expiration_time: val, 
    start_time: 1435708800000, //july 1st
    option_type: 'call',
    strike_price: strike_price,
    initial_margin: .3,
    maintenance_margin: .3,
    variation_margin: .3,
    max_price_change: .3,
    full_symbol: 'BTC/USD-' + day + '/' + month +'/' + year + '-' + strike_price,
    short_symbol: short_symbol,
    fees: .01,
});

contract.save(function(err){

});
obj = new Object();
obj.deposit_address = address;
obj[short_symbol] = contract;


User.findOneAndUpdate({hash: token}, {$set: obj },function(err, user){
console.log("added deposit address to user: " + JSON.stringify(user));
console.log("edited");

});


}


});









});



});





}); 
}

});

});

date = new Date().getTime();
date = new Date(date);
day = date.getDate();
console.log(day);


app.get('/save_contracts', function(req,res){


expiration_times = new Array(1404259200000, 1404950400000, 1407628800000, 1410307200000, 1412899200000, 1418169600000, 1425945600000, 1436486400000)

counter = 0;
$.each(expiration_times, function(key,val){


for (i = 5; i<15; i++){
counter++;
strike_price = i * 100;    
date = new Date(val);
day = date.getDate();
month = date.getMonth() +1;
year = date.getYear().toString();
year = year.substr(1, year.length);



new ContractRef({
    contract_number: counter,
    expiration_group: key,
    expiration_time: val, 
    start_time: 1435708800000, //july 1st
    option_type: 'call',
    strike_price: strike_price,
    initial_margin: .3,
    maintenance_margin: .3,
    variation_margin: .3,
    max_price_change: .3,
    full_symbol: 'BTC/USD-' + day + '/' + month +'/' + year + '-' + strike_price,
    short_symbol: 'BUSD' + counter,
    fees: .01,
}).save(function(err){

});


}


});

/*
contract_one = new ContractRef({
    expiration_time: 1402358400000, //june 10th
    start_time: 1399680000000, //may 10th already started
    option_type: 'call',
    strike_price: 700,
    initial_margin: 2,
    maintenance_margin: 2,
    variation_margin: 1,
    max_price_change: .15,
    full_symbol: 'opt_one',
    short_symbol: 'opt_one',
    fees: .01,
});

contract_two = new ContractRef({
    expiration_time: 1402358400000, //june 10th
    start_time: 1399680000000, //may 10th already started
    option_type: 'call',
    strike_price: 700,
    initial_margin: .3,
    maintenance_margin: 2,
    variation_margin: 1,
    max_price_change: .15,
    full_symbol: 'opt_two',
    short_symbol: 'opt_two',
    fees: .01,
});


contract_three = new ContractRef({
    expiration_time: 1402358400000, //june 10th
    start_time: 1399680000000, //may 10th already started
    option_type: 'call',
    strike_price: 700,
    initial_margin: .4,
    maintenance_margin: 2,
    variation_margin: 1,
    max_price_change: .15,
    full_symbol: 'opt_three',
    short_symbol: 'opt_three',
    fees: .01,
});


contract_four = new ContractRef({
    expiration_time: 1402358400000, //june 10th
    start_time: 1399680000000, //may 10th already started
    option_type: 'call',
    strike_price: 700,
    initial_margin: .5,
    maintenance_margin: 2,
    variation_margin: 1,
    max_price_change: .15,
    full_symbol: 'opt_four',
    short_symbol: 'opt_four',
    fees: .01,
});


contract_five = new ContractRef({
    expiration_time: 1402358400000, //june 10th
    start_time: 1399680000000, //may 10th already started
    option_type: 'call',
    strike_price: 700,
    initial_margin: .6,
    maintenance_margin: 2,
    variation_margin: 1,
    max_price_change: .15,
    full_symbol: 'opt_five',
    short_symbol: 'opt_five',
    fees: .01,
});


contract_six = new ContractRef({
    expiration_time: 1402358400000, //june 10th
    start_time: 1399680000000, //may 10th already started
    option_type: 'call',
    strike_price: 700,
    initial_margin: .7,
    maintenance_margin: 2,
    variation_margin: 1,
    max_price_change: .15,
    full_symbol: 'opt_six',
    short_symbol: 'opt_six',
    fees: .01,
});


contract_one.save(function(err){

console.log("coin saved");

});

contract_two.save(function(err){

console.log("coin saved");

});

contract_three.save(function(err){

console.log("coin saved");

});

contract_four.save(function(err){

console.log("coin saved");

});

contract_five.save(function(err){

console.log("coin saved");

});

contract_six.save(function(err){

console.log("coin saved");

});
*/




});

process.on('uncaughtException', function (e) {
  console.log(new Date().toString(), e.stack || e);
  process.exit(1);
});

var log = console.log;

console.log = function(){
date = new Date();

  log.apply(console, [date.toString() + ' ' + date.getTime() ].concat(arguments));
};



app.post('/get_address', function(req,res){
coin_name = req.body.coin_name;

email = req.session.user.email;



User
.findOne({ email: email })
.populate(coin_name)
.exec(function (err, populated) {
    //console.log(populated.dogecoin.deposit_address)

    res.end(JSON.stringify(populated[coin_name]));

})




});


app.get('/exercise_option', csrf, function(req,res){



if (req.session.activated ){

email = req.session.user.email;
console.log(email);

User
.findOne({ email: email })
.populate('orders')
.exec(function (err, data) {

$.each(data.orders, function(key,val){
in_positions = val.quantity - val.quantity_left;
if (in_positions > 0 && val.pending != 'exercised' && val.pending != 'expired'){



console.log(val);


}

});


});

}

});


app.get('/balances', csrf,  function(req,res){
console.log('here');
if (req.session.activated ){
console.log('here');
email = req.session.user.email;
console.log(email);

User
.findOne({ email: email })
.populate('opt_one deposits withdrawals orders')
.exec(function (err, data) {

//console.log(data.orders);
orders_populated  = new Array();
//console.log('the data ' + data);
//console.log(data.orders);
if (data.orders.length != 0) {
$.each(data.orders, function(keyb, valb){
//console.log('here ' + keyb + ' ' + valb.variation_margin);


Order.find({_id: valb._id}).populate('variation_margin').exec(function( err, doc) {

    console.log("aha");
                //res.json(doc);
                //console.log('here2 ' + doc);
                orders_populated.push(doc);
                console.log(keyb);
                if (keyb == data.orders.length -1){
                    console.log('the orders ' + orders_populated);
                    res.render('tab_template.html', {csrf: JSON.stringify(req.session._csrf), data: JSON.stringify(data), orders_populated: JSON.stringify(orders_populated)});


                }

            }); 
        });

}
else{

    console.log("fucked");
    console.log(data);
res.render('tab_template.html', {csrf: JSON.stringify(req.session._csrf), data: JSON.stringify(data), orders_populated: JSON.stringify(null)});


}


});
// array = new Array();
// array.push(data.orders[0]._id);




    //console.log(data);




}


/*

User.findOne({email:req.session.user.email}).populate('deposits deposits.coin')
.exec(function (err, populated) {
console.log('popular ' + populated.deposits);

res.render('tab_template.html', {data: JSON.stringify(populated.deposits)});

});*/




});


app.get('/loggedin', function(req,res){
activated = true;
user = req.session.user;



res.render('index_exchange_logged_in.html', {activated: activated, user: JSON.stringify(user) });


});



app.get('/', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined){
    activated = false;
    user = false;
}



console.log(activated);
console.log(user);

OrderData.find({}).sort('-time').limit(5).exec(function(err, orderdata){
Order.find({$and: [{pending: 'pending'}, {side: 'bid'}]}).sort('-time').limit(5).exec(function(err, bids){
Order.find({$and: [{pending: 'pending'}, {side: 'ask'}]}).sort('-time').limit(5).exec(function(err, asks){

res.render('index_exchange.html', {activated: JSON.stringify(activated), user: JSON.stringify(user),asks: JSON.stringify(asks),bids: JSON.stringify(bids), orderdata: JSON.stringify(orderdata)});


});
});
});


});

app.get('/voting', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('voting.html', {activated: activated, user: JSON.stringify(user) });

});

app.get('/support', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('support.html', {activated: activated, user: JSON.stringify(user) });

});

app.get('/fees', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('fees.html', {activated: activated, user: JSON.stringify(user) });

});

app.get('/contract/:short_symbol', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);

ContractRef.findOne({short_symbol: req.params.short_symbol}, function(err, contract){
    console.log(contract);
res.render('contract.html', {activated: activated, user: JSON.stringify(user), contract: JSON.stringify(contract)});
});



});

app.get('/about', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('about.html', {activated: activated, user: JSON.stringify(user) });

});


app.get('/faq', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('faq.html', {activated: activated, user: JSON.stringify(user) });

});




app.get('/trading', function(req,res){



activated = req.session.activated;
user = req.session.user;

console.log(activated);
if (activated == undefined){
    activated = false;
    user = null;
}

ContractRef.find({}).sort({contract_number: 1}).exec(function(err, contracts){
//console.log(contracts);


bitstamp.ticker(function(err, ticker) {
contracts_modified = new Array();
current_price = ticker.last;

counter = 0;
$.each(contracts, function(key,val){
//sub = $.parseJSON(contracts[key]);
//console.log(contracts[key].short_symbol);
short_symbol = val.short_symbol;
(function(val, short_symbol, key, current_price, activated, user){
    //console.log(short_symbol);
Order.findOne({$and: [{short_symbol: short_symbol}, {pending: 'pending'}, {side: 'bid'}]}).sort('-price').limit(1).exec(function(err, bid){
Order.findOne({$and: [{short_symbol: short_symbol}, {pending: 'pending'}, {side: 'ask'}]}).sort('-price').limit(1).exec(function(err, ask){

sub = new Object();
sub.expiration_time = val.expiration_time;
sub.start_time = val.start_time;
sub.option_type = val.option_type;
sub.strike_price = val.strike_price;
sub.initial_margin = val.initial_margin;
sub.maintenance_margin = val.maintenance_margin;
sub.variation_margin = val.variation_margin;
sub.max_price_change = val.max_price_change;
sub.full_symbol = val.full_symbol;
sub.short_symbol = val.short_symbol;
sub.fees = val.fees;
sub.balance = val.balance;
sub.expiration_group = val.expiration_group;
sub.contract_number = val.contract_number;
if (bid != null){
sub.bid = bid.price;
extrinsic_bid = (10/(current_price * (current_price - val.strike_price)));

//extrinsic and iv bid
if (current_price > val.strike_price){
sub.extrinsic_bid = extrinsic_bid;
sub.intrinsic_bid = bid.price - extrinsic_bid;


}
else{
sub.extrinsic_bid = bid.price;
sub.intrinsic_bid = 0;

}


}
else{
sub.bid = 0;
sub.extrinsic_bid = 0;
sub.intrinsic_bid = 0;



}




if (ask != null){
sub.ask = ask.price;
extrinsic_ask = (10/(current_price * (current_price - val.strike_price)));

if (current_price > val.strike_price){
sub.extrinsic_ask = extrinsic_ask;
sub.intrinsic_ask = bid.price - extrinsic_ask;

}
else{
sub.extrinsic_ask = ask.price;
sub.intrinsic_ask = 0;

}

}
else{
sub.ask = 0;
sub.extrinsic_ask = 0;
sub.intrinsic_ask = 0;


}

//console.log(JSON.stringify(sub));

contracts_modified.push(sub);
counter++;

if (counter == contracts.length -1){
//console.log(JSON.stringify(contracts_modified));
console.log(key);
console.log(contracts.length);


function sortByGroup(a, b){
  var aName = a.contract_number;
  var bName = b.contract_number;
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

contracts_modified = contracts_modified.sort(sortByGroup);


console.log(JSON.stringify(contracts_modified));

activated = req.session.activated;
user = req.session.user;

console.log(activated);
if (activated == undefined){
    activated = false;
    user = null;
}

res.render('trading.html', {activated: JSON.stringify(activated), user: JSON.stringify(user), contracts: JSON.stringify(contracts_modified)});
}



});
});
})(val, short_symbol, key, current_price);



});
});

//console.log(contracts_modified);

//res.render('trading.html', {activated: activated, user: JSON.stringify(user), contracts: JSON.stringify(contracts)});


});


});

app.get('/tester', function(req,res){

res.render('tester.html');

});


app.get('/process_ticket', function(req,res){

res.render('process_ticket.html');

});

app.get('/get_price', function(req,res){


bitstamp.ticker(function(err, trades) {
  console.log(trades.last);  
});


/*
var body = '';

http.get(url, function(res) {
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    // all data has been downloaded
  });
});
*/


});


app.get('/withdraw/:coin', function(req,res){
code = req.params.coin;
console.log("testing " + code);
Coin.findOne({code: code}, function(err, coin){
console.log('testcoin ' + coin);
res.render('tab_template_second.html',{data: JSON.stringify(coin)});

});

});

app.get('/withdraw2', function(req,res){

res.render("withdraw2.html");

});


app.get('/confirm', function(req,res){

res.render('withdraw_confirm.html');

});

app.get('/withdrawal', function(req,res){

if (req.session.activated ){

console.log("theemail " + req.session.user.email);

User.findOne({email:req.session.user.email}).populate('withdrawals withdrawals.coin')
.exec(function (err, populated) {

console.log('popular ' + populated.withdrawals);

res.render('tab_template.html', {data: JSON.stringify(populated.withdrawals)});

});

}

});




app.get('/orders', function(req,res){

if (req.session.activated ){

console.log("theemail " + req.session.user.email);

User.findOne({email:req.session.user.email}).populate({
  path: 'orders',
  match: { pending: 'pending'}
})
.exec(function (err, populated) {

console.log('popular ' + populated.orders);

res.render('tab_template.html', {data: JSON.stringify(populated.orders)});

});

}

});

app.post('/cancel_order', function(req,res){

console.log(req.body.order_id);



Order.findByIdAndUpdate(req.body.order_id, {$set: {pending: 'cancelled'}}).populate('buyer seller').exec(function(err, order){

console.log(order);

function callback(){}

if (order.side == 'bid')
order.buyer.update({$inc: {maintenance_margin: -1 * order.initial_margin, in_orders: -1 * order.initial_margin , in_orders_non_margin: order.price * order.quantity, available_balance: order.initial_margin + (order.price * order.quantity)}}, { w: 1 }, callback);
else if (order.side == 'ask')
order.seller.update({$inc: {maintenance_margin: -1 * order.initial_margin, in_orders: -1 * order.initial_margin , in_orders_non_margin: -1 * order.price * order.quantity, available_balance: order.initial_margin}}, { w: 1 }, callback);


console.log("order cancelled");
res.end("done");


});


});


app.post('/exercise_option', function(req,res){

//console.log(req.body.order_id);
Order.findByIdAndUpdate(req.body.order_id, { $set: {pending: 'exercised'}}).populate('opposing_orders').exec( function(err, order){
console.log(order._id);
bid_total_quantity = order.quantity;

ask_total = 0;
$.each(order.opposing_orders, function(key, val){

if (key != order.opposing_orders.length-1 ){
    //console.log(key);
    ask_total += val.quantity;
    console.log(val.quantity);

Order.findByIdAndUpdate(val._id, { $set: {pending: 'exercised'}}, function(err, order){


});



}
else{
    //console.log('hi ' + key);
    console.log('here ' + ask_total);
left = bid_total_quantity - ask_total;
console.log(left);

Order.findByIdAndUpdate(val._id, {$inc: {quantity: -1 * left}}, function(err, order){


});


}


});


});

/*
Order.findByIdAndUpdate(req.body.order_id, {$set: {pending: 'exercised'}}, function(err, order){

console.log("order exercised");
res.end("done");
});*/


});

app.get('/withdraw/confirm/:hash', function(req,res){
hash = req.params.hash;

Withdrawal.findOneAndUpdate({$and:[{hash: hash}, {pending: true}]}, {$set: {pending: false}}).populate('user').exec(function (err, withdrawal) {
if (withdrawal != null){
res.render('withdraw_confirm.html');

User.findByIdAndUpdate(withdrawal.user._id, {$inc:{ pending_withdrawals: -1 * (withdrawal.amount + withdrawal.fee)}} , function(err, coin){

console.log("updated coin");

});

console.log(withdrawal);


bitcoin_client.sendToAddress(withdrawal.receiving_address, withdrawal.amount, function(err, txout){

Withdrawal.findOneAndUpdate({hash:hash }, {$set: {txid: txout}}, function(err, result){

console.log("withdraw updated");

});


console.log('sent trans ' + txout);

});






}

});



});

app.get('/deposit', function(req,res){
if (req.session.activated ){

User.findOne({email:req.session.user.email}).populate('deposits deposits.coin')
.exec(function (err, populated) {
console.log('popular ' + populated.deposits);

res.render('tab_template.html', {data: JSON.stringify(populated.deposits)});

});

}

});


app.post('/withdraw', function(req,res){
console.log(req.body.amount);
console.log(req.body.address);
console.log(req.body.password);
console.log(req.body.email);
amount = req.body.amount;
address = req.body.address;
fee = .0001;

User.findOne({$and:[{email: req.body.email}, {password: req.body.password}]}, function(err, populated){

if (populated == null)
    res.end("Incorrect password. Please try again!");
else{
console.log('in else');
available_balance = populated.available_balance;

left = available_balance - amount;

if (left >= 0){


require('crypto').randomBytes(48, function(ex, buf) {
    token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');

    withdrawal = new Withdrawal({
        time: new Date().getTime(),
        amount: amount,
        fee: fee,
        receiving_address: address,
        hash: token,
        user: populated
    });

id = populated._id;

console.log('da fee ' + fee);
User.findByIdAndUpdate(id,{$push: {withdrawals: withdrawal}, $inc:{pending_withdrawals: amount - fee, available_balance: -1 * ( amount ), balance: -1 * amount}}, function(err, user){
console.log(user);

console.log('withdrawal has been saved');

});

confirm_url = prefix + 'withdraw/confirm/' + token;

sendgrid.send({
  to:       req.body.email,
  from:     'info@GenesisBlock.io',
  subject:  'Confirm Withdrawal',
  text:     confirm_url,
  html: confirm_url
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
  res.end("done"); 


}); 


    withdrawal.save(function(err){
        console.log('withdrawal saved');
    });

    res.end("withdraw");




});







}


}


});




});







setInterval(function(){


bitcoin_client.getBlockCount(function(err, blockcount) {


bitcoin_client.getBlockHash(blockcount-2000, function(err, blockhash) {

bitcoin_client.listSinceBlock(blockhash, 1, function(err, transactions) {


if (transactions != null && transactions != undefined){


$.each(transactions['transactions'], function(key,val){
transaction = val;
txid = transaction['txid'];
address = transaction['address'];
amount = transaction['amount'];
confirmations = transaction['confirmations'];
//process_transaction(txid, address_array, sent_address, amount);
if ( transaction['category'] == 'receive'){
coin_name = 'dogecoin';
//console.log("the amount " + amount);
(function(txid, address, amount, confirmations, coin_name){
//Coin.findOne({deposit_address: address}).populate('user').exec(function(err, coin){

//if (coin!= null){

Deposit.findOne({txid: txid}, function(err, deposit){


if (deposit == null){

//console.log('the address ' + address + ' the amount ' + amount);

User.findOneAndUpdate({deposit_address: address}, {$inc: {pending_deposits: amount}}, function(err, user){

if (user != null){
    var deposit = new Deposit({
        time:  new Date().getTime(),
        amount: amount,
        deposit_address: address,
        txid: txid,
    });

    console.log(deposit);

    user.deposits.push(deposit);
    user.save(function(err){
        //console.log('coin updated');
    });

    deposit.save(function(err){
        //console.log('saved');

    });
}

});



}

else{

User.findOne({deposit_address: address}, function(err, user){

min_confirmations = 1;

if (confirmations > min_confirmations){

Deposit.findOneAndUpdate({$and: [{pending: true}, {txid: txid}]},{$set: {pending: false}} , function(err, deposit){

console.log("status changed" + deposit);
if (deposit != null){
console.log(deposit.amount);
console.log('deposit ' + deposit);

User.findOneAndUpdate({deposit_address: address}, {$inc:{pending_deposits: -1 * deposit.amount, balance: deposit.amount, available_balance: deposit.amount}},function(err, user){
console.log('status changed user' + user);


});

}

});


}
else console.log('nonono')

});

}


});
//}

//});
}(txid, address, amount, confirmations, coin_name));


}




});


}
});

}); 

});



},8080);

//update deposits that have been confirmed




server.listen(app.get('port'));


