# FlightRadar24 ReDesign 


## Running the web app

1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the development server.

## Running the iOS app in Xcode

This project uses [Capacitor](https://capacitorjs.com/) to package the web app as a native iOS app you can open in Xcode.

### First-time setup

1. **Install dependencies:**  
   `npm install`

2. **Build and sync to iOS:**  
   `npm run ios`  
   This builds the web app, syncs it to the iOS project, and opens Xcode.

   Or manually:
   - `npm run build` — build the web app
   - `npx cap sync ios` — copy web assets into the iOS project
   - `npx cap open ios` — open the project in Xcode

### Running in Xcode

1. Open the project in Xcode (via `npm run ios` or by opening `ios/App/App.xcodeproj`).
2. Select your target device or simulator.
3. Click Run (▶) or press Cmd+R to build and run.

### After code changes

When you change the web app code:

1. Run `npm run build` to rebuild.
2. Run `npx cap sync ios` to copy the new build into the iOS project.
3. Build and run again in Xcode.

Or use `npm run ios` to do steps 1–2 and open Xcode.
