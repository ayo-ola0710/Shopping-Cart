const cartButtons = document.querySelectorAll('.add-to-cart-btn');
let total = document.getElementById("cart-count")
const plusBtn  = document.querySelectorAll(".counter-plus")
let order = document.getElementById("order-total");
const minusBtn = document.querySelectorAll(".counter-minus")
const ing = document.getElementsByClassName("imgs")


let cart = [];

cartButtons.forEach(button => {
    button.addEventListener("click", function(event) {

        const itemButton = button.closest('.relative').querySelector('.btn2');

        // Hide "Add to Cart" button
        button.style.display = "none";

        // Show "+" and "-" section
        itemButton.style.display = "flex"; 

        const image = button.closest('.relative').querySelector('.imgs');
        image.style.border = '2px solid #c73a0f';


        let list = {
            id: button.getAttribute('data-id'),
            name: button.getAttribute('data-name'),
            price: parseFloat(button.getAttribute('data-price').replace('$', '')),
            quantity: 1,
            image: button.getAttribute("data-image")
            
        }
        console.log(list)
       
        let existingProduct = cart.find(product => product.id === list.id);
        if(existingProduct){
            existingProduct.quantity += 1;
        }else{
            cart.push(list);
        }

        addCart()
        updateTotalQuantity()
        totOrder()
        
    });
});

function addCart() {
    const empty = document.querySelector("#empty-cart");
    const summary = document.querySelector("#full-cart");

      if(cart.length === 0){
        empty.style.display = "block";
        summary.style.display = "none";
      }else{
         empty.style.display = "none";
         summary.style.display = "block"
      }

    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ""; 
    
    cart.forEach(item => {
        const cartLips = document.createElement("li");
        cartLips.classList.add("ml-[30px]", "flex", "justify-between");

        const proName = document.createElement("div");

        const productName = document.createElement("p");
        productName.textContent = item.name;
        productName.classList.add("text-sm", "mt-[10px]");

        const cartItem = document.createElement("div");
        cartItem.classList.add("flex", "text-sm", "mt-[5px]", "mb-[3px]");

        const quantityText = document.createElement("p");
        quantityText.textContent = `x${item.quantity}`;
        quantityText.classList.add("ml-[5px]", "text-red-500", "font-bold");

        const singlePriceText = document.createElement("p");
        singlePriceText.textContent = `@$${item.price.toFixed(2)}`;
        singlePriceText.classList.add("ml-[20px]", "text-[#c2bfbf]");

        const totalPriceText = document.createElement("p");
        totalPriceText.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        totalPriceText.classList.add("ml-[20px]");

        const btn = document.createElement("button");
        btn.classList.add("mr-[50px]", "text-red-500");
        btn.innerHTML = "X"
       

        btn.setAttribute('data-id', item.id);

        btn.addEventListener("click", () =>{
            btn.parentElement.remove();
            const productId = btn.getAttribute('data-id');

            const product = cart.find(item => item.id === productId);

            if (product) {
    
                const index = cart.indexOf(product);
            
                if (product) {
                    if (index !== -1) {
                        cart.splice(index, 1); // Remove the product from the cart array
                    }
                }

                const addToCartButton = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
                const itemButton = addToCartButton.closest('.relative').querySelector('.btn2');
        
                // Show the "Add to Cart" button
                addToCartButton.style.display = "flex";
                // Hide the "+" and "-" section
                itemButton.style.display = "none";

                const image = addToCartButton.closest('.relative').querySelector('.imgs');
                image.style.border = '';
        

                addCart();
                updateTotalQuantity();
                totOrder() ;
            }  
            
        });

        cartItem.appendChild(quantityText);
        cartItem.appendChild(singlePriceText);
        cartItem.appendChild(totalPriceText);
        
        proName.appendChild(productName);
        proName.appendChild(cartItem);

        cartLips.appendChild(proName)
        cartLips.appendChild(btn);

        cartContainer.appendChild(cartLips);

        const hr = document.createElement("hr");
        hr.classList.add("ml-[30px]", "mr-[30px]");
        cartContainer.appendChild(hr);
        
        
    });
}

function updateTotalQuantity(){
    let totalQuantity = 0;
    cart.forEach(product => {
         totalQuantity += product.quantity;
    });
    total.innerHTML = totalQuantity;
}
 
function totOrder() {
    let orderTotal = 0;
    cart.forEach(product =>{
       orderTotal += product.price * product.quantity;
    })
    order.innerHTML = orderTotal.toFixed(2);

}


plusBtn.forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = button.getAttribute('data-id');
        const product = cart.find(product => product.id === productId);

            if(product){
                product.quantity += 1;

                addCart();
                updateTotalQuantity();
                totOrder();
            }
        const parentElement = event.target.closest('.btn2');

            // Find the span containing the number
        const quantitySpan = parentElement.querySelector('.proNum');
    
            // Get the current quantity and increment it
        let currentQuantity = parseInt(quantitySpan.innerHTML);
        currentQuantity += 1;
    
            // Update the quantity in the span
        quantitySpan.innerHTML = currentQuantity;

    
    });
});

minusBtn.forEach(button =>{
    button.addEventListener("click", (event)=>{
        const productId = button.getAttribute('data-id');
        const product = cart.find(product => product.id === productId);

            if(product){
                product.quantity -= 1;

                const parentElement = event.target.closest('.btn2');

            // Find the span containing the number
              const quantitySpan = parentElement.querySelector('.proNum');
    
            // Get the current quantity and decrement it, ensuring it doesn't go below 1
              let currentQuantity = parseInt(quantitySpan.innerHTML);
                if (currentQuantity > 1) {
                    currentQuantity -= 1;
                }
    
            // Update the quantity in the span
               quantitySpan.innerHTML = currentQuantity;
             
                if (product.quantity === 0 && currentQuantity === 1) {
                    const index = cart.indexOf(product);
                    if (index !== -1) {
                        cart.splice(index, 1); // Remove from the cart array
                    }

                    const btnGroup = parentElement; // `.btn2`
                    const addToCartButton = parentElement.parentElement.querySelector('.add-to-cart-btn');

                    btnGroup.style.display = 'none'; // Hide `btn2`
                    addToCartButton.style.display = 'flex'; // Show "Add to Cart"

                    const image = button.closest('.relative').querySelector('.imgs');
                    image.style.border = '';
                };
    
                
                addCart();
                updateTotalQuantity();
                totOrder();
            };
    });
});

const orderTab = document.querySelector("#confirm-order");
const over = document.querySelector("#overlay");
const tab = document.querySelector("#confirm-tab");
const newOrder = document.querySelector("#new-order");

orderTab.addEventListener("click", ()=>{
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";

    let totalPrice = 0;
        cart.forEach(item =>{
            const cartLips = document.createElement("li");
            cartLips.classList.add("ml-[30px]", "flex", );

            const proName = document.createElement("div");
            
            const productImage = document.createElement("img");
            productImage.src = item.image 
            productImage.classList.add("w-[45px]", "h-[45px]", "rounded-lg", "mt-[7px]");

            console.log(`Image source: ${productImage.src}`);

            const productName = document.createElement("p");
            productName.textContent = item.name;
            productName.classList.add("text-sm", "mt-[10px]", "font-semibold","ml-[20px]");

            const cartItem = document.createElement("div");
            cartItem.classList.add("flex", "text-sm", "mt-[5px]", "mb-[3px]", "ml-[20px]");

            const quantityText = document.createElement("p");
            quantityText.textContent = `x${item.quantity}`;
            quantityText.classList.add("ml-[5px]", "text-red-500", "font-bold");

            const singlePriceText = document.createElement("p");
            singlePriceText.textContent = `@$${item.price.toFixed(2)}`;
            singlePriceText.classList.add("ml-[20px]", "text-[#c2bfbf]");

            const totalPriceText = document.createElement("p");
            totalPriceText.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            totalPriceText.classList.add("ml-[45px]", "font-semibold", "mt-[20px]");

            cartItem.appendChild(quantityText);
            cartItem.appendChild(singlePriceText);
            
            proName.appendChild(productName);
            proName.appendChild(cartItem);

            cartLips.appendChild(productImage);
            cartLips.appendChild(proName)
            cartLips.appendChild(totalPriceText)

            orderList.appendChild(cartLips);

            const hr = document.createElement("hr");
            hr.classList.add("ml-[30px]", "mr-[30px]", "black");
            orderList.appendChild(hr);

            
            totalPrice += item.price * item.quantity;
            
        })

        document.getElementById('order-total-price').textContent = totalPrice.toFixed(2);

        over.style.display = "block";
        tab.style.display = "block";
            
});

newOrder.addEventListener("click", ()=>{
   over.style.display = "none";
   tab.style.display = "none";
   location.reload();
});

