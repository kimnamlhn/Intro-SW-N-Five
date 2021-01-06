module.exports = {

    add(cart, item) {
      for (ci of cart) {
        if (ci.id === item.id) {
          return;  
        }
      }
      cart.push(item);
    },
  
    del(cart, id) {
      for (let i = cart.length - 1; i >= 0; i--) {
        if (id === cart[i].id) {
          cart.splice(i, 1);
          return;
        }
      }
    },
  
  
  };
  