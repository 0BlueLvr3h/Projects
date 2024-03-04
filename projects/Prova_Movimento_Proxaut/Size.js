class Size {
    constructor(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setDepth(depth) {
        this.depth = depth;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getDepth() {
        return this.depth;
    }
}