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
  switch(data.val().state){
    case 0:
      drawCard(data.val().items, data.val().table, data.key);
      break;
    case 1:
      moveToEating(data.key, data.val().table);
      break;
    case 2:
      moveToPaying(data.key, data.val().table);
      break;
    case 3:
      moveToFinished(data.key);
      break;
    default:
      console-log("Status changed to " + data.val().state)
  }
});

order_ref.on('child_changed', function(data) {
  if(data.val().state === 0){
    drawCard(data.val().items, data.val().table, data.key);
  }
});

order_ref.on('child_removed', function(data) {
  if(data.val().state === 0){
    var card_order = document.getElementById(data.key);
    document.getElementById("ordersDiv").removeChild(card_order);
  } else{
      var Btns = document.getElementById("tableNumbersDiv");
      var single_btn = document.getElementById("btn"+data.key);
      Btns.removeChild(single_btn);
  }
  
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
      updateCardTimer(childData.val().startTime, childData.key, childData.val().state);
    });
  });
}, 1000);

function updateCardTimer(startTime, orderId, state) {
  if(state === 0){
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
}

function updateStatusToServed(orderId) {
  var card_order = document.getElementById(orderId);
  document.getElementById("ordersDiv").removeChild(card_order);

  
  order_ref.child(orderId).update({
    state: 1
  }).then(function(){
    var order_single_ref = database.ref("/orders/"+orderId+"/table").once('value').then(function(snapshot) {
      moveToEating(orderId, snapshot.val());
    });
  });
}

function moveToEating(orderId, table) {
  var id = "btn"+orderId;
  if (document.contains(document.getElementById(id))) {
    document.getElementById(id).classList.remove("yellow");
    document.getElementById(id).classList.add("green");
    document.getElementById(id).setAttribute("onclick", "updateStatusToPaying((this.id).slice(3));");      
    
  } else{
  var Btns = document.getElementById("tableNumbersDiv");
  var newBtn = Btns.appendChild(document.createElement('button'));
  newBtn.classList.add("ui", "button", "green");
  newBtn.setAttribute("onclick", "updateStatusToPaying((this.id).slice(3));");  
  newBtn.id = id;
  newBtn.textContent = table;
  }
}

function updateStatusToPaying(orderId) {  
  order_ref.child(orderId).update({
    state: 2
  }).then(function(){
    var order_single_ref = database.ref("/orders/"+orderId+"/table").once('value').then(function(snapshot) {
      moveToPaying(orderId, snapshot.val());
    });
  });
}

function updateStatusToFinished(orderId) {  
  order_ref.child(orderId).update({
    state: 3
  }).then(function(){
    moveToFinished(orderId);
  });
}

function moveToFinished(orderId) {
  var id = "btn"+orderId;
  if (document.contains(document.getElementById(id))) {
    var btn = document.getElementById(id);
    document.getElementById("tableNumbersDiv").removeChild(btn);
  }
}

function moveToPaying(orderId, table) {
  var id = "btn"+orderId;
  if (document.contains(document.getElementById(id))) {
    document.getElementById(id).classList.remove("green");
    document.getElementById(id).classList.add("yellow");
    document.getElementById(id).setAttribute("onclick", "updateStatusToFinished((this.id).slice(3));");      
  } else{
  var Btns = document.getElementById("tableNumbersDiv");
  var newBtn = Btns.appendChild(document.createElement('button'));
  newBtn.classList.add("ui", "button", "yellow");
  newBtn.setAttribute("onclick", "updateStatusToFinished((this.id).slice(3));");    
  newBtn.id = id;
  newBtn.textContent = table;
  }
}