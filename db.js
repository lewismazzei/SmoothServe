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

var order_ref = database.ref("/orders/");

order_ref.on('child_added', function(data) {
  drawCard(data.val().items, data.val().table, data.key);
});

order_ref.on('child_changed', function(data) {
  var card_order = document.getElementById(data.key);
  document.getElementById("ordersDiv").removeChild(card_order);
  drawCard(data.val().items, data.val().table, data.key);
});

order_ref.on('child_removed', function(data) {
  var card_order = document.getElementById(data.key);
  document.getElementById("ordersDiv").removeChild(card_order);
});

function addOrder(waiter, table, items) {
  database.ref('/orders/').push({
    waiter: waiter,
    table: table,
    state: 0,
    items: items,
    startTime: Date.now()
  });
}

function drawCard(items, table, orderId) {
  var card = document.createElement('div');
  card.id = orderId;
  card.className += "card green";
  var cardContent = card.appendChild(document.createElement('div'));
  var cardHeader = cardContent.appendChild(document.createElement('div'));
  var cardTime = cardContent.appendChild(document.createElement('div'));
  var cardDescription = cardContent.appendChild(document.createElement('div'));
  var cardList = cardDescription.appendChild(document.createElement('div'));

  $.each(items, function(key, value) {
    var listItem = cardList.appendChild(document.createElement('div'));
    listItem.id = orderId+"-item-"+key;
    listItem.className += "item";
    var listIcon = listItem.appendChild(document.createElement('i'));
    listIcon.className += "food icon";
    listItem.innerHTML += value.name;
  });

  var cardExtraContent = card.appendChild(document.createElement('div'));
  cardExtraContent.innerHTML = '<a class="left floated" onclick="updateStatusToServed(this.parentNode.parentNode.id);"><i class="send icon"></i>Done</a><a class="right floated" onclick="modifyOrder(this.parentNode.parentNode.id);"><i class="edit icon"></i>Modify</a>';

  cardContent.className += "content";
  cardHeader.className += "header";
  cardTime.className += "meta";
  cardTime.id = "timer"+orderId;
  cardDescription.className += "description";
  cardList.className += "ui list";
  cardExtraContent.className += "extra content";

  document.getElementById("ordersDiv").appendChild(card);
  cardHeader.textContent = "Table " + table;
}

setInterval( function(){
  order_ref.once('value', function(data) {
    data.forEach(function(childData) {
      updateCardTimer(childData.val().startTime, childData.key);
    });
  });
}, 1000);

function updateCardTimer(startTime, orderId) {
  var timer = document.getElementById("timer"+orderId);
  var s = Math.floor((Date.now() - startTime)/1000);
  var m = Math.floor(s/60);
  s -= 60*m;
  timer.innerHTML = m + "min " + s + "sec";

  var cardClasses = document.getElementById(orderId).classList;
  cardClasses.remove("teal","green","olive","yellow","orange","red")
  switch(m){
    case 0:
      cardClasses.add("teal");
      break;
    case 1:
      cardClasses.add("green");
      break;
    case 2:
      cardClasses.add("olive");
      break;
    case 3:
      cardClasses.add("yellow");
      break;
    case 4:
      cardClasses.add("orange");
      break;
    default:
      cardClasses.add("red");
  }
}

function updateStatusToServed(orderId) {
  // firebase.database().ref('orders/' + orderId).set({
  //   state: 1
  // });
  // document.getElementById(orderId).remove();
  var data = firebase.database().ref("orders/"+orderId);
  var card_order = document.getElementById(data.key);
  document.getElementById("ordersDiv").removeChild(card_order);
}

function modifyOrder() {

}