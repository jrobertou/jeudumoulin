Array.prototype.random_element = function() {
  return this[Math.floor(Math.random()*(this.length))];
};

Array.prototype.clone = function() {
  return this.slice(0);
};
