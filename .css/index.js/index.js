// Fetch the JSON data
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    // Get the 'Foods' array from the JSON data
    const foods = data.Foods;

    // Get the menu container element
    const menuContainer = document.getElementById('menu');

    // Get the order container element
    const orderContainer = document.getElementById('order-container');
    const orderList = document.getElementById('order-list');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const backBtn = document.getElementById('back-btn');

    // Initialize order array
    let order = [];

    // Function to display the menu
    function displayMenu() {
      // Clear the menu container
      menuContainer.innerHTML = '';

      // Loop through the foods array and create menu items
      foods.forEach(food => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.textContent = food.food_name;

        // Add click event listener to each menu item
        menuItem.addEventListener('click', () => {
          // Display the food details
          showFoodDetails(food);
        });

        // Append the menu item to the menu container
        menuContainer.appendChild(menuItem);
      });
    }

    // Function to show food details
    function showFoodDetails(food) {
      // Clear the menu container
      menuContainer.innerHTML = '';

      // Create elements for displaying food details
      const foodImage = document.createElement('img');
      foodImage.src = food.image;

      const foodName = document.createElement('h2');
      foodName.textContent = food.food_name;

      const foodPrice = document.createElement('p');
      foodPrice.textContent = 'Price: $' + food.price;

      const quantityLabel = document.createElement('label');
      quantityLabel.textContent = 'Quantity: ';
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = '1';
      quantityInput.value = '1';

      const addToOrderBtn = document.createElement('button');
      addToOrderBtn.textContent = 'Add to Order';
      addToOrderBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
          const orderItem = {
            food: food,
            quantity: quantity
          };
          order.push(orderItem);
          updateOrderList();
        }
      });

      // Append the elements to the menu container
      menuContainer.appendChild(foodImage);
      menuContainer.appendChild(foodName);
      menuContainer.appendChild(foodPrice);
      menuContainer.appendChild(quantityLabel);
      menuContainer.appendChild(quantityInput);
      menuContainer.appendChild(addToOrderBtn);
    }

    // Function to update the order list
    function updateOrderList() {
      //Clear the order list
      orderList.innerHTML = '';

      // Loop through the order array and create order items
      order.forEach(orderItem => {
        const listItem = document.createElement('li');

        const itemName = document.createElement('span');
        itemName.textContent = orderItem.food.food_name;

        const itemPrice = document.createElement('span');
        itemPrice.textContent = '$' + orderItem.food.price;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = orderItem.quantity;
        quantityInput.addEventListener('change', () => {
          const newQuantity = parseInt(quantityInput.value);
          if (newQuantity > 0) {
            orderItem.quantity = newQuantity;
          } else {
            order = order.filter(item => item !== orderItem);
          }
          updateOrderList();
        });

        const totalPrice = document.createElement('span');
        totalPrice.textContent = '$' + (orderItem.food.price * orderItem.quantity);

        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        listItem.appendChild(quantityInput);
        listItem.appendChild(totalPrice);

        orderList.appendChild(listItem);
      });

      // Check if order is empty and show/hide the place order button
      if (order.length > 0) {
        placeOrderBtn.style.display = 'block';
      } else {
        placeOrderBtn.style.display = 'none';
      }
    }

    // Event listener for place order button click
    placeOrderBtn.addEventListener('click', () => {
      // Perform the necessary actions when the order is placed
      console.log('Order placed!');
      console.log(order);

      // Clear the order and update the order list
      order = [];
      updateOrderList();

      // Display the menu
      displayMenu();
    });

    // Event listener for back button click
    backBtn.addEventListener('click', () => {
      // Display the menu
      displayMenu();
    });

    // Initially, display the menu
    displayMenu();
  })
  .catch(error => console.log(error));
