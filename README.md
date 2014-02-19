# js1k-2014

## build.js

This is a quick nodejs builder script that takes a given js file, 
minifies/compresses/mangles it, provides feedback on its size, and 
then injects it into the js1k shim.

It depends on the node module uglify-js.

# A Tiny Game of Life in 1024 bytes

	life.min.js

A tiny implementation of Conway's Game of Life: Click to toggle cells, press `f` to run the game and to step forward, `a` to animate, `d` to edit your current pattern, and `s` to start fresh.

You start off in edit mode. You can tell by the `<E>` in the text up top. This indicator shows `<R>` for run/game mode. (Also, the cells are outlined in edit, while they are filled in run mode) 

In edit mode click on cells to toggle them on or off. When you are satisfied with your starting pattern press 'f' to switch into run mode. 

Controls: 

'f' steps the game forward, and switches from edit to run mode 

'd' switches back into edit mode and restores the starting pattern

's' switches back into edit mode and starts a new pattern

'a' while in game mode, animates by automatically stepping forward, press again to pause