const riveCanvas = document.getElementById('riveCanvas');
let r;
let trainForwards;
let trainBackwards;


r = new rive.Rive({
    src: 'sncb_test.riv',
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
        triggerTrain = window.riveInputs.find(i => i.name === 'triggerTrain');
        console.log('Triggers:', trainForwards, trainBackwards); // Debugging
    },
});

// Set the default scene to 0
let currentScene = 0;

const changeScene = (newScene) => {
    console.log(newScene);

    const sceneSelection = window.riveInputs.find(input => input.name === "Scene Selection");
    if (sceneSelection) {
        triggerTrain.fire();
        sceneSelection.value = newScene;
        currentScene = newScene; // Update the current scene
    }
};

window.addEventListener("resize", () => {
    r.resizeDrawingSurfaceToCanvas();
});
