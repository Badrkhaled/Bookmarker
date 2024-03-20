// *|* ======|> PRODUCT CARD HTML

// *html elements
// ~`here we get all elements we need to edit or work on in html
var Name = document.getElementById("Name");
var Url = document.getElementById("Url");
var productsContainer = document.getElementById("displayProduct");
var alertBtn = document.getElementById("alertBtn");
var alert = document.getElementById("alert");
var closeBtn = document.getElementById("close");
// ~App variables
var productList = [];
if (localStorage.getItem("product") != null) {
  var productList = JSON.parse(localStorage.getItem("product"));
}
displayAllProducts();
alertBtn.addEventListener("click", function () {
  if (Validate(nameRegex, Name) && Validate(urlRegex, Url)) {
    alert.style.display = "none";
  } else {
    alert.style.display = "block";
  }
});
closeBtn.addEventListener("click", function () {
  alert.style.display = "none";
});
// ! functions
function addproduct() {
  var web = {
    weburl: Url.value,
    webname: Name.value,
  };
  if (Validate(nameRegex, Name) && Validate(urlRegex, Url)) {
    productList.push(web);
    localStorage.setItem("product", JSON.stringify(productList));
    displayProduct(productList.length - 1);
  }
}
function displayProduct(index) {
  var productHTML = `
  <tr>
            <td class="ptsans">${index + 1}</td>
            <td class="ptsans">${productList[index].webname}</td>
            <td>
              <button class="btn btn-success">
                <a class="ptsans" href="${productList[index].weburl}">
                  <i class="fa-solid fa-eye"></i>
                  Visit
                </a>
              </button>
            </td>
            <td>
              <button class="btn btn-danger" onclick="deleteLink(${index})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
          </tr>
  `;
  productsContainer.innerHTML += productHTML;
}
function deleteLink(index) {
  productList.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  productsContainer.innerHTML = "";
  displayAllProducts();
}
function displayAllProducts() {
  for (var i = 0; i < productList.length; i++) {
    displayProduct(i);
  }
}
var nameRegex = /^[A-Z][a-z]{3,}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[a-z]{3,}\.(com|net)$/;
function Validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
