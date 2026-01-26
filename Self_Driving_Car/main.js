const carCanvas=document.getElementById("carCanvas");
carCanvas.height=window.innerHeight;
carCanvas.width=200;

const nnCanvas=document.getElementById("nnCanvas");
nnCanvas.height=window.innerHeight;
nnCanvas.width=300;

const carCtx =carCanvas.getContext("2d");
const nnCtx =nnCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50,"NN");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    carCanvas.height=window.innerHeight;
    nnCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.7);
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"green");

    carCtx.restore();

    Visualizer.drawNetwork(nnCtx,car.brain);
    requestAnimationFrame(animate);
}