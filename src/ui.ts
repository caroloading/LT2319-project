import { setupButton } from "./isu";

document.querySelector("#app")!.innerHTML = `
  <div>
    <h1>SeaMetrics</h1>
    <h3>A dialogue system to sail the day!</h3>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <img src="seametrics_logo-transparent.png" alt="SeaMetrics logo" style="width:300px;height:200px;">
    <div class="footer">
      <p>Developed by Caroline Grand-Clement for GU's LT2319 Dialogsystem 2 - HT 2025.</p>
    </div>
  </div>
`;

setupButton(document.querySelector("#counter")!);
