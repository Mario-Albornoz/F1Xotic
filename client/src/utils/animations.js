import gsap from "gsap";

// animation for drop down take as arguments intial y position and final y position and duration of the animation affects only section container
export const dropDownAnimation = (initialY, finalY, duration, onComplete = null, target = "section") => {
    gsap.fromTo(
        target,
        {
            y:initialY
        },
        {
            y:finalY,
            duration: duration,
            onComplete
            
        }
    )
}