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
addOrder("Alex", 1, [["cocacola",null,3],["fanta","no ice",1]]);


//initialise database
var database = firebase.database();

function addOrder(waiter, table, items) {
	var orderId = (new Date()).getTime();
  firebase.database().ref('orders/order-' + orderId).set({
    waiter: waiter,
    table: table,
    state: 0
  });
  for (var itemCount = 0; itemCount < items.length; itemCount++) {
  	firebase.database().ref('orders/order-' + orderId + '/items/item-' + (itemCount + 1)).set({
  		name: items[itemCount][0],
  		notes: items[itemCount][1],
  		quantity: items[itemCount][2]
  	});
  	console.log("I added an item: " + items[itemCount][0]);
  }
  console.log("I added an order with the id: " + orderId);
  drawCard(items, orderId);
}

/*var orderRef = firebase.database().ref('orders/' + orderId);

starCountRef.on('value', function(snapshot) {
  updateDrawCard();
});
*/

function drawCard(items, orderId) {
	var card = document.createElement('div');
	card.id = "order-" + orderId;
	var cardContent = card.appendChild(document.createElement('div'));
		var cardHeader = cardContent.appendChild(document.createElement('div'));
		var cardTime = cardContent.appendChild(document.createElement('div'));
		var cardDescription = cardContent.appendChild(document.createElement('div'));
			var cardList = cardDescription.appendChild(document.createElement('div'));
			for (i = 0; i < items.length; i++) {
				var listItem += cardlist.appendChild('div')
				listItem.className("item");
				var listIcon += listItem.appendChild('i');
				listIcon.className("icon");
				
			}
	var cardExtraContent = card.appendChild(document.createElement('div'));

	cardContent.className += "content";
	cardHeader.className +=  "header";
	cardTime.className += "meta";
	cardDescription.className += "description";
	cardList.className += "ui list";
	cardExtraContent.className += "extra content";

	document.getElementById("ordersDiv").appendChild(card);
}

function updateCard() {

}

