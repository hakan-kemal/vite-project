declare module 'Micrio' {
	import type { Readable, Writable } from 'svelte/store';
    /** A viewport rectangle */
    export type View = number[] | Float64Array;
    /** Coordinate tuple, [x, y, scale] */
    export type Coords = [number, number, number?] | Float64Array;
    /**
     * The virtual Micrio camera
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
    */
    export class Camera {
        /** Current center screen coordinates and scale */
        readonly center: Coords;
        /** Get the current image view rectangle
         * @returns The current screen viewport
         */
        getView: () => View | null;
        /** Set the screen viewport
         * @param view The viewport
         * @param noLimit Don't restrict the boundaries
         */
        setView(view: View, noLimit?: boolean): void;
        /** Gets the static image XY coordinates of a screen coordinate
         * @param x The screen X coordinate in pixels
         * @param y The screen Y coordinate in pixels
         * @param absolute Use absolute browser window coordinates
         * @param noLimit Allow to go out of image bounds
         * @returns The relative image XY coordinates
         */
        getCoo: (x: number, y: number, absolute?: boolean, noLimit?: boolean) => Float64Array;
        /** Sets current coordinates as the center of the screen
         * @param x The X Coordinate
         * @param y The Y Coordinate
         * @param scale The scale to set
         */
        setCoo(x: number, y: number, scale?: number): void;
        /** Gets the static screen XY coordinates of an image coordinate
         * @param x The image X coordinate
         * @param y The image Y coordinate
         * @param abs Use absolute browser window coordinates
         * @returns The screen XY coordinates in pixels
         */
        getXY: (x: number, y: number, abs?: boolean) => Float64Array;
        /** Get the current image scale */
        getScale: () => number;
        /** Get a custom matrix for 360 placed embeds
         * @param x The X coordinate
         * @param y The Y coordinate
         * @param scale  The object scale
         * @param radius The object radius (default 10)
         * @param rotX The object X rotation in radians
         * @param rotY The object Y rotation in radians
         * @param rotZ The object Z rotation in radians
         * @param transY Optional Y translation in 3d space
         * @param ptr Optional canvas memory pointer
         * @returns The resulting 4x4 matrix
         */
        getMatrix(x: number, y: number, scale?: number, radius?: number, rotX?: number, rotY?: number, rotZ?: number, transY?: number): Float32Array;
        /** Set the current image scale
         * @param s The scale
        */
        setScale: (s: number) => void;
        /** Get the scale when the image would cover the screen*/
        getCoverScale: () => number;
        /** Get the minimum scale
         * @returns The minimum scale
        */
        getMinScale: () => number;
        /** Sets the minimum scale
         * @param s The minimum scale to set
        */
        setMinScale(s: number): void;
        /** Returns true when the camera is zoomed in to the max */
        isZoomedIn: () => boolean;
        /** Returns true when the camera is fully zoomed out */
        isZoomedOut: () => boolean;
        /** Limit camera navigation boundaries
         * @param limit The viewport limit
        */
        setLimit(limit: View): void;
        /** Limit camera navigation boundaries
         * @param x The viewport width to limit to
         * @param y The viewport height to limit to
        */
        set360RangeLimit(x?: number, y?: number): void;
        /** Fly to a specific view
         * @returns Promise when the animation is done
         * @param view The viewport to fly to
         * @param opts Optional settings
         */
        flyToView: (view: View, opts?: {
            /** A forced duration in ms of the animation */
            duration?: number;
            /** A non-default camera speed */
            speed?: number;
            /** Set the starting animation progress percentage */
            progress?: number;
            /** Base the progress override on this starting view */
            prevView?: View;
            /** Zoom out and in during the animation */
            isJump?: boolean;
            /** Limit the target viewport */
            limit?: boolean;
        }) => Promise<void>;
        /** Fly to a full view of the image
         * @param duration A forced duration in ms of the animation
         * @param speed A non-default camera speed
         * @returns Promise when the animation is done
         */
        flyToFullView: (duration?: number, speed?: number) => Promise<void>;
        /** Fly to a screen-covering view of the image
         * @param duration A forced duration in ms of the animation
         * @param speed A non-default camera speed
         * @returns Promise when the animation is done
         */
        flyToCoverView: (duration?: number, speed?: number) => Promise<void>;
        /** Fly to the specific coordinates
         * @param coords The X, Y and scale coordinates to fly to
         * @param duration A forced duration in ms of the animation
         * @param speed A non-default camera speed
         * @param limited Limit the camera to the image boundaries
         * @returns Promise when the animation is done
         */
        flyToCoo: (coords: Coords, duration?: number, speed?: number, limited?: boolean) => Promise<void>;
        /** Do a "jump" animation to the specific view
         * @returns Promise when the animation is done
         * @param view The viewport to fly to
         * @param duration A forced duration in ms of the animation
         * @param speed A non-default camera speed
         */
        jumpToView(view: View, duration?: number, speed?: number): Promise<void>;
        /** Do a zooming animation
         * @param delta The amount to zoom
         * @param duration A forced duration in ms of the animation
         * @param x Screen pixel X-coordinate as zoom focus
         * @param y Screen pixel Y-coordinate as zoom focus
         * @param speed A non-default camera speed
         * @param noLimit Can zoom outside of the image boundaries
         * @returns Promise when the zoom animation is done
         */
        zoom: (delta: number, duration?: number, x?: number, y?: number, speed?: number, noLimit?: boolean) => Promise<void>;
        /** Zoom out a factor
         * @param factor The amount to zoom in
         * @param duration A forced duration in ms of the animation
         * @param speed A non-default camera speed
         * @returns Promise when the zoom animation is done
         */
        zoomIn: (factor?: number, duration?: number, speed?: number) => Promise<void>;
        /** Zoom out a factor
         * @param factor The amount to zoom out
         * @param duration A forced duration in ms of the animation
         * @param speed A non-default camera speed
         * @returns Promise when the zoom animation is done
         */
        zoomOut: (factor?: number, duration?: number, speed?: number) => Promise<void>;
        /** Pan relative pixels
         * @param x The horizontal number of pixels to pan
         * @param y The vertical number of pixels to pan
         * @param duration An optional duration
        */
        pan(x: number, y: number, duration?: number): void;
        /** Stop any animation */
        stop(): void;
        /** Pause any animation */
        pause(): void;
        /** Pause any animation */
        resume(): void;
        /** Get the current direction facing in 360 mode in radians */
        getDirection: () => number;
        /** Sets the 360 viewing direction in radians
         * @param yaw The direction in radians
         * @param pitch Optional pitch in radians
        */
        setDirection(yaw: number, pitch?: number): void;
        /** Get the current direction pitch
         * @returns The current pitch in radians
        */
        getPitch: () => number;
        /** Set the relative {@link View} to render to */
        setArea(v: View, direct?: boolean, noDispatch?: boolean): void;
    }
    /** Internal HTML <canvas> information state */
    export class ViewRect {
        width: number;
        height: number;
        left: number;
        top: number;
        ratio: number;
        scale: number;
        portrait: boolean;
        constructor(width?: number, height?: number, left?: number, top?: number, ratio?: number, scale?: number, portrait?: boolean);
    }
    /** Micrio sizing and <canvas> controller */
    export class Canvas {
        private micrio;
        /** The Micrio WebGL rendering `<canvas>` element */
        readonly element: HTMLCanvasElement;
        constructor(micrio: HTMLMicrioElement);
        /** Get the screen pixel ratio
         * @returns The device pixel ratio
         */
        getRatio: (s?: Partial<Models.ImageInfo.Settings>) => number;
        /** Set virtual offset margins applied to all viewports
         * @param width The offset width in pixels
         * @param height The offset height in pixels
        */
        setMargins(width: number, height: number): void;
    }
    /** The WebAssembly class */
    export class Wasm {
        micrio: HTMLMicrioElement;
        /** Wasm inited */
        ready: boolean;
        /** Shared WebAssembly memory -- 1 page is 64KB */
        private memory;
        /** The actual WebAssembly memory buffer -- only call here since memory won't grow */
        private b;
        /** The WebAssembly exports */
        private exports;
        /** The WebAssembly main instance memory pointer */
        private i;
        /** The WebAssembly current canvas instance memory pointer */
        private c;
        /** The current frame's timestamp */
        private now;
        /** RequestAnimationFrame pointer */
        private raf;
        /** Is currently drawing */
        private drawing;
        /** Barebone mode, minimal tile downloading */
        private bareBone;
        /** Number of tiles per image */
        private baseTiles;
        /** Array of tile indices drawn this frame */
        private drawn;
        /** Array of tile indices drawn last frame */
        private prevDrawn;
        /** Tile indices to be deleted */
        private toDelete;
        /** Tile textures */
        private textures;
        /** Running texture download threads */
        private requests;
        /** Timeout after texture loads */
        private timeouts;
        /** Tile loaded timestamp */
        private tileLoaded;
        /** Tile opacity */
        private tileOpacity;
        /** Tile load states */
        private loadStates;
        /** Svelte watch subscriptions */
        private unsubscribe;
        private cameras;
        /** The tile vertex buffer */
        _vertexBuffer: Float32Array;
        /** The tile texture buffer */
        static readonly _textureBuffer: Float32Array;
        /** Number of X geometry segments per tile */
        static segsX: number;
        /** Number of Y geometry segments per tile */
        static segsY: number;
        /** The tile vertex buffer for 360 */
        _vertexBuffer360: Float32Array;
        /** The tile texture buffer for 360 */
        static _textureBuffer360: Float32Array;
        /** Camera perspective matrix from WebAssembly */
        private _pMatrices;
        /** Is paged */
        private isGallery;
        /** Wasm imports */
        private imports;
        /** Build the static tile texture coord buffer */
        private static getTextureBuffer;
        /** Create the WebAssembly instance
         * @param micrio The main <micr-io> instance
        */
        constructor(micrio: HTMLMicrioElement);
        /** Load the WebAssembly module
         * @returns The promise when loading is complete
        */
        load(): Promise<void>;
        /** Unbind this module */
        unbind(): void;
        /** Get callable function from exports */
        private getfn;
        /** Bezier easing function */
        easeInOut: (p: number) => number;
        /** Run a Wasm function on main thread */
        fnMain: (key: string, ...args: any[]) => number;
        /** Run a Wasm function for individual image */
        fnCanvas: (ptr: number, key: string, ...args: any[]) => number;
        /** Add a new rendering canvas */
        private addCanvas;
        /** Set the specified canvas as active
         * @param canvas The Image to add
        */
        setCanvas(canvas?: MicrioImage): void;
        /** Remove a canvas */
        removeCanvas(c: MicrioImage): void;
        /** Request a next frame to draw */
        render(): void;
        /** Draw an actual frame */
        private draw;
        /** Cancel the current requestAnimationFrame request */
        private stop;
        /** Tile drawing function called from inside Wasm
         * @returns True when the tile is downloaded and ready to drawn
         */
        private drawTile;
        /** Clear the canvas for drawing */
        private drawStart;
        /** Received the texture data */
        private gotTexture;
        /** Delete an ended or cancelled request */
        private deleteRequest;
        /** Delete a tile */
        private deleteTile;
        /** Do a general cleanup */
        private cleanup;
        /** Resize the internal canvas
         * @param c The viewport rect
        */
        resize(c: ViewRect): void;
        /** Add a child image to the current canvas, either embed or independent canvas */
        private addImage;
        /** Add a child image to the current canvas
         * @param image The image
         * @param parent The parent image
         * @param opacity The starting opacity
         * @returns Promise when the image is added
         */
        addEmbed: (image: MicrioImage, parent: MicrioImage, opacity?: number) => Promise<void>;
        /** Add a child independent canvas to the current canvas, used for grid images
         * @param image The image
         * @param parent The parent image
         * @returns Promise when the image is added
         */
        addChild: (image: MicrioImage, parent: MicrioImage) => Promise<void>;
        /** Simple image fader
         * @param ptr The child image mem pointer
         * @param opacity The target opacity
         * @param direct Set immediately
         */
        fadeImage(ptr: number, opacity: number, direct?: boolean): void;
    }
    /**
     * Micrio user input event handler
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
     */
    export class Events {
        /** Enable/disable events */
        enabled: Writable<boolean>;
        /** Enabled state getter */
        get $enabled(): boolean;
        /** User is currently manually navigating or not
         * @returns Whether the user is using mouse/gestures to navigate right now
        */
        get isNavigating(): boolean;
        /** Hook keyboard event listeners */
        hookKeys(): void;
        /** Unhook keyboard event listeners */
        unhookKeys(): void;
        /** Hook mousewheel / scroll event listeners */
        hookScroll(): void;
        /** Unhook mousewheel / scroll event listeners */
        unhookScroll(): void;
        /** Hook touch/pinch event listeners */
        hookPinch(): void;
        /** Unhook touch/pinch event listeners */
        unhookPinch(): void;
        /** Hook mouse/touch dragging event listeners */
        hookDrag(): void;
        /** Unhook mouse/touch dragging event listeners */
        unhookDrag(): void;
    }
    /** Popover interface state type */
    export interface PopoverType {
        contentPage?: Models.ImageCultureData.Menu;
        image?: MicrioImage;
        marker?: Models.ImageCultureData.Marker;
        markerTour?: Models.ImageCultureData.MarkerTour;
        gallery?: Models.Assets.Image[];
        galleryStart?: string;
    }
    /**
     * # Micrio State management
     *
     * Newly introduced in Micrio 4.0 is the replacement of the way you can interact with markers and tours from a classic imperative JavaScript API to a Svelte-inspired, store-based **state** management using {@link SvelteStore}.
     *
     * This has greatly simplified the internal workings and has made the HTML interface fully reactive based on the image state instead of being interwoven in the previous JS API itself.
     *
     * There are 2 `State` controllers:
     *
     * 1. {@link State.Main}: the main {@link HTMLMicrioElement} state controller, used for:
     * 	* Getting and setting the active tour and marker
     * 	* Loading and saving the entire current state as a minimal independent JSON object
     * 2. {@link State.Image}: individual image {@link MicrioImage.state} controller, used for:
     * 	* Setting the current opened marker in this image
     * 	* Getting the image's last known viewport, even if it is not active at the moment
     *
     * ## Upgrading from Micrio 3.x to 4.x
     *
     * Please refer to [this Micrio knowledge base article](https://kb.micr.io/for-developers/upgrading-micrio-3-to-4)
     * for if you want to upgrade an existing 3.x implementation to 4.x.
     *
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
    */
    export namespace State {
        /** A main Micrio state JSON object */
        type MicrioStateJSON = {
            /** The current image id */
            id: string;
            /** Array of individual image states */
            c: ImageState[];
            /** Any running tour */
            t?: [string, number?, string?];
            /** Any running media */
            m?: HTMLMediaElement;
        };
        /** An individual image state */
        type ImageState = [
            string,
            number,
            number,
            number,
            number,
            string?,
            string?,
            number?,
            string?
        ];
        /**
        * # HTMLMicrioElement state controller
        *
        * The {@link State.Main} constructor is used as {@link HTMLMicrioElement.state}, and offers:
        *
        * * Reading and setting the active tour and marker
        * * Loading and saving the entire current state as a minimal independent JSON object
        *
        */
        class Main {
            private micrio;
            /** The current {@link Models.ImageCultureData.MarkerTour} or {@link Models.ImageCultureData.VideoTour} store {@link SvelteStore.Writable} */
            readonly tour: Writable<Models.ImageCultureData.VideoTour | Models.ImageCultureData.MarkerTour>;
            /** The current active {@link Models.ImageCultureData.MarkerTour} or {@link Models.ImageCultureData.VideoTour} */
            get $tour(): Models.ImageCultureData.VideoTour | Models.ImageCultureData.MarkerTour;
            /** The current shown image's opened {@link Models.ImageCultureData.Marker} store {@link SvelteStore.Writable} */
            readonly marker: Writable<Models.ImageCultureData.Marker>;
            /** The current opened {@link Models.ImageCultureData.Marker} of the current shown {@link MicrioImage} */
            get $marker(): Models.ImageCultureData.Marker;
            /** The current opened popup */
            readonly popup: Writable<Models.ImageCultureData.Marker>;
            /** The current opened custom content page */
            readonly popover: Writable<PopoverType>;
            /** UI controls settings */
            ui: {
                /** Show/hide main controls */
                controls: Writable<boolean>;
                /** Show zoom buttons if applicable */
                zoom: Writable<boolean>;
            };
            /**
             * Gets the current state as an independent, minimal JSON object.
             * This includes the currently open image(s), marker(s), and actively playing media (video, audio, tour) and its state.
             * You can use this object in any other environment to immediately replicate this state (neat!).
             *
             * Example:
             *
             * ```js
             * // Save the current state in Browser 1
             * const state = micrio.state.get();
             *
             * // Save or sync this object to Browser 2 and load it there..
             *
             * // This makes the <micr-io> session state identical to Browser 1.
             * micrio.state.set(state);
             * ```
             */
            get(): MicrioStateJSON;
            /**
             * Sets the state from a `MicrioStateJSON` object, output by the function above here.
             * This works on any Micrio instance!
            */
            set(s: MicrioStateJSON): Promise<void>;
            private setTour;
        }
        /**
        * # MicrioImage state controller
        *
        * The {@link State.Image} constructor is used as {@link MicrioImage.state}, and offers:
        *
        * * Setting the current opened marker in this image
        * * Getting the image's last known viewport, even if it is not active at the moment
        */
        class Image {
            private image;
            /** The current image viewport store {@link SvelteStore.Writable} */
            readonly view: Writable<View>;
            /** The current or last known viewport of this image */
            get $view(): View;
            /**
             * The current active marker store {@link SvelteStore.Writable}.
             * You can either set this to be a {@link Models.ImageCultureData.Marker} JSON object, or `string`, which is the ID
             * of the marker you wish to open.
             */
            readonly marker: Writable<Models.ImageCultureData.Marker | string | undefined>;
            /** The current active Marker instance */
            get $marker(): Models.ImageCultureData.Marker;
        }
    }
    /**
     * [[include:./ts/element.md]]
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
    */
    export class HTMLMicrioElement extends HTMLElement {
        static get observedAttributes(): string[];
        /** All available canvases */
        readonly canvases: MicrioImage[];
        /** Current main {@link MicrioImage} store {@link SvelteStore.Writable}. Its value can be referred to using the {@link $current} property */
        readonly current: Writable<MicrioImage>;
        /** Currently visible canvases */
        readonly visible: Writable<MicrioImage[]>;
        /** The current active and shown {@link MicrioImage}, returning the current value of the {@link current} store {@link SvelteStore.Writable}
         * @readonly
        */
        get $current(): MicrioImage;
        /** The virtual camera instance to control the current main image views */
        get camera(): Camera;
        /** The Micrio sizing and `<canvas>` controller */
        readonly canvas: Canvas;
        /** User input browser event handlers */
        readonly events: Events;
        /** The main state manager. Read more about it in the {@link State} section.*/
        readonly state: State.Main;
        /** Google analytics plugin */
        private readonly analytics;
        /** Router */
        private readonly _router;
        /** Barebone texture downloading, uglier but less bandwidth */
        readonly barebone: Writable<boolean>;
        /** Custom settings, if specified, this overwrites any server received data */
        defaultSettings?: Partial<Models.ImageInfo.Settings>;
        /** Open a Micrio image by ID or {@link Models.ImageInfo.ImageInfo} JSON data
         * @param idOrInfo An image ID or a {@link Models.ImageInfo.ImageInfo} JSON object
         * @param opts Some opening parameters
        */
        open(idOrInfo: string | Partial<Models.ImageInfo.ImageInfo>, opts?: {
            /** Don't focus on an image inside the grid, keep the grid active */
            gridView?: boolean;
            /** Open the image as a secondary split screen image */
            splitScreen?: boolean;
            /** Optional image that is the lead image for split screen */
            splitTo?: MicrioImage;
            /** Passive split screen */
            isPassive?: boolean;
            /** In case of 360, move into this direction */
            vector?: {
                direction: number;
                distanceX: number;
                distanceY: number;
            };
        }): MicrioImage;
        /** Close an opened MicrioImage
         * @param img The currently visible {@link MicrioImage}
        */
        close(img: MicrioImage): void;
        private loadGallery;
        gridInfoData: {
            images: Models.ImageInfo.ImageInfo[];
        };
        private setGrid;
        private getArchiveIndex;
    }
    /**
     * Micrio grid display controller
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
     */
    /** Virtual ImageInfo extension to support grid logic */
    export interface GridImage extends Partial<Models.ImageInfo.ImageInfo> {
        size: [number, number?];
        area?: View;
        view?: View;
    }
    interface GridHistory {
        layout: string;
        horizontal: boolean;
        view?: View;
    }
    /** External grid action types */
    enum GridActionType {
        /** Filter the grid display by these IDs, comma separated */
        focus = 0,
        /** Fly the camera to the bounding box of these in-grid image IDs */
        flyTo = 1,
        /** Filter the grid to the images containing markers that have this custom class name */
        focusWithTagged = 2,
        /** Filter the grid to the images containing markers that have this custom class name, and fly to their views */
        focusTagged = 3,
        /** Reset the grid to its inception state */
        reset = 4,
        /** Go back one grid history step */
        back = 5,
        /** When a grid image is in full-focus, immediately switch to the view as if it were in the initial grid */
        switchToGrid = 6,
        /** If there is a current MarkerTour going on, filter the grid to all grid images that are part of the tour */
        filterTourImages = 7,
        /** Single time fade duration for next image that will be navigated to */
        nextFadeDuration = 8
    }
    /** The Grid controller class */
    export class Grid {
        private micrio;
        image: MicrioImage;
        /** The instanced grid images */
        readonly images: MicrioImage[];
        /** The currently shown images */
        current: MicrioImage[];
        /** The grid HTML element */
        _grid: HTMLDivElement;
        /** The image HTML <button> grid elements */
        _buttons: Map<string, HTMLButtonElement>;
        /** The HTML grid will stay visible and clickable */
        clickable: boolean;
        /** The current full-view focussed image */
        readonly focussed: Writable<MicrioImage>;
        /** Show the markers of these elements */
        readonly markersShown: Writable<MicrioImage[]>;
        /** The grid state history */
        history: GridHistory[];
        /** The current history length */
        depth: Writable<number>;
        /** The animation duration when opening a new layout, in ms */
        aniDurationIn: number;
        /** The animation duration when going back, in ms */
        aniDurationOut: number;
        /** Duration for the next crossfade */
        private nextCrossFadeDuration;
        /** The current grid layout is a single horizontal row */
        private isHorizontal;
        /** Current individual cell sizes w,h */
        readonly cellSizes: Map<string, [number, number?]>;
        /** Temporary size map for next .set() */
        private readonly nextSize;
        /** The Grid constructor
         * @param micrio The Micrio instance
         * @param image The MicrioImage which is the virtual grid container
        */
        constructor(micrio: HTMLMicrioElement, image: MicrioImage);
        /** Hook all events */
        private hook;
        private clearTimeouts;
        /** Set the grid to this input
         * @param input The grid string
         * @param opts Optional settings
         * @returns Promise when the animation is done with the currently shown images
        */
        set(input?: string, opts?: {
            /** Don't add the layout to the history stack */
            noHistory?: boolean;
            /** Don't remove the grid */
            keepGrid?: boolean;
            /** The layout is horizontal */
            horizontal?: boolean;
            /** Any main camera animation duration in seconds */
            duration?: number;
            /** Use the default crossfade duration */
            defaultCrossfade?: boolean;
            /** Fly the main grid view to this viewport */
            view?: View;
            /** Don't draw any frame or do any camera stuff */
            noDraw?: boolean;
            /** Don't unfocus the current focussed image */
            noBlur?: boolean;
            /** Don't do any fading in */
            noFade?: boolean;
            /** Force an animation for all images */
            forceAni?: boolean;
        }): Promise<MicrioImage[]>;
        /** See if grid has changed configuration from original state */
        private hasChanged;
        /** Convert a grid string to GridImage object
         * @param s The image individual encoded grid string
         * @returns the GridImage
        */
        getImage(s: string): GridImage;
        /** Convert an ImageInfo object to an individual image grid string
         * @returns The grid encoded string of this image
        */
        getString(i: Models.ImageInfo.ImageInfo, view?: View, size?: number[]): string;
        /** Print the image grid based on a generated HTML layout
         * @param images Print these images
         * @param horizontal Print the images as a single row
        */
        private printGrid;
        /** Place and watch the grid */
        private placeGrid;
        /** Remove the grid */
        private removeGrid;
        /** Update grid placement */
        private updateGrid;
        /** Place an image in the grid
         * @param entry The GridImage:MicrioInfo info object
         * @param duration The duration of flying to an optional view
         * @returns The instanced MicrioImage
        */
        private placeImage;
        /** Fade out unused images in the grid
         * @param images The images to hide
        */
        private removeImages;
        /** Checks whether current viewed image is (part of) grid */
        insideGrid(): boolean;
        /** Reset the grid to its initial layout
         * @param duration Duration in seconds
         * @param noDraw Don't do any drawing
         * @param forceAni Force animation on all grid images
         * @returns Promise when the transition is complete
        */
        reset(duration?: number, noDraw?: boolean, forceAni?: boolean): Promise<MicrioImage[]>;
        /** Fly to the viewports of any markers containing a class name
         * @param tag The class name to match
         * @param duration Optional duration in ms
         * @param noZoom Don't zoom into the markers, just filter the images
         * @returns Promise when the transition is complete
        */
        flyToMarkers(tag?: string, duration?: number, noZoom?: boolean): Promise<MicrioImage[]>;
        /** Go back one step in the grid history
         * @param duration Optional duration for transition
         * @returns Promise when the transition is complete
        */
        back(duration?: number): Promise<void>;
        /** Open a grid image full size and set it as the main active image
         * @param img The image
         * @param view Optional viewport to focus on
         * @returns Promise for when the transition completes
        */
        focus(img: MicrioImage, view?: View, duration?: number): Promise<void>;
        /** Unfocusses any currently focussed image */
        blur(): void;
        private tourEvent;
        /** Do an (external) action
         * @param action The action type enum or string
         * @param data Optional action data
         * @param duration Optional action duration
        */
        action(action: GridActionType | string, data?: string, duration?: number): void;
        /** Enlarge a specific image idx of the currently shown grid
         * @param idx The image index of the current grid
         * @param width The image target number of columns
         * @param height The image target number of rows
         * @returns Promise when the transition is completed
        */
        enlarge(idx: number, width: number, height?: number): Promise<MicrioImage[]>;
        /** Get the relative in-grid viewport of the image */
        getRelativeView(image: MicrioImage, view: View): View;
    }
    /**
     * An individual Micrio image
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
    */
    export class MicrioImage {
        wasm: Wasm;
        opts: {
            /** Optional sub area for partial / embedded images */
            area?: View;
            /** For split screen, the image this is secondary to */
            secondaryTo?: MicrioImage;
            /** Follow the movements of the main image */
            isPassive?: boolean;
            /** This is an in-image embed */
            isEmbed?: boolean;
        };
        /** The image id */
        readonly id: string;
        /** The Micrio info data Readable store */
        readonly info: Readable<Models.ImageInfo.ImageInfo>;
        /** The image info data
         * @readonly
        */
        get $info(): Models.ImageInfo.ImageInfo;
        /** The Micrio culture data Writable */
        readonly data: Writable<Models.ImageCultureData.ImageCultureData | undefined>;
        /** The current CultureData */
        get $data(): Models.ImageCultureData.ImageCultureData;
        /** The current data language Writable */
        readonly lang: Writable<string>;
        /** The current CultureData */
        get $lang(): string;
        /** State manager */
        readonly state: State.Image;
        /** The virtual camera instance to control the current main image views */
        readonly camera: Camera;
        /** The 2D or 360 video MediaElement */
        readonly video: Writable<HTMLVideoElement>;
        /** The canvas is currently visible
         * @readonly
        */
        readonly visible: Writable<boolean>;
        /** Rendered pixel rectangle [left, top, width, height] */
        readonly viewport: Writable<View>;
        /** Embedded in-image children */
        readonly embeds: MicrioImage[];
        /** Grid controller */
        grid: Grid;
        private loadScript;
        private loadStyle;
        /** Enrich marker tour data with external tour step info and durations
         * This method is called BEFORE Image.data is set. So that's pretty neat.
        */
        private enrichData;
        private parseIIIFSequence;
        /** Fade in the individual image */
        fadeIn(direct?: boolean): void;
        fadeOut(direct?: boolean): void;
    }
    /**
     * Video tour controller
     * @author Marcel Duin <marcel@micr.io>
     * @copyright Q42 Internet BV, Micrio, 2015 - 2023
     * @link https://micr.io/ , https://q42.nl/en/
    */
    /** The Video Tour class */
    export class VideoTour {
        private image;
        private data;
        /** The tour timeline */
        private timeline;
        /** Current timeline segment index */
        private currentIndex;
        /** (Re)start the tour at this point */
        private startAt;
        /** Internal timeout handle */
        private _to;
        /** The playing state */
        private playing;
        /** Internal paused state */
        private _paused;
        /** Paused at timestamp */
        private pausedAt;
        /** Is paused */
        private wasPaused;
        /** Started at timestamp */
        private startedAt;
        /** Unhook user events while playing */
        private unhookEvents;
        /** Micrio instance */
        private micrio;
        /** Set the data */
        constructor(image: MicrioImage, data: Models.ImageCultureData.VideoTour);
        destroy(): void;
        /** Parse the timeline data */
        read(): void;
        get duration(): number;
        set duration(v: number);
        get paused(): boolean;
        get ended(): boolean;
        get currentTime(): number;
        set currentTime(v: number);
        get progress(): number;
        set progress(v: number);
        /** Play/resume the tour */
        play(): void;
        /** Pause the tour */
        pause(): void;
        /** Go to time segment index */
        private gotoStep;
        /** Go to the next tour segment */
        private nextStep;
        /** Get a viewport for a step index */
        private getView;
        /** Start a segment animation */
        private startAni;
        /** Set the tour to this progress percentage */
        private setProgress;
        /** Go to a timestamp in milliseconds */
        private gotoTime;
    }
    /**
     * # Micrio JSON data model
     *
     * This page details the JSON data models used by Micrio.
     *
     * This data is created in the [Micrio editor](https://dashboard.micr.io/), and published as static JSON file per image, and optionally any language-specific data such as image markers, tours, audio, etc.
     *
     * Each Micrio image uses two data sources:
     *
     * 1. **{@link ImageInfo}**: `info.json`: the base image data such as resolution, image type, and basic image settings. This is accessible in JS as {@link MicrioImage.info} as the {@link SvelteStore.Readable} store, and {@link MicrioImage.$info} for its current value.
     *
     * 2. **{@link ImageCultureData}**: `data.{culture}.json`: image content per language published, which is accessible in JS as {@link MicrioImage.data} as the {@link SvelteStore.Writable} store, and {@link MicrioImage.$data} for its current value.
     *
     */
    export namespace Models {
        /**
         * # Base image data
         *
         * The MicrioData.ImageInfo.ImageInfo JSON data object, used to pass to {@link HTMLMicrioElement.open}.
         *
         * The static image information, such as original resolution, image type, title, and all non-language specific **settings** ({@link ImageInfo.Settings}), such as initial viewport, camera behavior, and 360&deg; settings.
         *
         * The only required field is `id`. If only the `id` field is specified, Micrio attempts to download the additional image data by itself (`info.json`), published by the Micrio servers. This data will also include image title, and any custom viewing settings set in the image editor.
         *
         * This is a minimal accepted example:
         *
         * ```json
         * {
         * 	"id": "dzzLm",
         * }
         * ```
         *
         * If you have manually entered the image `width` and `height`, _it will not download_ the `info.json` file, assuming you have provided correct and complete data:
         *
         * ```json
         * {
         * 	"id": "dzzLm",
         * 	"width": 41472,
         * 	"height": 30219
         * }
         * ```
         *
         * Optionally, when using {@link HTMLMicrioElement} `<micr-io>` tag attributes, these will overwrite whatever is loaded from the server. So if in the Micrio editor you have enabled the fullscreen toggle button, you can disable it in your own HTML using `<micr-io fullscreen="false">`.
         *
         *
         */
        namespace ImageInfo {
            /** A Micrio image's main static image data object */
            type ImageInfo = {
                /** The image id
                 * @required
                */
                id: string;
                /** The image base path URI, with a trailing `/`
                 * @default https://b.micr.io/
                */
                path: string;
                /** The Micrio version this image was created in
                 * @default autoloaded
                */
                version: number;
                /** The original image width
                 * @default autoloaded
                */
                width: number;
                /** The original image height
                 * @default autoloaded
                */
                height: number;
                /** The original tile size in px
                 * @default autoloaded
                */
                tileSize: number;
                /** Use an alternative image ID for the image tiles */
                tilesId?: string;
                /** Optional custom file extension for tiles */
                tileExtension?: string;
                /** The image settings, such as viewport/UI settings, camera and user event behavior */
                settings: Partial<ImageInfo.Settings>;
                /** The image title (default: autoloaded) */
                title?: string;
                /** The image slug (default: autoloaded) */
                slug?: string;
                /** The initial data language */
                lang?: string;
                /** The available image data languages, comma-separated (default: autoloaded) */
                cultures?: string;
                /** The image is 360 degrees */
                is360?: boolean;
                /** The image tiles are in WebP format */
                isWebP?: boolean;
                /** The image tiles are in PNG format */
                isPng?: boolean;
                /** Use a custom, single source uri for the zoomable image / video */
                isSingle?: boolean;
                /** A custom format (`dz` for DeepZoom, `iiif` for IIIF) */
                format?: string;
                /** Optional IIIF source for tiles */
                iiifManifest?: string;
                /** Use this for old (<1.8) versions of Micrio */
                legacyTiles?: boolean;
                /** [Spaces] The linked Micrio IDs */
                links?: string[];
            };
            /** Micrio image settings, which is included as {@link ImageInfo}`.settings`. */
            type Settings = {
                /** The starting viewport (`[x0,y0,x1,y1]`) */
                view: View;
                /** Restrict navigation to this viewport (`[x0,y0,x1,y1]`) */
                restrict?: View;
                /** Load the image focussed on this coordinate (`[x, y]`) */
                focus?: number[];
                /** Use a custom uri for the info json file */
                infoUrl?: string;
                /** Render this image as a static image */
                static?: boolean;
                /** Use a custom thumbnail image uri */
                thumbSrc?: string;
                /** The starting viewport. Possible values `cover` and `contain`. Defaults to `contain` */
                initType?: string;
                /** The user cannot zoom out more than a fully covered view */
                limitToCoverScale?: boolean;
                /** Initialize the image when the container is scrolled into view (default: `false`) */
                lazyload?: boolean;
                /** Don't load any custom JS or CSS scripts */
                noExternals?: boolean;
                /** Don't load this image's {@link ImageCultureData.ImageCultureData} (markers, tours, etc) */
                skipMeta?: boolean;
                /** Don't auto-load first available non-preferred data language */
                onlyPreferredLang?: boolean;
                /** Do a crossfade when navigating between images (default: true) */
                fadeBetween?: boolean;
                /** Optional image crossfade duration, in seconds */
                crossfadeDuration?: number;
                /** Don't stop drawing frames when idle */
                keepRendering?: boolean;
                /** Don't load GTM module */
                noGTag?: boolean;
                /** The camera animation speed (default: 1) */
                camspeed?: number;
                /** Kinetic dragging sensitivity (default: 1) */
                dragElasticity?: number;
                /** The maximum zoom level in % of the original (default: 1) */
                zoomLimit?: number;
                /** Turn off support for high DPI screens */
                noRetina?: boolean;
                /** Adjust the maximum zoom of high DPI screens to that of regular displays */
                zoomLimitDPRFix?: boolean;
                /** Allow the user to pan and zoom out of image bounds */
                freeMove?: boolean;
                /** When navigating back to this image from another image, reset the initial view */
                resetView?: boolean;
                /** Hook user events (default: true) */
                hookEvents?: boolean;
                /** Hook keyboard controls (default: false) */
                hookKeys?: boolean;
                /** Don't allow the user to zoom in or out */
                noZoom?: boolean;
                /** Use the mousewheel or trackpad scrolling for zooming (default: true) */
                hookScroll?: boolean;
                /** Allow pinch to zoom on touch devices (default: true) */
                hookPinch?: boolean;
                /** Allow panning through the image (default: true) */
                hookDrag?: boolean;
                /** Force two-finger panning on touch devices (default: false) */
                twoFingerPan?: boolean;
                /** Force using the CTRL/CMD-keys to zoom in using scrolling (default: false) */
                controlZoom?: boolean;
                /** Don't allow less than minimum scale zooming when pinching */
                pinchZoomOutLimit?: boolean;
                /** Don't load any UI elements */
                noUI?: boolean;
                /** Don't show any controls in the UI */
                noControls?: boolean;
                /** Show a fullscreen button if supported */
                fullscreen?: boolean;
                /** Don't show the Micrio logo on the top left */
                noLogo?: boolean;
                /** Don't show the organisation logo on the top right */
                noOrgLogo?: boolean;
                /** Don't show the menu bar with tours and custom pages */
                noToolbar?: boolean;
                /** Show an info modal with the image title and description */
                showInfo?: boolean;
                /** Show a social sharing button */
                social?: boolean;
                /** Show the minimap (default: true) */
                minimap?: boolean;
                /** Don't fade out the minimap (default: false) */
                alwaysShowMinimap?: boolean;
                /** The minimap maximum width, in px (default: 200) */
                minimapWidth?: number;
                /** The minimap maximum height, in px (default: 160) */
                minimapHeight?: number;
                /** More natural camera zooming animation during transitions (default: `true`) */
                doTourJumps?: boolean;
                /** Enable the audio controller (default: `true`) */
                audio?: boolean;
                /** The starting audio volume [0-1] (default: `1`) */
                startVolume?: number;
                /** The music audio volume [0-1] (default: `1`) */
                musicVolume?: number;
                /** The audio volume when other media is playing `[0-1]` (default: `0`) */
                mutedVolume?: number;
                /** Mute the audio when the current browser tab loses focus */
                muteOnBlur?: boolean;
                /** The physical resolution of the object in cm per px */
                cmPerPx?: number;
                /** The physical width of the object in cm */
                cmWidth?: number;
                /** The physical height of the object in cm */
                cmHeight?: number;
                /** Overlapping markers are clustered */
                clusterMarkers?: boolean;
                /** A static split-screen Micrio Image ID */
                micrioSplitLink?: string;
                /** When this is a secondary image in split screen, allow independent navigating */
                secondaryInteractive?: boolean;
                /** When this is a secondary image, don't follow the main image's navigation */
                noFollow?: boolean;
                /** Dark/light theme */
                theme?: ("dark" | "light" | "os");
                /** Load a custom JS file with this image */
                js?: {
                    /** The asset href */
                    href: string;
                };
                /** Load a custom CSS file with this image */
                css?: {
                    /** The asset href */
                    href: string;
                };
                /** All markers are scaled with the image */
                markersScale?: boolean;
                /** Optional marker settings */
                _markers?: MarkerSettings;
                /** Optional settings for 360 images/video */
                _360?: {
                    /** Vertically stretch the image to a full sphere if the image is not 2:1 ratio */
                    closeTop?: boolean;
                    /** A 360 video object */
                    video?: {
                        /** Optional video asset object */
                        video?: {
                            width: number;
                            height: number;
                            /** The video asset url */
                            fileUrl: string;
                        };
                        /** Try to autoplay the video */
                        autoplay?: boolean;
                        /** The video is muted */
                        muted?: boolean;
                        /** Loop the video */
                        loop?: boolean;
                        /** Show video player controls */
                        controls?: boolean;
                    };
                    /** The Y-orientation in degrees of how the picture was taken */
                    orientation?: number;
                };
                /** Freeform custom settings, this is the "Custom JSON" field in the image editor */
                _meta?: {
                    /** An array of JavaScript uris to load for this Micrio instance */
                    scripts?: string[];
                    /** An array of CSS uris to load for this Micrio instance */
                    styles?: string[];
                };
                /** UI customizations */
                ui?: Partial<UserInterfaceSettings>;
                /** Grid: can click individual grid images */
                gridClickable?: boolean;
                /** Grid: transition duration, in seconds */
                gridTransitionDuration?: number;
                /** Grid: transition duration going back, in seconds */
                gridTransitionDurationOut?: number;
            };
            /** Image-wide marker settings */
            type MarkerSettings = {
                /** The uri of the default marker icon */
                markerIcon?: string;
                /** The default marker color */
                markerColor?: string;
                /** The default marker size in px */
                markerSize?: string;
                /** Zoom out when closing a marker */
                zoomOutAfterClose?: boolean;
                /** Relative speed factor when zooming out after close */
                zoomOutAfterCloseSpeed?: number;
                /** Always show the titles for all markers */
                showTitles?: boolean;
                /** Don't print any marker titles at all */
                noTitles?: boolean;
                /** Don't scale titles if marker is scaling */
                titlesNoScale?: boolean;
                /** All marker popups are static */
                staticPopups?: boolean;
                /** All marker popups are static on mobile */
                staticMobilePopups?: boolean;
                /** All markers are sized to their viewports */
                viewportIsMarker?: boolean;
                /** All marker embeds are printed in HTML, not WebGL */
                embedsInHtml?: boolean;
                /** Auto-start a marker tour when just opening marker */
                autoStartTour?: boolean;
                /** Always auto-start a marker tour from the beginning */
                autoStartTourAtBeginning?: boolean;
                /** Auto-progress a tour step when marker media has ended */
                tourAutoProgress?: boolean;
                /** Tour controls in popup */
                tourControlsInPopup?: boolean;
                /** Show tour step counter in marker popup */
                tourStepCounterInPopup?: boolean;
                /** Allow marker popups to be minimized */
                canMinimizePopup?: boolean;
                /** Svelte transition-in animation for popup */
                popupAnimation?: any;
                /** Place primary body text above any media in popup */
                primaryBodyFirst?: boolean;
                /** Prevent all autoplay */
                preventAutoPlay?: boolean;
                /** Don't do anything when clicking markers */
                noMarkerActions?: boolean;
                /** Hide markers when tour is running */
                hideMarkersDuringTour?: boolean;
                /** Keep popup opened in between marker tour steps */
                keepPopupsDuringTourTransitions?: boolean;
            };
            /** Custom interface settings */
            type UserInterfaceSettings = {
                controls?: {
                    /** Show the culture switch button if there are multiple available languages */
                    cultureSwitch?: boolean;
                    /** Serial tour timebar clicking other segment always goes to start of chapter */
                    serialTourNoTimeScrub?: boolean;
                };
                icons?: {
                    /** The raw SVG string for zoom-in */
                    zoomIn?: string;
                    /** The raw SVG string for zoom-out */
                    zoomOut?: string;
                    /** The raw SVG string for fullscreen-start */
                    fullscreenEnter?: string;
                    /** The raw SVG string for fullscreen-stop */
                    fullscreenLeave?: string;
                    /** The raw SVG string for close */
                    close?: string;
                    /** The raw SVG string for cancel */
                    cancel?: string;
                    /** Next step button */
                    next?: string;
                    /** Previous step button */
                    prev?: string;
                    /** Play button */
                    play?: string;
                    /** Pause button */
                    pause?: string;
                    /** Subtitles icon */
                    subtitles?: string;
                    /** Subtitles turned off icon */
                    subtitlesOff?: string;
                    /** Muted icon */
                    muted?: string;
                    /** Unmuted icon */
                    unmuted?: string;
                    /** Arrow up icon */
                    up?: string;
                    /** Arrow down icon */
                    down?: string;
                };
            };
        }
        /**
        * # Image content data
        *
        * The image content {@link ImageCultureData} JSON object, which is accessible as {@link MicrioImage.data} as the {@link SvelteStore.Writable} store, and {@link MicrioImage.$data} for its current value.
        *
        * This JSON data includes:
        *
        * * Markers
        * * Marker tours
        * * Video tours
        * * Background audio
        * * Positional audio
        * * Custom menu screens and content pages
        *
        * This file is most likely created in the [Micrio editor](https://dashboard.micr.io/) and this file is published separately per language. By default this is English, `data.en.json`.
        *
        * To access the data of the current viewed image, use:
        *
        * ```js
        * // The current shown image value of the .data store Writable
        * const data = micrio.$current.$data;
        *
        * if(data) console.log(`The current image has ${data.markers.length} markers!`);
        * else console.warn('The current image has no data set.');
        * ```
        *
        * To subscribe to any data changes:
        *
        * ```js
        * micrio.$current.data.subscribe(data => {
        * 	console.log('Image has new or updated data!', data);
        * })
        * ```
        *
        * To set your own custom data:
        *
        * ```js
        * micrio.$current.data.set({
        * 	"markers": [
        * 		{
        * 			"title": "This is a test marker!",
        * 			"x": .5,
        * 			"y": .5
        * 		}
        * 	]
        * })
        * ```
        *
        * Or to update an existing loaded data object:
        *
        * ```js
        * micrio.$current.data.update(data => {
        * 	data.markers.push({
        * 		"title": "This is a newly added marker",
        * 		"x": .5,
        * 		"y": .5
        * 	});
        * 	return data;
        * })
        * ```
        */
        namespace ImageCultureData {
            /** The main data JSON structure */
            type ImageCultureData = {
                /** Markers */
                markers?: ImageCultureData.Marker[];
                /** Marker tours */
                markerTours?: ImageCultureData.MarkerTour[];
                /** Video tours */
                tours?: ImageCultureData.VideoTour[];
                /** Custom menu pages */
                pages?: ImageCultureData.Menu[];
                /** Image audio data */
                audio?: {
                    /** Music playlist */
                    playlist: {
                        /** The audio assets */
                        items: Assets.Audio[];
                        /** Loop the playlist */
                        loop: boolean;
                    };
                    /** Positional audio asset items */
                    locations: Assets.AudioLocation[];
                };
                /** Optional lang-specific image description */
                description?: string;
                /** Image copyright information */
                copyright?: string;
                /** Original source URI */
                sourceUrl?: string;
            };
            /** A Marker */
            type Marker = {
                /** The marker ID */
                id: string;
                /** The relative marker X coordinate [0-1] */
                x: number;
                /** The relative marker Y coordinate [0-1] */
                y: number;
                /** The viewport to zoom to when the marker is opened */
                view?: View;
                /** The main marker title */
                title?: string;
                /** Alternative title to display as marker label */
                label?: string;
                /** The marker url slug */
                slug?: string;
                /** Marker main body HTML */
                body?: string;
                /** Marker main body raw text */
                markdown?: string;
                /** Marker markdown markdown rendered body (autogenerated) */
                html?: string;
                /** Marker secondary body HTML */
                bodySecondary?: string;
                /** Marker secondary body raw text */
                markdownSecondary?: string;
                /** Content type */
                type?: ("image" | "audio" | "video" | "media" | "link" | "waypoint");
                /** Marker classnames */
                class?: string;
                /** Audio asset */
                audio?: Assets.Audio;
                /** Autoplay the audio asset when the marker is opened */
                audioAutoPlay?: boolean;
                /** Don't draw a marker element */
                noMarker?: boolean;
                /** A custom HTML element instead of the default <button> */
                htmlElement?: HTMLElement;
                /** Embedded images into main image */
                embedImages?: Embed[];
                /** An optional iframe embed url */
                embedUrl?: string;
                /** Embed description */
                embedDescription?: string;
                /** Open the iframe embed in a full-window popover overlay */
                embedInPopover?: boolean;
                /** Having the embed iframe printed mutes audio */
                embedMutesAudio?: boolean;
                /** Put the iframe embed as the first image embed */
                embedInEmbed?: boolean;
                /** Put the iframe embed into the image embed on image load */
                embedInEmbedImmediate?: boolean;
                /** Images inside marker popup */
                images?: Assets.Image[];
                /** Video tour which plays when the marker is opened */
                videoTour?: VideoTour;
                /** [Spaces] Click action for spaces */
                action?: number;
                /** [Spaces] Click action key */
                actionKey?: string;
                /** [Spaces] Value for action */
                actionValue?: string;
                /** Additional options */
                data?: MarkerData;
            };
            /** Optional individual marker settings */
            type MarkerData = {
                /** A custom marker icon image */
                icon?: Assets.Image;
                /** This marker links to this image */
                micrioLink?: ImageInfo.ImageInfo;
                /** This marker opens secondary split image with id */
                micrioSplitLink?: string;
                /** Don't animate the camera when opening this marker */
                noAnimate?: boolean;
                /** Show the title below the marker
                 * @deprecated Use the main marker setting for this
                */
                showTitle?: boolean;
                /** Prevent opening the marker popup */
                noPopup?: boolean;
                /** This marker has a static popup instead of being placed relative to the marker
                 * @deprecated Use the main marker setting for this
                */
                staticPopup?: boolean;
                /** Don't open a large image viewer/gallery on image click */
                preventImageOpen?: boolean;
                /** The marker in-image embeds are the marker trigger instead of a regular marker button */
                embedsAreMarker?: boolean;
                /** The marker in-image embeds stay visible after closing the marker */
                keepEmbedsOpen?: boolean;
                /** Force HTML rendering of image embeds */
                embedsAsHtml?: boolean;
                /** Force a marker popup no matter what */
                notEmpty?: boolean;
                /** Jump the camera when opening this marker */
                doJump?: boolean;
                /** This marker is not closeable */
                alwaysOpen?: boolean;
                /** The marker scales with the zooming image */
                scales?: boolean;
                /** Optional custom settings. This is the "Custom JSON" field in the marker editor */
                _meta?: {
                    /** For in grid multi-image tour, this step is in grid view */
                    gridView?: boolean;
                    /** Custom grid actions, action and action data |-separated */
                    gridAction?: string;
                    /** When opening this marker inside a grid, resize the tile to this */
                    gridSize?: number | string;
                    /** Any other value is accepted */
                    [key: string]: any;
                };
            };
            /**
             * An embedded element inside the main image. This could be an image,
             * iframe embed, or simple empty HTML element (Spaces).
             * This is created in the [Micrio editor](https://dashboard.micr.io/) or Spaces.
             */
            type Embed = Partial<MicrioImage> & {
                /** The area inside the main image to place the embed */
                area: View;
                /** An optional static file url */
                fileUrl?: string;
                /** An optional iframe src url */
                frameSrc?: string;
                /** Optional title */
                title?: string;
                /** An optional Micrio ID */
                micrioId?: string;
                /** Optional image width */
                width?: number;
                /** Optional image height */
                height?: number;
                /** Optional isPng */
                isPng?: boolean;
                /** Opacity */
                opacity?: number;
                /** Relative scale for embed in 360 */
                scale?: number;
                /** X rotation in 360 */
                rotX?: number;
                /** Y rotation in 360 */
                rotY?: number;
                /** Z rotation in 360 */
                rotZ?: number;
                /** [Spaces] A CF video ID */
                videoId?: string;
                /** [Spaces] A CF video duration */
                duration?: number;
                /** [Spaces] CF video is muted */
                muted?: boolean;
                /** [Spaces] CF video loops */
                loop?: boolean;
                /** [Spaces] CF video autoplays */
                autoplay?: boolean;
            };
            /** The MicrioTour abstract shared class for both {@link MarkerTour} and {@link VideoTour}
             * @abstract
            */
            type Tour = {
                /** The tour id */
                id: string;
                /** The tour title */
                title: string;
                /** The tour description */
                description: string;
                /** The tour url slug */
                slug: string;
                /** Autostart this tour on image load */
                autostart?: boolean;
                /** Auto-minimize controls while playing and idle */
                minimize?: boolean;
                /** Cannot close this tour */
                cannotClose?: boolean;
                /** Exit the tour on finish */
                closeOnFinish?: boolean;
            };
            /**
             * A Micrio video tour -- a timed sequence of viewport, with optional audio file.
             * This is created in the [Micrio editor](https://dashboard.micr.io/).
             */
            type VideoTour = Tour & {
                /** The tour duration in seconds */
                duration: number;
                /** The timeline data */
                timeline: {
                    /** Start time in seconds */
                    start: number;
                    /** End time in seconds */
                    end: number;
                    /** View rectangle */
                    rect: View;
                }[];
                /** Custom events in tour timeline */
                events?: Event[];
                /** An optional audio file */
                audio?: Assets.Audio;
                /** Don't hide the markers when running */
                keepMarkers?: boolean;
                /** Don't disable user navigation when running */
                keepInteraction?: boolean;
                /** Optional subtitles */
                subtitle?: Assets.Subtitle;
            };
            /** Timed events inside a {@link ImageCultureData.VideoTour} */
            type Event = {
                /** Start time in seconds */
                start: number;
                /** End time in seconds */
                end: number;
                /** Custom event name */
                action?: string;
                /** Custom event data */
                data?: string;
                /** Optional ID to hook to */
                id?: string;
            };
            /**
             * A Micrio marker tour -- a sequence of markers, which the user can navigate
             * through. This is created in the [Micrio editor](https://dashboard.micr.io/).
             */
            type MarkerTour = Tour & {
                /** Tour steps */
                steps: string[];
                /** Show the tour controls */
                controls?: boolean;
                /** Optional tour image asset */
                image?: Assets.Image;
                /** This is a scrolling tour */
                scrollable?: boolean;
                /** Don't reset view when tour ends */
                keepLastStep?: boolean;
                /** Chapter-based multi-video serial tour */
                isSerialTour?: boolean;
                /** Print the chapters in the interface */
                printChapters?: boolean;
                /** Internally generated propagated step data by Micrio */
                stepInfo?: MarkerTourStepInfo[];
                /** Internally calculated total duration, sum of all step durations */
                duration?: number;
                /** Current tour step getter */
                currentStep?: number;
                /** Start on this tour step */
                initialStep?: number;
                /** Go to next step -- for running tours */
                next?: () => void;
                /** Go to prev step -- for running tours */
                prev?: () => void;
                /** Go to step -- for running tours */
                goto?: (n: number) => void;
            };
            /** Auto generated metadata for marker tours */
            type MarkerTourStepInfo = {
                markerId: string;
                marker: Marker;
                micrioId: string;
                title?: string;
                duration?: number;
                imageHasOtherMarkers?: boolean;
                startView?: View;
                chapter?: number;
                /** For in grid multi-image tour, stay in the grid view */
                gridView?: boolean;
                /** Media current time */
                currentTime?: number;
                /** Media has ended */
                ended?: boolean;
            };
            /**
             * A custom pop-out menu containing content pages or direct external links to
             * websites, or direct links to opening a marker.
             * This is created in the [Micrio editor](https://dashboard.micr.io/).
             */
            type Menu = {
                /** The menu title */
                title: string;
                /** Child menu elements */
                children?: Menu[];
                /** Open this marker when clicking menu */
                markerId?: string;
                /** Direct link url for menu button */
                link?: string;
                /** Optional direct action function when clicked */
                action?: Function;
                /** For page: iframe embed */
                embed?: string;
                /** For page: page image */
                image?: string;
                /** For page: content HTML */
                content?: string;
                /** For page: content markdown */
                markdown?: string;
            };
        }
        namespace Assets {
            type Audio = {
                /** The sample duration */
                duration: number;
                /** The item id */
                id: string;
                /** The sample title */
                title: string;
                /** The sample file name */
                fileName: string;
                /** The audio file uri
                 * @deprecated
                */
                fileUrl: string;
                /** The audio file uri */
                src: string;
            };
            type AudioLocation = Audio & {
                /** Autoplay the sample */
                autoplay: boolean;
                /** Loop the audio */
                loop: boolean;
                /** Don't play on mobile */
                noMobile: boolean;
                /** The radius of the audible circle */
                radius: number;
                /** Pause X seconds between plays */
                repeatAfter: number;
                /** The sample volume */
                volume: number;
                /** The x coordinate */
                x: number;
                /** The y coordinate */
                y: number;
            };
            /** An image asset uploaded in the Micrio editor */
            type Image = {
                id?: string;
                /** The image original width */
                width: number;
                /** The image original height */
                height: number;
                /** Original image source uri */
                src?: string;
                /** If the image is available as Micrio image, its ID */
                micrioId: string;
                /** If the image has a Micrio version, optional alternative image tile ID */
                tilesId?: string;
                /** Image title / filename */
                title?: string;
                /** The image description */
                description?: string;
            };
            type Subtitle = {
                fileSize: number;
                fileUrl: string;
                mimeType: string;
                title: string;
            };
        }
    }
    /** The Micrio version */
    export const VERSION: string;
    export class GoogleTag {
        private micrio;
        /** Google Tag Manager tracker
         * @param {!HTMLMicrioElement} micrio The Micrio instance
        */
        constructor(micrio: HTMLMicrioElement);
    }
    export const markerImages: WeakMap<Models.ImageCultureData.Marker, MicrioImage>;
    /**
     * # Svelte stores in Micrio
     *
     * Micrio uses [Svelte Stores](https://svelte.dev/tutorial/writable-stores) for its internal state management.
     *
     * This means that changes in values can passively trigger state updates.
     *
     * There are two types of stores: {@link Readable}, which is read-only for the user, and {@link Writable} which can be updated or overridden by the user.
     *
     * Typically, for accessing the data directly instead of its store, Micrio offers `$` prefixes to any store properties:
     *
     * ```js
     * // This is the current active image in <micr-io> (.current is the store Writable)
     * const image = micrio.$current;
     *
     * // The current image ImageInfo value
     * const info = image.$info;
     *
     * // Log the current image resolution
     * console.log(`The current image is ${info.width} x ${info.height}px`);
     *
     * // The current CultureData value of the current MicrioImage
     * console.log(micrio.$current.$data);
     * ```
     *
     * An example of setting and subscribing to the {@link Micrio.MicrioImage.data} writable store:
     *
     * ```js
     *
     * // Subscribe to any changes in its data (markers, tours, etc)
     * image.data.subscribe(data => {
     * 	// Data for this image been set, removed or changed
     * 	// This also triggers when the image data has been loaded from the server
     * 	if(data) console.log(`The image now has ${data.markers.length} markers`);
     * 	else console.log('The image data is now empty.');
     * });
     *
     * // Let's set the image data to something. It expects ImageCultureData.
     * image.data.set({
     * 	markers: [{
     * 		"title": "My First Marker",
     * 		"x": .5,
     * 		"y": .5
     * 	}]
     * });
     *
     * // Immediately access the data
     * console.log('The data has been set to', image.$data);
     * ```
     *
     * ## List of stores used by Micrio:
    
     * | Property   | Direct value getter | Type | Description |
     * | ----------- | ----------- | ------------- | ---- |
     * | **`<micr-io>` Element** |||
     * | .{@link Micrio.HTMLMicrioElement.current} | {@link Micrio.HTMLMicrioElement.$current} | {@link Writable}&lt;{@link Micrio.MicrioImage}&gt; | The current active and shown {@link Micrio.MicrioImage} |
     * | **`<micr-io>.state` controller** |||
     * | .{@link Micrio.State.Main.tour} | {@link Micrio.State.Main.$tour} | {@link Writable}&lt;{@link Micrio.Models.ImageCultureData.MarkerTour} &#124; {@link Micrio.Models.ImageCultureData.VideoTour}&gt; | The current running VideoTour or MarkerTour |
     * | .{@link Micrio.State.Main.marker} | {@link Micrio.State.Main.$marker} | {@link Writable}&lt;{@link Micrio.Models.ImageCultureData.Marker}&gt; | The current opened marker in the current opened {@link Micrio.MicrioImage} |
     * **Individual `MicrioImage`** |||
     * | .{@link Micrio.MicrioImage.info} | {@link Micrio.MicrioImage.$info} | {@link Readable}&lt;{@link Micrio.Models.ImageInfo}&gt; | The static image base info |
     * | .{@link Micrio.MicrioImage.data} | {@link Micrio.MicrioImage.$data} | {@link Writable}&lt;{@link Micrio.Models.ImageCultureData}&gt; | The image data (markers, tours, etc) |
     * | .{@link Micrio.MicrioImage.lang} | {@link Micrio.MicrioImage.$lang} | {@link Writable}&lt;`string`&gt; | The current image data culture value |
     * **`MicrioImage.state` controller** |||
     * | .{@link Micrio.State.Image.view} | {@link Micrio.State.Image.$view} | {@link Writable}&lt;{@link Micrio.View}&gt; | The current viewport |
     * | .{@link Micrio.State.Main.marker} | {@link Micrio.State.Main.$marker} | {@link Writable}&lt;{@link Micrio.Models.ImageCultureData.Marker}&gt; | The current opened marker of this image |
     *
     *
     * @category Svelte
     * @module SvelteStore
     * @package svelte
     * @author [These people](https://github.com/sveltejs/svelte/graphs/contributors)
     * @license MIT https://github.com/sveltejs/svelte/blob/master/LICENSE.md
     * @link https://svelte.dev/tutorial/writable-stores
    */
    export * from 'svelte/store';
}declare module "svelte/store" {
	/** Callback to inform of a value updates.
	*/
	export type Subscriber<T> = (value: T) => void;
	/** Unsubscribes from value updates.
	*/
	export type Unsubscriber = () => void;
	/** Callback to update a value.
	*/
	export type Updater<T> = (value: T) => T;
	/** Cleanup logic callback. */
	type Invalidator<T> = (value?: T) => void;
	/** Start and stop notification callbacks.
	 * @internal
	*/
	export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;
	/** Readable interface for subscribing. See the main {@link SvelteStore} article on how to use it in Micrio. */
	export interface Readable<T> {
		/**
		 * Subscribe on value changes.
		 * @param run subscription callback
		 * @param invalidate cleanup callback
		 */
		subscribe(this: void, run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
	}
	/** Writable interface for both updating and subscribing. See the main {@link SvelteStore} article on how to use it in Micrio. */
	export interface Writable<T> extends Readable<T> {
		/**
		 * Set value and inform subscribers.
		 * @param value to set
		 */
		set(this: void, value: T): void;
		/**
		 * Update value using callback and inform subscribers.
		 * @param updater callback
		 */
		update(this: void, updater: Updater<T>): void;
	}
	/**
	 * Creates a `Readable` store that allows reading by subscription.
	 * @internal
	 * @param value initial value
	 * @param {StartStopNotifier}start start and stop notifications for subscriptions
	 */
	export function readable<T>(value?: T, start?: StartStopNotifier<T>): Readable<T>;
	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 * @internal
	 * @param {*=}value initial value
	 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	 */
	export function writable<T>(value?: T, start?: StartStopNotifier<T>): Writable<T>;
	/** One or more `Readable`s.
	 * @internal
	*/
	type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>;
	/** One or more values from `Readable` stores.
	 * @internal
	*/
	type StoresValues<T> = T extends Readable<infer U> ? U : {
		[K in keyof T]: T[K] extends Readable<infer U> ? U : never;
	};
	/**
	 * Derived value store by synchronizing one or more readable stores and
	 * applying an aggregation function over its input values.
	 *
	 * @internal
	 * @param stores - input stores
	 * @param fn - function callback that aggregates the values
	 * @param initial_value - when used asynchronously
	 */
	export function derived<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>, set: (value: T) => void) => Unsubscriber | void, initial_value?: T): Readable<T>;
	/**
	 * Derived value store by synchronizing one or more readable stores and
	 * applying an aggregation function over its input values.
	 *
	 * @internal
	 * @param stores - input stores
	 * @param fn - function callback that aggregates the values
	 * @param initial_value - initial value
	 */
	export function derived<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>) => T, initial_value?: T): Readable<T>;
	/**
	 * Derived value store by synchronizing one or more readable stores and
	 * applying an aggregation function over its input values.
	 *
	 * @internal
	 * @param stores - input stores
	 * @param fn - function callback that aggregates the values
	 */
	export function derived<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>) => T): Readable<T>;
	/**
	 * Get the current value from a store by subscribing and immediately unsubscribing.
	 * @internal
	 * @param store readable
	 */
	 export function get<T>(store: Readable<T>): T;

}
