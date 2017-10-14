function addNewTable() {
  var form = document.forms["formNewTable"];
  var num = form.elements[0].value;
  var state = parseInt(form.elements[1].value);
  addTable(num, state);
}


function addTable(num, state){

  var tableNum = document.createElement("button");
  tableNum.classList.add("numero-mesa");
  tableNum.classList.add("mesa"+tellState(state));
  tableNum.innerHTML=num;

  var tableCategory = document.getElementById("mesas"+tellState(state));
  tableCategory.appendChild(tableNum);
  console.log("Added table " + num + " as " + tellState(state));
}

function tellState(state){
  switch(state){
    case 0:
    return "Decidiendo";
    break;

    case 1:
    return "Esperando";
    break;

    case 2:
    return "Comiendo";
    break;

    case 3:
    return "Pagando";
    break;

    default:
    return "Libre";
    break;

  }
}
