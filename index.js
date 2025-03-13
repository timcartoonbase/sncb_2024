const riveCanvas = document.getElementById('riveCanvas');
let r;
let trainForwards;
let trainBackwards;

r = new rive.Rive({
    src: 'assets/sncb_test.riv',
    canvas: riveCanvas,
    stateMachines: ["State Machine 1"],
    fitCanvasToArtboardHeight: true,
    autoplay: true,
    onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
        
        // Get state machine inputs once Rive is loaded
        window.riveInputs = r.stateMachineInputs("State Machine 1");
        
        // Set the default scene to 0
        const sceneSelection = window.riveInputs.find(input => input.name === "Scene Selection");
        if (sceneSelection) {
            sceneSelection.value = 0;
        }

        // Access triggers properly (trigger inputs are not the same as other inputs)
        trainForwards = window.riveInputs.find(i => i.name === 'trainForwards');
        trainBackwards = window.riveInputs.find(i => i.name === 'trainBackwards');
        
        console.log('Triggers:', trainForwards, trainBackwards); // Debugging
    },
});

// Set the default scene to 0
let currentScene = 0;

const changeScene = (newScene) => {
    console.log(newScene);

    const sceneSelection = window.riveInputs.find(input => input.name === "Scene Selection");
    if (sceneSelection) {
        if (currentScene < newScene) {
            console.log("more");
            // Fire train forward trigger
            if (trainForwards) {
                trainForwards.fire();
                console.log("Train forward fired");
            }
        } else if (currentScene > newScene) {
            console.log("less");
            // Fire train backward trigger
            if (trainBackwards) {
                trainBackwards.fire();
                console.log("Train backward fired");
            }
        }
        
        sceneSelection.value = newScene;
        currentScene = newScene; // Update the current scene
    }
};

window.addEventListener("resize", () => {
    r.resizeDrawingSurfaceToCanvas();
});
