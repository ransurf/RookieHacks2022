# MLH RookieHacks II - PharmaConnect

## built with Next.js + Tailwind CSS + Ionic Framework + Capacitor, Firebase, and Google Cloud Platform

We began this repo with a barebones template to try to build a Progressive web app. Along the way we met with many challenges but was ultimately able to create a working demo on the web. We seem to run into problems with building the app as of the time of submission. 

There is certainly much more that can be done and we believe that we can push this project to great lengths.

## Usage

This project is a standard Next.js app, so the typical Next.js development process applies (`npm run dev` for browser-based development). However, there is one caveat: the app must be exported to deploy to iOS and Android, since it must run purely client-side. 

Note that you must create an env file for firebase and enable the google maps places, geocode, and javascript api's.

```NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=```



To build the app (if it works), run:

```bash
npm run build
npm run export
```

All the client side files will be sent to the `./out/` directory. These files need to be copied to the native iOS and Android projects, and this is where Capacitor comes in:

```bash
npx cap sync
```

Finally, to run the app, use Capacitor 3 new awesome run command:

```
npx cap run ios
npx cap run android
```

## Livereload/Instant Refresh

To enable Livereload and Instant Refresh during development (when running `npm run dev`), find the IP address of your local interface (ex: `192.168.1.2`) and port your Next.js server is running on, and then set the server url config value to point to it in `capacitor.config.json`:

```json
{
  "server": {
    "url": "http://192.168.1.2:3000"
  }
}
```

Note: this configuration wil be easier in Capacitor 3 which [recently went into beta](https://capacitorjs.com/blog/announcing-capacitor-3-0-beta).

## Caveats

One caveat with this project: Because the app must be able to run purely client-side and use [Next.js's Export command](https://nextjs.org/docs/advanced-features/static-html-export), that means no Server Side Rendering in this code base. There is likely a way to SSR and a fully static Next.js app in tandem but it requires [a Babel plugin](https://github.com/erzr/next-babel-conditional-ssg-ssr) or would involve a more elaborate monorepo setup with code sharing that is out of scope for this project.

Additionally, Next.js routing is not really used much in this app beyond a catch-all route to render the native app shell and engage the Ionic React Router. This is primarily because Next.js routing is not set up to enable native-style transitions and history state management like the kind Ionic uses. This was one of the major problems that we came across when trying to develop the app.
