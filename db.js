var config = {
	apiKey: "AIzaSyBZFDm9cwxB8x8XVEINCutwnTZ5WnKKXlA",
	authDomain: "smoothserve-8c43d.firebaseapp.com",
	databaseURL: "https://smoothserve-8c43d.firebaseio.com",
	projectId: "smoothserve-8c43d",
	storageBucket: "",
	messagingSenderId: "285853027806"
};

//initialise firebase
firebase.initializeApp(config);
addOrder(1, 1, [["cocacola",null,3],["fanta","no ice",1]]);

//initialise database
var database = firebase.database();

function addOrder(waiter, table, items) {
	var orderId = (new Date()).getTime();
  firebase.database().ref('orders/order-' + orderId).set({
    waiter: waiter,
    table: table,
    state: 0
  });
  for (var itemCount = 1; itemCount < items.length+1; itemCount++) {
  	firebase.database().ref('orders/order-' + orderId + '/item-' + itemCount).set({
  		name: items[itemCount][0],
  		notes: items[itemCount][1],
  		quantity: items[itemCount][2]
  	});
  	console.log("I added an item: " + items[itemCount][0]);
  }
  console.log("I added an order with the id: " + orderId);
}

function addItem(itemName, itemInfo, quantity) {
	firebase.database().ref('orders/order-')
}

