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
          if ( req.path.indexOf('buy_order')!= -1  || req.path.indexOf('ask')!= -1 ) {
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
    opt_one: { type: mongoose.Schema.ObjectId, ref: 'Contract' }
});


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
    quantity: Number,
    quantity_left: Number,
    initial_margin: Number,
    maintenance_margin: Number,
    variation_margin: Number,
    max_price_change: Number,
    full_symbol: String,
    short_symbol: String,
    fees: String,
    pending: String,
    buyer:  { type: mongoose.Schema.ObjectId, ref: 'User' },
    seller: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

var OrderData = new mongoose.Schema({
    time: Number,
    full_symbol: String,
    short_symbol: String,
    price: Number,
    quantity: Number
    });

Contract = mongoose.model('Contract', Contract);
User = mongoose.model('User', User);
Deposit = mongoose.model('Deposit', Deposit);
Withdrawal = mongoose.model('Withdrawal', Withdrawal);
Order = mongoose.model('Order', Order);
OrderData = mongoose.model('OrderData', OrderData);




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





app.get('/register', function(req,res){

res.render('register.html');

});

app.get('/login', function(req,res){

res.render('login.html');

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



res.render('trade.html', {last_bitstamp: ticker.last, maintenance_margin: maintenance_margin, available_balance: available_balance, contract: JSON.stringify(contract), chart_info: JSON.stringify(chart_array), csrf: JSON.stringify(req.session._csrf), volume: volume, last_price: last_price, low_price: low_price, high_price: high_price, pending_asks: JSON.stringify(pending_asks), pending_bids: JSON.stringify(pending_bids)});






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
maintenance_margin = parseFloat(req.body.maintenance_margin);
maintenance_margin = bid_price * bid_quantity;
maintenance_margin_multiplier = 1
console.log("maintenance margin " + maintenance_margin);


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

User.findOneAndUpdate({email: req.session.user.email}, {$inc: {balance: -1 * fees * bid_quantity, available_balance: inc_available, maintenance_margin: maintenance_margin, in_orders: maintenance_margin, in_orders_non_margin: bid_value}},function(err, user){

order = new Order({
                time: new Date().getTime(),
                option_type: 'call',
                short_symbol: short_symbol,
                side: 'bid',
                price: price,
                quantity: quantity,
                quantity_left: quantity,
                buyer: user, 
                pending: 'pending'
});

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
partial_maintenance_margin = purchase_cost;
ask_maintenance_margin = ask_value;

(function(ask_value, ask_order_id, ask_price, ask_quantity_left, key, purchase_cost, partial_maintenance_margin, ask_maintenance_margin, maintenance_margin_multiplier){
if (!complete ){
    if (ask_quantity_left >= bid_quantity_left){
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

        user[short_symbol].update({$inc: {balance: bid_quantity_left}}, { w: 1 }, callback);
        user.update({$inc: {in_positions: partial_maintenance_margin, maintenance_margin: maintenance_margin, balance: -1 * (purchase_cost + fee_total) , available_balance: -1 * ( purchase_cost + fee_total)}}, { w: 1 }, callback);

        function callback(){}
        //done updating buyer balance

        time = new Date().getTime();
        order = new Order({
                        time: time,
                        //last_trade_time: new Date().getTime(),
                        short_symbol: short_symbol,
                        side: 'bid',
                        price: bid_price,
                        quantity: bid_quantity,
                        quantity_left: 0,
                        user: user,
                        pending: 'complete'
        });

        order_data = new OrderData({
                            time: time,
                            short_symbol: short_symbol,
                            price: ask_price,
                            quantity: bid_quantity_left
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

        //update balance on seller

        //console.log('sell order user ' + sell_order);
        User.findById(val['seller']).populate(short_symbol).exec(function(err, seller){
            //console.log('dasell ' + seller);
            console.log('buy quantity left ' + bid_quantity_left);
            console.log('buy value left ' + bid_value_left);

            purchase_cost = bid_quantity_left * val.price;

            seller.update({$inc: { in_positions: partial_maintenance_margin, in_orders: -1 * partial_maintenance_margin, balance: purchase_cost, available_balance: purchase_cost}}, { w: 1 }, function(err){

                seller[short_symbol].update({$inc: {balance: -1 * bid_quantity_left}}, { w: 1 }, function(err){

                    console.log('right here dude');
                    req.session.processing = false;
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
        bid_quantity_left -= ask_quantity_left;

        Order.findByIdAndUpdate(ask_order_id, {$set: {quantity_left: 0, pending: 'complete', last_trade_time: new Date().getTime()}}, function(err, order){

        });

        //create buy order record and update balance
        User.findOne({email: req.session.user.email}).populate(short_symbol).exec(function(err, user){

        function callback(){}

        console.log('sell quantity left ' + key + ' ' + ask_quantity_left);
        console.log('sell value ' + key + ' ' + ask_value);
        //update buyer balance
        user[short_symbol].update({$inc: {balance: ask_quantity_left}}, { w: 1 }, callback);
        user.update({$inc: {in_positions: ask_maintenance_margin, balance: -1 * ask_value, available_balance: -1 * ask_value}}, { w: 1 }, callback);
        //done updating buyer balance

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

            in_orders_non_margin = bid_quantity_left * bid_price;
            in_orders = bid_quantity_left * bid_price * maintenance_margin_multiplier;
            user.update({$inc: {in_orders_non_margin: in_orders_non_margin, in_orders: in_orders}}, { w: 1 }, callback);

            order = new Order({
                    time: time,
                    last_trade_time: new Date().getTime(),
                    short_symbol: short_symbol,
                    side: 'bid',
                    price: bid_price,
                    quantity: bid_quantity,
                    quantity_left: bid_quantity_left,
                    user: user,
                    pending: 'pending'
            });

            user.orders.push(order);


            user.save(function(err){

            });


            order.save(function(err){

            console.log('order saved');

            });


        }



        });

        //update balance on seller
        User.findById(val['seller']).populate(short_symbol).exec(function(err, seller){
            seller[short_symbol].update({$inc: {balance: -1 * ask_quantity_left}}, { w: 1 }, function(err){

                seller.update({$inc: {in_positions: ask_maintenance_margin, in_orders: -1 * ask_maintenance_margin, balance: ask_value, available_balance: ask_value}}, { w: 1 }, function(err){

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
maintenance_margin = parseFloat(req.body.maintenance_margin);
maintenance_margin = ask_price * ask_quantity;
maintenance_margin_multiplier = 1
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

//total cost

if (user_balance >= fees * ask_quantity + ask_value + maintenance_margin){

if (bid.length == 0 && quantity > min_order){

console.log("it is in here lol");

function callback(){}
user[short_symbol].update({$inc: {balance: -1 * ask_quantity}}, { w: 1 }, callback);

//User.findOneAndUpdate({email: req.session.user.email}, {$inc: {balance: -1 * fees * bid_quantity, available_balance: inc_available, maintenance_margin: maintenance_margin, in_orders: bid_value}},function(err, user){
inc_available = -1 * (fees * bid_quantity + maintenance_margin);
console.log(inc_available);


User.findOneAndUpdate({email: req.session.user.email}, {$inc: {in_orders_non_margin: ask_value, in_orders: maintenance_margin, balance: -1 * fees * ask_quantity, available_balance: -1 * (fees * ask_quantity + maintenance_margin), maintenance_margin: maintenance_margin}},function(err, user){

order = new Order({
                time: new Date().getTime(),
                option_type: 'call',
                short_symbol: short_symbol,
                side: 'ask',
                price: price,
                quantity: quantity,
                quantity_left: quantity,
                seller: user,
                pending: 'pending'
});

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
partial_maintenance_margin = purchase_cost;
bid_maintenance_margin = bid_value;

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
                        quantity: ask_quantity,
                        quantity_left: 0,
                        user: user,
                        pending: 'complete'
        });

        order_data = new OrderData({
                            time: time,
                            short_symbol: short_symbol,
                            price: bid_price,
                            quantity: ask_quantity_left
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

            buyer.update({$inc: {in_orders_non_margin: -1 * purchase_cost, in_positions: partial_maintenance_margin, in_orders: -1 * partial_maintenance_margin, balance: -1 * purchase_cost}}, { w: 1 }, function(err){

                buyer[short_symbol].update({$inc: {balance: ask_quantity_left}}, { w: 1 }, function(err){

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
            fee_total = fees * ask_quantity;
            in_orders_non_margin = ask_quantity_left * ask_price;
            in_orders = ask_quantity_left * ask_price * maintenance_margin_multiplier;
            user.update({$inc: {in_orders: in_orders, available_balance: -1 * ( maintenance_margin + fee_total)}}, { w: 1 }, callback);

            order = new Order({
                    time: time,
                    last_trade_time: new Date().getTime(),
                    short_symbol: short_symbol,
                    side: 'ask',
                    price: ask_price,
                    quantity: ask_quantity,
                    quantity_left: ask_quantity_left,
                    user: user,
                    pending: 'pending'
            });

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

                buyer.update({$inc: {in_positions: bid_maintenance_margin, in_orders: -1 * bid_maintenance_margin, in_orders_non_margin: -1 * bid_value, balance: -1 * bid_value}}, { w: 1 }, function(err){

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
                quantity: ask_quantity,
                quantity_left: ask_quantity,
                user: user
});

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
                        pending: 'complete'
        });

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
                    pending: 'pending'
            });

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


app.post('/login', function(req,res){

email = req.body.email;
password = req.body.password;

User.findOne({$and: [{email: email}, {password: password}]}, function(err, user){


if (user == null)
res.end('incorrect');


else if (user.activated){
console.log('b');
object = new Object();
object.email = user.email;
object.full_name = user.full_name;
object.user_id = user._id;

req.session.activated = true;
req.session.user = object;

res.end(JSON.stringify(user));

}

else {
console.log('c');
    res.end('unactivated');
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

contract = new Contract({
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



User.findOneAndUpdate({hash: token}, {$set: {deposit_address: address, opt_one: contract}},function(err, user){
console.log("added deposit address to user: " + JSON.stringify(user));
console.log("edited");

});

contract.save(function(err){

console.log("coin saved");

});

console.log('coin saved');


});



});





}); 
}

});

});




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

app.get('/balances', function(req,res){

if (req.session.activated ){

email = req.session.user.email;
console.log(email);

User
.findOne({ email: email })
.populate('opt_one deposits withdrawals')
.exec(function (err, data) {
    console.log(data);
    res.render('tab_template.html', {data: JSON.stringify(data)});

})

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
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('index_exchange.html', {activated: activated, user: JSON.stringify(user) });


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

app.get('/trading', function(req,res){

activated = req.session.activated;
user = req.session.user;

//console.log(activated);
if (activated == undefined) 
    activated = false;

console.log(activated);
console.log(user);
res.render('trading.html', {activated: activated, user: JSON.stringify(user) });



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

Order.findByIdAndUpdate(req.body.order_id, {$set: {pending: 'cancelled'}}, function(err, order){

console.log("order cancelled");
res.end("done");
});


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
fee = .001;

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

