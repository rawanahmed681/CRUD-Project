var productNameInput = document.getElementById('productNameInput');//Input kolo
var productPriceInput = document.getElementById('productPriceInput');//Input kolo
var productCategoryInput = document.getElementById('productCategoryInput');//Input kolo
var productDescInput = document.getElementById('productDescInput');//Input kolo
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var invalidProduct= document.getElementById('invalidProduct');
var emptyProduct= document.getElementById('emptyProduct');
var invalidProductPrice= document.getElementById('invalidProductPrice');
var emptyProductPrice= document.getElementById('emptyProductPrice');
var invalidProductCategory= document.getElementById('invalidProductCategory');
var emptyProductCategory= document.getElementById('emptyProductCategory');
var invalidProductDesc= document.getElementById('invalidProductDesc');
var emptyProductDesc= document.getElementById('emptyProductDesc');
var productsContainer = [];
var currentIndex = 0;
if (localStorage.getItem('myProducts') != null) {
  productsContainer = JSON.parse(localStorage.getItem('myProducts'));
  displayProducts();// هنا عاوزاه يضيف ويعرض الاتنين مع بعض 
}
else {
  productsContainer = [];
}
// add product
function addProduct() {
  var product = {
    Name: productNameInput.value,
    Price: productPriceInput.value,
    categ: productCategoryInput.value,
    desc: productDescInput.value
  };
  //عشان اضيف منتج جديد
   if(validateProductName()== true && validatePrice()==true && validateCategory()==true && validateDesc()==true){
    productsContainer.push(product);
    //local storage
    //JSON.stringify(productsContainer)=>عشان يحولها ل string
    //myProducts=>اي اسم عادي بخزن فيه 
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    displayProducts();//عرض المنتجات 
    clearForm();//هنا عاوزين نفضي الفورم بعد ما نضيف المنتج
   }
   else{
    validateProductName();
    validatePrice();
    validateCategory();
    validateDesc();
   }
}

//فانكشن لعرض المنتجات
function displayProducts() {
  var container = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    container += `<tr>
    <td>${i}</td>
    <td>${productsContainer[i].Name}</td>
     <td>${productsContainer[i].Price}</td>
     <td>${productsContainer[i].categ}</td>
     <td>${productsContainer[i].desc}</td>
       <td> <button class="btn btn-outline-warning " onclick='updateProduct(${i});'>update</button> </td>
        <td> <button class="btn btn-outline-danger" onclick="deleteProduct(${i});">delete</button> </td> 
    </tr>
    `
  }
  document.getElementById('tableBody').innerHTML = container;
}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}
// delete product by it's index
function deleteProduct(index) {
  productsContainer.splice(index, 1);
  //هخزنهم تاني بعد المسح
  localStorage.setItem('myProducts', JSON.stringify(productsContainer));
  // هنادي  ع الفانكشن دي عشان تعرضهمرتاني بعد المسح
  displayProducts();
}
// update product 
function updateProduct(index) {
  updateBtn.classList.replace("d-none", "d-inline-block");// appear update button
  addBtn.classList.add("d-none");// hide add button
  currentIndex = index;// حزنته ف متغير عشان اعرف استخدمه في الفانكشن التانيه لاني محتاجه العنصر اللي تم التعديل عليه يرجع نفس مكانه في الأرراي بعد التعديل
  // كدا انا برجع القيم اللي محتاجه تعديل مكانها تاني في الاينبوتس عشان اقدر اضيقهم مره تانيه
  productNameInput.value = productsContainer[index].Name;
  productPriceInput.value = productsContainer[index].Price;
  productCategoryInput.value = productsContainer[index].categ;
  productDescInput.value = productsContainer[index].desc;
}
// add updated product
function addUpdatedProduct() {
  updateBtn.classList.replace("d-inline-block", "d-none");// hide update button
  addBtn.classList.remove("d-none"); // appear add button again
  //هنا هرجع اكون الاوبجكت تاني عشان اعرف اعمله اضافه بس ف نفس الايندكس
  productsContainer[currentIndex].Name = productNameInput.value;
  productsContainer[currentIndex].Price = productPriceInput.value;
  productsContainer[currentIndex].categ = productCategoryInput.value;
  productsContainer[currentIndex].desc = productDescInput.value;
  //هخزنهم تاني عشان حصل عليهم تغيير 
  localStorage.setItem('myProducts', JSON.stringify(productsContainer));
  // هعرضهم تاني بعد التعديل
  displayProducts();
  //هفضي الفورم
  clearForm();
}





function validateProductName(){
  var rejex=/^[a-zA-z]{3,8}$/;
  if(rejex.test(productNameInput.value)==true){

    invalidProduct.classList.replace('d-block','d-none');
    emptyProduct.classList.replace('d-block','d-none');
    return true

  }
  else if(productNameInput.value==''){
    invalidProduct.classList.replace('d-block','d-none');
    emptyProduct.classList.replace('d-none','d-block');
  }
  else{
    invalidProduct.classList.replace('d-none','d-block');
    emptyProduct.classList.replace('d-block','d-none');
    return false
  }
}
function validatePrice(){
  var rejex=/^[0-9][0-9][0-9]$/;
  if(rejex.test(productPriceInput.value)==true){
    invalidProductPrice.classList.replace('d-block','d-none');
    emptyProductPrice.classList.replace('d-block','d-none');
    return true
  }
  else if(productPriceInput.value==''){
    invalidProductPrice.classList.replace('d-block','d-none');
    emptyProductPrice.classList.replace('d-none','d-block');
  }
  else{
    invalidProductPrice.classList.replace('d-none','d-block');
    emptyProductPrice.classList.replace('d-block','d-none');
    return false
  }
}

function validateCategory(){
  var rejex=/^[a-zA-z]{3,8}$/;
  if(rejex.test(productCategoryInput.value)==true){
    invalidProductCategory.classList.replace('d-block','d-none');
    emptyProductCategory.classList.replace('d-block','d-none');
    return true
  }
  else if(productCategoryInput.value==''){
    invalidProductCategory.classList.replace('d-block','d-none');
    emptyProductCategory.classList.replace('d-none','d-block');
  }
  else{
    invalidProductCategory.classList.replace('d-none','d-block');
    emptyProductCategory.classList.replace('d-block','d-none');
    return false
  }
}

function validateDesc(){
  var rejex=/^[a-zA-z]{3,8}$/;
  if( rejex.test(productDescInput.value)==true){
    invalidProductDesc.classList.replace('d-block','d-none');
    emptyProductDesc.classList.replace('d-block','d-none');
    return true
  }
  else if(productDescInput.value==''){
    invalidProductDesc.classList.replace('d-block','d-none');
    emptyProductDesc.classList.replace('d-none','d-block');
  }
  else{
    invalidProductDesc.classList.replace('d-none','d-block');
    emptyProductDesc.classList.replace('d-block','d-none');
    return false
  }
}

