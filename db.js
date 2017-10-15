var config = {
  apiKey: "AIzaSyBZFDm9cwxB8x8XVEINCutwnTZ5WnKKXlA",
  authDomain: "smoothserve-8c43d.firebaseapp.com",
  databaseURL: "https://smoothserve-8c43d.firebaseio.com",
  projectId: "smoothserve-8c43d",
  storageBucket: "",
  messagingSenderId: "285853027806"
};
firebase.initializeApp(config);
////addOrder("Alex", 1, [{name: "cocacola", quantity: 3}, {name: "espresso", notes: "hot", quantity: 1}]);

var database = firebase.database();
var totalSeconds = 0;
var timers = {};

function addOrder(waiter, table, items) {
  database.ref('/orders/').push({
    waiter: waiter,
    table: table,
    state: 0,
    items: items
    start_time: new Date().getTime();
  });
}

var order_ref = database.ref("/orders/");

order_ref.on('child_added', function(data) {
  var items_list = data.val().items;
  drawCard(items_list, data.val().table, data.key);
});

order_ref.on('child_changed', function(data) {
  var card_order = document.getElementById(data.key);
  document.getElementById("ordersDiv").removeChild(card_order);
  var items_list = data.val().items;
  drawCard(items_list, data.val().table, data.key);
});

order_ref.on('child_removed', function(data) {
  var card_order = document.getElementById(data.key);
  document.getElementById("ordersDiv").removeChild(card_order);
});




function drawCard(items, table, orderId) {
<<<<<<< HEAD
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
		cardExtraContent.innerHTML = '<a class="left floated" onclick="updateStatusToServed(this.parentNode.parentNode.id);"><i class="send icon"></i>Done</a><a class="right floated" onclick="modifyOrder(this.parentNode.parentNode.id);"><i class="edit icon"></i>Modify</a>';

	cardContent.className += "content";
	cardHeader.className +=  "header";
	cardTime.className += "meta";
	cardTime.id += "timer" + orderId;
	cardDescription.className += "description";
	cardList.className += "ui list";
	cardExtraContent.className += "extra content";

	var totalSeconds = 0;
	document.getElementById("ordersDiv").appendChild(card);
	cardHeader.textContent = "Table " + table;
	timer = setInterval ( function(){
		++totalSeconds;
		var hours = Math.floor(totalSeconds / 3600);
		var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
		var seconds = totalSeconds - (hours * 3600 + minutes * 60);
	document.getElementById("timer" + orderId).innerHTML = minutes + "min " + seconds + "sec";
	}, 1000);
=======
  var card = document.createElement('div');
  card.id = orderId;
  card.className += "card green";
  var cardContent = card.appendChild(document.createElement('div'));
  var cardHeader = cardContent.appendChild(document.createElement('div'));
  var cardTime = cardContent.appendChild(document.createElement('div'));
  var cardDescription = cardContent.appendChild(document.createElement('div'));
  var cardList = cardDescription.appendChild(document.createElement('div'));
>>>>>>> 1ecae06308680527460e57ba4937e9cbaa82441a

  $.each(items, function(key, value) {
    var listItem = cardList.appendChild(document.createElement('div'));
    listItem.id = orderId+"-item-"+key;
    listItem.className += "item";
    var listIcon = listItem.appendChild(document.createElement('i'));
    listIcon.className += "food icon";
    var food_name = listItem.appendChild(document.createElement('p'));
    food_name.innerHTML = value.name;
  });

  /*for (itemCount = 0; itemCount < items.length; itemCount++) {
    var listItem = cardList.appendChild(document.createElement('div'));
    listItem.id = items[itemCount];
    listItem.className += "item";
    var listIcon = listItem.appendChild(document.createElement('i'));
    listIcon.className += "icon";
  }*/
  var cardExtraContent = card.appendChild(document.createElement('div'));
  cardExtraContent.innerHTML = '<a class="left floated" onclick="updateStatusToServed(this.parentNode.parentNode.id);"><i class="send icon"></i>Done</a><a class="right floated" onclick="modifyOrder(this.parentNode.parentNode.id);"><i class="edit icon"></i>Modify</a>';

  cardContent.className += "content";
  cardHeader.className += "header";
  cardTime.className += "meta";
  cardTime.id += orderId;
  timers[cardTime.id] = totalSeconds;
  cardDescription.className += "description";
  cardList.className += "ui list";
  cardExtraContent.className += "extra content";

  document.getElementById("ordersDiv").appendChild(card);
  cardHeader.textContent = "Table " + table;
}

function updateCardTimer(timerId, offsetSeconds) {
  var mySeconds = totalSeconds - offsetSeconds;
  var minutes = Math.floor(mySeconds / 60);
  var mySeconds = mySeconds - minutes * 60;
  var cardClasses = document.getElementById("order-" + timerId.split(5)).classlist;
  cardClasses = "card";
  switch (minutes) {
    case 0:
      cardClasses += "teal";
      break;
    case 1:
      cardClasses += "green";
      break;
    case 2:
      cardClasses += "olive";
      break;
    case 3:
      cardClasses += "yellow";
      break;
    case 4:
      cardClasses += "orange";
      break;
    default:
      cardClasses += "red";
      break;
  }
  document.getElementById(timerId).innerHTML = minutes + "min " + mySeconds + "sec";
}

function updateStatusToServed(orderId) {
<<<<<<< HEAD
	 clearInterval(timer);
	 firebase.database().ref('orders/' + orderId).set({
	 	state: 1
	 });
	 var servedCard = document.getElementById(orderId);
	 servedCard.remove();
	 return servedCard;
}

function updateStatusToPayed(orderId) {
	 firebase.database().ref('orders/' + orderId).set({
	 	state: 2
	 });
	 document.getElementById(orderId).remove();
=======
  delete timers["timer" + orderId.slice(6)];
  firebase.database().ref('orders/' + orderId).set({
    state: 1
  });
  document.getElementById(orderId).remove();
>>>>>>> 1ecae06308680527460e57ba4937e9cbaa82441a
}

function modifyOrder() {

}

<<<<<<< HEAD
//VIEW TRANSITION SCRIPTS

    function waitingButtonClicked() {
      document.getElementById("startView").style.display = 'none';
      document.getElementById("waitingView").style.display = 'block';
      //initialView.style.display = "none";
      //indexView.style.display = "block";
    }
    function barButtonClicked() {
      document.getElementById("startView").style.display = 'none';
      document.getElementById("barView").style.display = 'block';
      //initialView.style.display = "none";
      //indexView.style.display = "block";
    }
    function kitchenButtonClicked() {
      document.getElementById("startView").style.display = 'none';
      document.getElementById("kitchenView").style.display = 'block';
      //initialView.style.display = "none";
      //indexView.style.display = "block";
    }
    document.getElementById("waitingButton").addEventListener("click", waitingButtonClicked);
    document.getElementById("barButton").addEventListener("click", barButtonClicked);
    document.getElementById("kitchenButton").addEventListener("click", kitchenButtonClicked);
=======


>>>>>>> 1ecae06308680527460e57ba4937e9cbaa82441a
