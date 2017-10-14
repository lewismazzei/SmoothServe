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