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
  drawCard(items, table, orderId);
}

/*var orderRef = firebase.database().ref('orders/' + orderId);

starCountRef.on('value', function(snapshot) {
  updateDrawCard();
});
*/




function drawCard(items, table, orderId) {
	var card = document.createElement('div');
	card.id = "order-" + orderId;
	card.className += "card red";
	var cardContent = card.appendChild(document.createElement('div'));
		var cardHeader = cardContent.appendChild(document.createElement('div'));
		var cardTime = cardContent.appendChild(document.createElement('div'));
		var cardDescription = cardContent.appendChild(document.createElement('div'));
			var cardList = cardDescription.appendChild(document.createElement('div'));
			for (itemCount = 0; itemCount < items.length; itemCount++) {
				var listItem = cardList.appendChild(document.createElement('div'));
				listItem.id = "item-" + (itemCount+1);
				listItem.className += "item";
				var listIcon = listItem.appendChild(document.createElement('i'));
				listIcon.className += "icon";
			}
		var cardExtraContent = card.appendChild(document.createElement('div'));

	cardContent.className += "content";
	cardHeader.className +=  "header";
	cardTime.className += "meta";
	cardTime.id += "timer" + table;
	cardDescription.className += "description";
	cardList.className += "ui list";
	cardExtraContent.className += "extra content";

	var totalSeconds = 0;
	document.getElementById("ordersDiv").appendChild(card);
	cardHeader.textContent = "Table " + table;
	var timer = setInterval ( function(){
		++totalSeconds;
		var hours = Math.floor(totalSeconds / 3600);
		var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
		var seconds = totalSeconds - (hours * 3600 + minutes * 60);
	document.getElementById("timer" + table).innerHTML = minutes + "min " + seconds + "sec";
	}, 1000);
}

function updateCard() {

}

