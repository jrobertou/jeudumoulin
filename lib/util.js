Array.prototype.random_element = function() {
  return this[Math.floor(Math.random()*(this.length))];
};
