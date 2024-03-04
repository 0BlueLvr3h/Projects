class Load {
  constructor(id, type, weight, size, material) {
    this.id = id;
    this.type = type;
    this.weight = weight;
    this.size = size;
    this.material = material;
  }

  getId() {
    return this.id;
  }
  setId(value) {
    this.id = value;
  }
  getType() {
    return this.type;
  }
  setType(value) {
    this.type = value;
  }
  getWeight() {
    return this.weight;
  }
  setWeight(value) {
    this.weight = value;
  }
  getSize() {
    return this.size;
  }
  setSize(value) {
    this.size = value;
  }
  getMaterial() {
    return this.material;
  }
  setMaterial(value) {
    this.material = value;
  }


}