const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const cars = generateCars(1000);
const traffic = [
      new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -450, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -910, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -1000, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1050, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2, getRandomColor()),


];

// const traffic = generateTraffic(road, 50, 100);

function generateTraffic(road, count = 30, spacing = 200) {
    const traffic = [];
    for (let i = 0; i < count; i++) {
        const lane = Math.floor(Math.random() * road.laneCount); // pick random lane
        const y = -i * spacing - 100; // position cars further up the road
        traffic.push(
            new Car(
                road.getLaneCenter(lane),
                y,
                30,
                50,
                "DUMMY",
                2,
                getRandomColor()
            )
        );
    }
    return traffic;
}



let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
}

animate();

function generateCars(N) {
    const car = [];
    for (let i = 1; i <= N; i++) {
        car.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 4, "red"));
    }
    return car;
}

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}
function downloadBrain() {
    const brain = bestCar.brain;
    const json = JSON.stringify(brain);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bestBrain.json";
    a.click();

    URL.revokeObjectURL(url);
}

function uploadBrain(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const brain = JSON.parse(e.target.result);
        bestCar.brain = brain;
        localStorage.setItem("bestBrain", JSON.stringify(brain)); // optional: keep in storage
        alert("Brain uploaded successfully!");
    };
    reader.readAsText(file);
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, true);

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}
