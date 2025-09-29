class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":   // fixed case
                    this.forward = true;
                    break;
                case "ArrowDown": // fixed case
                    this.reverse = true;
                    break;
            }
            // console.table(this); // show state after key press
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":   // fixed case
                    this.forward = false;
                    break;
                case "ArrowDown": // fixed case
                    this.reverse = false;
                    break;
            }
            // console.table(this); // show state after key release
        };
    }
}
